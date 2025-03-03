"use client"

import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell, PropertiesContext } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Check, MoreVertical, Plus, Search, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample tenants data
const initialTenants = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "Unit 101",
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-14",
    rent: 1200,
    status: "active",
    paymentStatus: "paid",
    lastPayment: "2023-07-01",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    property: "Sunset Apartments",
    unit: "Unit 205",
    leaseStart: "2022-08-01",
    leaseEnd: "2023-07-31",
    rent: 1350,
    status: "active",
    paymentStatus: "late",
    lastPayment: "2023-06-05",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    property: "Oakwood Heights",
    unit: "Unit 3B",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-02-29",
    rent: 1500,
    status: "active",
    paymentStatus: "paid",
    lastPayment: "2023-07-02",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    property: "Parkview Residences",
    unit: "Unit 12",
    leaseStart: "2022-11-15",
    leaseEnd: "2023-11-14",
    rent: 1650,
    status: "notice",
    paymentStatus: "paid",
    lastPayment: "2023-07-01",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.c@example.com",
    phone: "(555) 234-5678",
    property: "Sunset Apartments",
    unit: "Unit 304",
    leaseStart: "2023-02-01",
    leaseEnd: "2024-01-31",
    rent: 1275,
    status: "active",
    paymentStatus: "unpaid",
    lastPayment: "2023-06-01",
  },
]

export default function TenantsPage() {
  const { properties, setProperties } = useContext(PropertiesContext)
  const { toast } = useToast()
  const [tenants, setTenants] = useState(initialTenants)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [tenantToDelete, setTenantToDelete] = useState(null)

  // Update tenants to use properties from context
  useEffect(() => {
    if (properties.length > 0) {
      // Get property names from the properties context
      const propertyNames = properties.map((property) => property.name)

      // Update tenants to use valid property names
      setTenants((prev) =>
        prev.map((tenant) => {
          // If the tenant's property is not in our properties list, assign it to the first property
          if (!propertyNames.includes(tenant.property)) {
            return {
              ...tenant,
              property: propertyNames[0] || tenant.property,
            }
          }
          return tenant
        }),
      )
    }
  }, [properties])

  useEffect(() => {
    // On mount, try to get properties from localStorage
    const storedProperties = localStorage.getItem("properties")
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties))
    }

    // Listen for property changes
    const handlePropertiesUpdated = () => {
      const updatedProperties = localStorage.getItem("properties")
      if (updatedProperties) {
        setProperties(JSON.parse(updatedProperties))
      }
    }

    window.addEventListener("propertiesUpdated", handlePropertiesUpdated)

    return () => {
      window.removeEventListener("propertiesUpdated", handlePropertiesUpdated)
    }
  }, [])

  // Function to handle editing a tenant
  const handleEditTenant = (tenant) => {
    setSelectedTenant(tenant)
    setIsEditDialogOpen(true)
  }

  // Function to handle deleting a tenant
  const handleDeleteTenant = (tenant) => {
    setTenantToDelete(tenant)
    setIsDeleteDialogOpen(true)
  }

  // Function to confirm tenant deletion
  const confirmDeleteTenant = () => {
    setTenants((prev) => prev.filter((t) => t.id !== tenantToDelete.id))

    toast({
      title: "Tenant Deleted",
      description: `${tenantToDelete.name} has been removed from your tenant list.`,
      duration: 3000,
    })

    setIsDeleteDialogOpen(false)
    setTenantToDelete(null)
  }

  // Function to save edited tenant
  const saveEditedTenant = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedTenant = {
      ...selectedTenant,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      property: formData.get("property"),
      unit: formData.get("unit"),
      leaseStart: formData.get("leaseStart"),
      leaseEnd: formData.get("leaseEnd"),
      rent: Number(formData.get("rent")),
      status: formData.get("status"),
      paymentStatus: formData.get("paymentStatus"),
    }

    setTenants((prev) => prev.map((t) => (t.id === selectedTenant.id ? updatedTenant : t)))

    toast({
      title: "Tenant Updated",
      description: `${updatedTenant.name}'s information has been updated successfully.`,
      duration: 3000,
    })

    setIsEditDialogOpen(false)
    setSelectedTenant(null)
  }

  // Filter tenants based on status and search query
  const filteredTenants = tenants.filter((tenant) => {
    const matchesFilter = filter === "all" || tenant.status === filter
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Get property names from the properties context
  const propertyNames = properties.map((property) => property.name)

  return (
    <DashboardShell>
      {/* Debug Properties */}
      <div className="hidden">
        Properties available: {properties ? properties.length : 0}
        {properties && properties.map((p, i) => <div key={i}>{p.name}</div>)}
      </div>
      <DashboardHeader heading="Tenants" text="Manage your property tenants and leases.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
              <DialogDescription>Enter the details of your new tenant.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)

                const newTenant = {
                  id: Date.now(),
                  name: formData.get("name"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  property: formData.get("property"),
                  unit: formData.get("unit"),
                  leaseStart: formData.get("leaseStart"),
                  leaseEnd: formData.get("leaseEnd"),
                  rent: Number(formData.get("rent")),
                  status: formData.get("status"),
                  paymentStatus: "unpaid",
                  lastPayment: "",
                }

                setTenants((prev) => [...prev, newTenant])

                toast({
                  title: "Tenant Added",
                  description: `${newTenant.name} has been added successfully.`,
                  duration: 3000,
                })

                // Close dialog
                const closeButton = document.querySelector('[data-state="open"] button[data-state="closed"]')
                if (closeButton instanceof HTMLElement) {
                  closeButton.click()
                }

                // Reset form
                e.target.reset()
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" placeholder="Full name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" name="phone" placeholder="Phone number" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <div className="col-span-3">
                    {/* Direct localStorage access for properties */}
                    {(() => {
                      // Get properties directly from localStorage to ensure we have the latest data
                      let availableProperties = []
                      try {
                        const storedProperties = localStorage.getItem("properties")
                        if (storedProperties) {
                          availableProperties = JSON.parse(storedProperties)
                        }
                      } catch (error) {
                        console.error("Error loading properties from localStorage:", error)
                      }

                      return (
                        <Select
                          name="property"
                          defaultValue={availableProperties.length > 0 ? availableProperties[0].name : "no-properties"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProperties && availableProperties.length > 0 ? (
                              availableProperties.map((property) => (
                                <SelectItem key={property.id || Math.random()} value={property.name || "Unknown"}>
                                  {property.name || "Unknown Property"}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-properties">No properties available</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      )
                    })()}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input id="unit" name="unit" placeholder="e.g. Unit 101" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaseStart" className="text-right">
                    Lease Start
                  </Label>
                  <Input id="leaseStart" name="leaseStart" type="date" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaseEnd" className="text-right">
                    Lease End
                  </Label>
                  <Input id="leaseEnd" name="leaseEnd" type="date" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rent" className="text-right">
                    Monthly Rent
                  </Label>
                  <div className="relative col-span-3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input id="rent" name="rent" type="number" min="0" placeholder="0.00" className="pl-7" required />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select name="status" defaultValue="active">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="notice">Notice Given</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Tenant</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Tenants</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="notice">Notice Given</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tenants..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>View and manage all your tenants across properties.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property & Unit</TableHead>
                      <TableHead>Lease Period</TableHead>
                      <TableHead>Rent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTenants.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <Users className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No tenants found</h3>
                            <p className="text-muted-foreground mt-2">
                              {searchQuery
                                ? "Try adjusting your search or filter criteria."
                                : "Add a new tenant to get started."}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={`/placeholder.svg?height=40&width=40&text=${tenant.name.substring(0, 2)}`}
                                />
                                <AvatarFallback>{tenant.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{tenant.name}</p>
                                <p className="text-sm text-muted-foreground">{tenant.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p>{tenant.property}</p>
                            <p className="text-sm text-muted-foreground">{tenant.unit}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                                {new Date(tenant.leaseEnd).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>${tenant.rent}/month</span>
                              <Badge
                                variant={
                                  tenant.paymentStatus === "paid"
                                    ? "success"
                                    : tenant.paymentStatus === "late"
                                      ? "warning"
                                      : "destructive"
                                }
                                className="w-fit mt-1"
                              >
                                {tenant.paymentStatus === "paid"
                                  ? "Paid"
                                  : tenant.paymentStatus === "late"
                                    ? "Late"
                                    : "Unpaid"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                tenant.status === "active"
                                  ? "success"
                                  : tenant.status === "notice"
                                    ? "warning"
                                    : "secondary"
                              }
                              className="capitalize"
                            >
                              {tenant.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleEditTenant(tenant)}>
                                  Edit Tenant
                                </DropdownMenuItem>
                                <DropdownMenuItem>View Lease</DropdownMenuItem>
                                <DropdownMenuItem>Contact Tenant</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setTenants((prev) =>
                                      prev.map((t) =>
                                        t.id === tenant.id
                                          ? {
                                              ...t,
                                              paymentStatus: "paid",
                                              lastPayment: new Date().toISOString().split("T")[0],
                                            }
                                          : t,
                                      ),
                                    )
                                    toast({
                                      title: "Payment Recorded",
                                      description: `Payment for ${tenant.name} has been marked as received.`,
                                      duration: 3000,
                                    })
                                  }}
                                  disabled={tenant.paymentStatus === "paid"}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Mark as Paid
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteTenant(tenant)}>
                                  Delete Tenant
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Active Tenants</CardTitle>
              <CardDescription>All tenants with active leases.</CardDescription>
            </CardHeader>
            <CardContent>{/* Same table structure as above, filtered for active tenants */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notice" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tenants with Notice</CardTitle>
              <CardDescription>Tenants who have given notice to vacate.</CardDescription>
            </CardHeader>
            <CardContent>{/* Same table structure as above, filtered for notice tenants */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Tenants</CardTitle>
              <CardDescription>Former tenants who no longer have active leases.</CardDescription>
            </CardHeader>
            <CardContent>{/* Same table structure as above, filtered for inactive tenants */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>Update tenant information and lease details.</DialogDescription>
          </DialogHeader>
          {selectedTenant && (
            <form onSubmit={saveEditedTenant}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" defaultValue={selectedTenant.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedTenant.email}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" name="phone" defaultValue={selectedTenant.phone} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <div className="col-span-3">
                    {/* Direct localStorage access for properties */}
                    {(() => {
                      // Get properties directly from localStorage to ensure we have the latest data
                      let availableProperties = []
                      try {
                        const storedProperties = localStorage.getItem("properties")
                        if (storedProperties) {
                          availableProperties = JSON.parse(storedProperties)
                        }
                      } catch (error) {
                        console.error("Error loading properties from localStorage:", error)
                      }

                      return (
                        <Select name="property" defaultValue={selectedTenant.property}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProperties && availableProperties.length > 0 ? (
                              availableProperties.map((property) => (
                                <SelectItem key={property.id || Math.random()} value={property.name || "Unknown"}>
                                  {property.name || "Unknown Property"}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-properties">No properties available</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      )
                    })()}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input id="unit" name="unit" defaultValue={selectedTenant.unit} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaseStart" className="text-right">
                    Lease Start
                  </Label>
                  <Input
                    id="leaseStart"
                    name="leaseStart"
                    type="date"
                    defaultValue={selectedTenant.leaseStart}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaseEnd" className="text-right">
                    Lease End
                  </Label>
                  <Input
                    id="leaseEnd"
                    name="leaseEnd"
                    type="date"
                    defaultValue={selectedTenant.leaseEnd}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rent" className="text-right">
                    Monthly Rent
                  </Label>
                  <div className="relative col-span-3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input
                      id="rent"
                      name="rent"
                      type="number"
                      min="0"
                      defaultValue={selectedTenant.rent}
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select name="status" defaultValue={selectedTenant.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="notice">Notice Given</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentStatus" className="text-right">
                    Payment Status
                  </Label>
                  <Select name="paymentStatus" defaultValue={selectedTenant.paymentStatus}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tenant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {tenantToDelete && <p className="text-center font-medium">{tenantToDelete.name}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDeleteTenant}>
              Delete Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-15T13:44:57.763Z

// Feature: Implement lease management
// Added on 2025-02-28T19:05:17.114Z

// Feature: Add notification system
// Added on 2025-03-03T08:06:53.144Z
