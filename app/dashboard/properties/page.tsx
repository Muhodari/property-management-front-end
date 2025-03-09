"use client"

import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { initialProperties } from "@/data/properties"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { DashboardShell } from "@/components/dashboard-shell"

export default function PropertiesPage() {
  // Use local state instead of context
  const [properties, setProperties] = useState([])
  const { toast } = useToast()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Load properties from localStorage on mount
  useEffect(() => {
    try {
      const storedProperties = localStorage.getItem("properties")
      if (storedProperties) {
        setProperties(JSON.parse(storedProperties))
      } else {
        // If no properties in localStorage, use initialProperties
        setProperties(initialProperties)
        localStorage.setItem("properties", JSON.stringify(initialProperties))
      }
    } catch (error) {
      console.error("Error loading properties:", error)
      setProperties(initialProperties)
    }
  }, [])

  // Function to add a new property
  const addProperty = (newProperty) => {
    const updatedProperties = [...properties, newProperty]
    setProperties(updatedProperties)
    localStorage.setItem("properties", JSON.stringify(updatedProperties))
  }

  // Function to handle editing a property
  const handleEditProperty = (property) => {
    setPropertyToEdit(property)
    setIsEditDialogOpen(true)
  }

  // Function to handle deleting a property
  const handleDeleteProperty = (property) => {
    setPropertyToDelete(property)
    setIsDeleteDialogOpen(true)
  }

  // Function to confirm property deletion
  const confirmDeleteProperty = () => {
    const updatedProperties = properties.filter((p) => p.id !== propertyToDelete.id)
    setProperties(updatedProperties)
    localStorage.setItem("properties", JSON.stringify(updatedProperties))

    toast({
      title: "Property Deleted",
      description: `${propertyToDelete.name} has been removed from your portfolio.`,
      duration: 3000,
    })

    setIsDeleteDialogOpen(false)
    setPropertyToDelete(null)
  }

  // Function to save edited property
  const saveEditedProperty = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedProperty = {
      ...propertyToEdit,
      name: formData.get("name"),
      address: formData.get("address"),
      type: formData.get("type"),
      units: Number.parseInt(formData.get("units")),
      price: Number.parseInt(formData.get("price")),
    }

    const updatedProperties = properties.map((p) => (p.id === propertyToEdit.id ? updatedProperty : p))
    setProperties(updatedProperties)
    localStorage.setItem("properties", JSON.stringify(updatedProperties))

    toast({
      title: "Property Updated",
      description: `${updatedProperty.name} has been updated successfully.`,
      duration: 3000,
    })

    setIsEditDialogOpen(false)
    setPropertyToEdit(null)
  }

  // Function to view property details
  const viewPropertyDetails = (propertyId) => {
    window.location.href = `/dashboard/properties/${propertyId}`
  }

  return (
    <DashboardShell>
      <div className="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Property Portfolio</CardTitle>
          <CardDescription>A summary of all your properties.</CardDescription>
        </CardHeader>
        <CardContent>
          {properties && properties.length > 0 ? (
            <ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage src={property.image} alt={property.name} />
                            <AvatarFallback>{property.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span>{property.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{property.units}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{property.occupancyRate}%</span>
                          <Progress value={property.occupancyRate} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${property.price}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditProperty(property)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProperty(property)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => viewPropertyDetails(property.id)}>
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No properties found. Add your first property to get started.</p>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Property Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Enter the details of your new property to add it to your portfolio.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const newProperty = {
                id: Date.now(),
                name: formData.get("name"),
                address: formData.get("address"),
                units: Number.parseInt(formData.get("units")),
                occupancyRate: 0,
                image: "/placeholder.svg?height=200&width=300",
                price: Number.parseInt(formData.get("price")),
                type: formData.get("type"),
              }

              // Add new property
              addProperty(newProperty)

              // Show success toast
              toast({
                title: "Property Added",
                description: `${newProperty.name} has been added to your portfolio.`,
                duration: 3000,
              })

              // Close dialog
              setIsAddDialogOpen(false)

              // Reset the form
              e.target.reset()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" placeholder="Sunset Apartments" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select name="type" defaultValue="Residential">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, Anytown, CA"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="units" className="text-right">
                  Units
                </Label>
                <Input id="units" name="units" type="number" min="1" defaultValue="1" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="500000"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Property</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>Update the details of your property.</DialogDescription>
          </DialogHeader>
          {propertyToEdit && (
            <form onSubmit={saveEditedProperty}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" defaultValue={propertyToEdit.name} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select name="type" defaultValue={propertyToEdit.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={propertyToEdit.address}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="units" className="text-right">
                    Units
                  </Label>
                  <Input
                    id="units"
                    name="units"
                    type="number"
                    min="1"
                    defaultValue={propertyToEdit.units}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    defaultValue={propertyToEdit.price}
                    className="col-span-3"
                    required
                  />
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
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {propertyToDelete && <p className="text-center font-medium">{propertyToDelete.name}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDeleteProperty}>
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-13T12:55:40.939Z

// Feature: Add property performance metrics
// Added on 2025-03-09T10:34:43.614Z
