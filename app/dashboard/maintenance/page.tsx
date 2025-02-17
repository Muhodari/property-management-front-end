"use client"

import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell, PropertiesContext } from "@/components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CheckCircle2, Clock, MoreVertical, Plus, Search, Wrench } from "lucide-react"
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

// Sample service providers
const serviceProviders = [
  { id: 1, name: "John’s Plumbing", specialty: "Plumbing", rating: 4.8 },
  { id: 2, name: "Elite Electrical", specialty: "Electrical", rating: 4.7 },
  { id: 3, name: "HVAC Masters", specialty: "HVAC", rating: 4.9 },
  { id: 4, name: "General Repairs Inc", specialty: "General", rating: 4.5 },
  { id: 5, name: "Locksmith Pro", specialty: "Security", rating: 4.6 },
]

export default function MaintenancePage() {
  const { properties: contextProperties } = useContext(PropertiesContext)
  const { toast } = useToast()
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [requestToDelete, setRequestToDelete] = useState(null)

  // Add properties state at the top of the component with other state variables
  const [properties, setProperties] = useState([])

  // Sample maintenance requests
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: 1,
      title: "Leaking faucet in bathroom",
      property: "Sunset Apartments",
      unit: "Unit 3",
      status: "in-progress",
      date: "2023-08-02",
      priority: "medium",
      description: "The bathroom sink faucet is leaking constantly, causing water to pool around the base.",
      tenant: "Sarah Johnson",
      assignedTo: "John's Plumbing",
      images: [],
      activityLog: [
        { date: "2023-08-02", action: "Request created", user: "Sarah Johnson" },
        { date: "2023-08-03", action: "Status changed to in-progress", user: "Admin" },
        { date: "2023-08-03", action: "Assigned to John's Plumbing", user: "Admin" },
      ],
    },
    {
      id: 2,
      title: "Broken cabinet door in kitchen",
      property: "Oakwood Heights",
      unit: "Unit 5",
      status: "assigned",
      date: "2023-08-01",
      priority: "low",
      description: "The hinge on one of the kitchen cabinet doors is broken, causing the door to hang at an angle.",
      tenant: "Michael Brown",
      assignedTo: "General Repairs Inc",
      images: [],
      activityLog: [
        { date: "2023-08-01", action: "Request created", user: "Michael Brown" },
        { date: "2023-08-02", action: "Status changed to assigned", user: "Admin" },
        { date: "2023-08-02", action: "Assigned to General Repairs Inc", user: "Admin" },
      ],
    },
    {
      id: 3,
      title: "Ceiling light fixture flickering",
      property: "Sunset Apartments",
      unit: "Unit 4",
      status: "completed",
      date: "2023-07-28",
      priority: "low",
      description: "The ceiling light in the living room flickers intermittently. May need new bulbs or wiring check.",
      tenant: "Emily Wilson",
      assignedTo: "Elite Electrical",
      images: [],
      activityLog: [
        { date: "2023-07-28", action: "Request created", user: "Emily Wilson" },
        { date: "2023-07-29", action: "Status changed to assigned", user: "Admin" },
        { date: "2023-07-29", action: "Assigned to Elite Electrical", user: "Admin" },
        { date: "2023-07-31", action: "Status changed to in-progress", user: "Admin" },
        { date: "2023-08-01", action: "Status changed to completed", user: "Admin" },
        {
          date: "2023-08-01",
          action: "Note added: Replaced light fixture and checked wiring. All working properly now.",
          user: "Elite Electrical",
        },
      ],
    },
    {
      id: 4,
      title: "HVAC not cooling properly",
      property: "Parkview Residences",
      unit: "Unit 2",
      status: "new",
      date: "2023-08-04",
      priority: "high",
      description:
        "The air conditioning is running but not cooling the apartment. Temperature remains above 80 degrees even when set to 72.",
      tenant: "David Chen",
      assignedTo: null,
      images: [],
      activityLog: [{ date: "2023-08-04", action: "Request created", user: "David Chen" }],
    },
  ])

  // Add this useEffect to load properties from localStorage
  useEffect(() => {
    try {
      const storedProperties = localStorage.getItem("properties")
      if (storedProperties) {
        setProperties(JSON.parse(storedProperties))
      }
    } catch (error) {
      console.error("Error loading properties:", error)
    }
  }, [])

  // Update maintenance requests to use properties from context
  useEffect(() => {
    if (contextProperties.length > 0) {
      // Get property names from the properties context
      const propertyNames = contextProperties.map((property) => property.name)

      // Update maintenance requests to use valid property names
      setMaintenanceRequests((prev) =>
        prev.map((request) => {
          // If the request's property is not in our properties list, assign it to the first property
          if (!propertyNames.includes(request.property)) {
            return {
              ...request,
              property: propertyNames[0] || request.property,
            }
          }
          return request
        }),
      )
    }
  }, [contextProperties])

  // Function to handle status change
  const handleStatusChange = (requestId, newStatus) => {
    setMaintenanceRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const updatedReq = {
            ...req,
            status: newStatus,
            activityLog: [
              ...req.activityLog,
              {
                date: new Date().toISOString().split("T")[0],
                action: `Status changed to ${newStatus}`,
                user: "Admin",
              },
            ],
          }

          // If the selected request is being updated, update it too
          if (selectedRequest && selectedRequest.id === requestId) {
            setSelectedRequest(updatedReq)
          }

          return updatedReq
        }
        return req
      }),
    )

    toast({
      title: "Status Updated",
      description: `Request status has been changed to ${newStatus}.`,
      duration: 3000,
    })
  }

  // Function to handle service provider assignment
  const handleAssignProvider = (requestId, providerId) => {
    // If "unassigned" is selected, set assignedTo to null
    if (providerId === "unassigned") {
      setMaintenanceRequests((prev) =>
        prev.map((req) => {
          if (req.id === requestId) {
            const updatedReq = {
              ...req,
              assignedTo: null,
              activityLog: [
                ...req.activityLog,
                {
                  date: new Date().toISOString().split("T")[0],
                  action: "Request unassigned",
                  user: "Admin",
                },
              ],
            }

            // If the selected request is being updated, update it too
            if (selectedRequest && selectedRequest.id === requestId) {
              setSelectedRequest(updatedReq)
            }

            return updatedReq
          }
          return req
        }),
      )

      toast({
        title: "Provider Unassigned",
        description: "Request is now unassigned.",
        duration: 3000,
      })
      return
    }

    const provider = serviceProviders.find((p) => p.id === Number(providerId))

    setMaintenanceRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          // If status is new, change it to assigned
          const newStatus = req.status === "new" ? "assigned" : req.status

          const updatedReq = {
            ...req,
            assignedTo: provider ? provider.name : null,
            status: newStatus,
            activityLog: [
              ...req.activityLog,
              {
                date: new Date().toISOString().split("T")[0],
                action: `Assigned to ${provider ? provider.name : "No provider"}`,
                user: "Admin",
              },
            ],
          }

          // If the selected request is being updated, update it too
          if (selectedRequest && selectedRequest.id === requestId) {
            setSelectedRequest(updatedReq)
          }

          return updatedReq
        }
        return req
      }),
    )

    toast({
      title: "Provider Assigned",
      description: `Request has been assigned to ${provider ? provider.name : "a provider"}.`,
      duration: 3000,
    })
  }

  // Function to add a note to a request
  const handleAddNote = (requestId) => {
    if (!newNote.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setMaintenanceRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const updatedReq = {
            ...req,
            activityLog: [
              ...req.activityLog,
              {
                date: new Date().toISOString().split("T")[0],
                action: `Note added: ${newNote}`,
                user: "Admin",
              },
            ],
          }

          // If the selected request is being updated, update it too
          if (selectedRequest && selectedRequest.id === requestId) {
            setSelectedRequest(updatedReq)
          }

          return updatedReq
        }
        return req
      }),
    )

    toast({
      title: "Note Added",
      description: "Your note has been added to the maintenance request.",
      duration: 3000,
    })

    setNewNote("")
  }

  // Function to handle request deletion
  const handleDeleteRequest = (request) => {
    setRequestToDelete(request)
    setIsDeleteDialogOpen(true)
  }

  // Function to confirm request deletion
  const confirmDeleteRequest = () => {
    setMaintenanceRequests((prev) => prev.filter((req) => req.id !== requestToDelete.id))

    toast({
      title: "Request Deleted",
      description: `Maintenance request "${requestToDelete.title}" has been deleted.`,
      duration: 3000,
    })

    setIsDeleteDialogOpen(false)
    setRequestToDelete(null)

    // If the deleted request was selected, close the details panel
    if (selectedRequest && selectedRequest.id === requestToDelete.id) {
      setSelectedRequest(null)
      setIsDetailsOpen(false)
    }
  }

  // Filter maintenance requests based on status and search query
  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesFilter = filter === "all" || request.status === filter
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Get property names from the properties context
  const propertyNames = contextProperties.map((property) => property.name)

  return (
    <DashboardShell>
      <DashboardHeader heading="Maintenance Requests" text="Manage and track maintenance requests for your properties.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>Fill out the form to create a new maintenance request.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)

                const newRequest = {
                  id: Date.now(),
                  title: formData.get("title"),
                  property: formData.get("property"),
                  unit: formData.get("unit"),
                  status: "new",
                  date: new Date().toISOString().split("T")[0],
                  priority: formData.get("priority"),
                  description: formData.get("description"),
                  tenant: formData.get("tenant"),
                  assignedTo: null,
                  images: [],
                  activityLog: [
                    {
                      date: new Date().toISOString().split("T")[0],
                      action: "Request created",
                      user: "Admin",
                    },
                  ],
                }

                setMaintenanceRequests((prev) => [...prev, newRequest])

                toast({
                  title: "Request Created",
                  description: "Your maintenance request has been created successfully.",
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
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Brief description of the issue"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  {/* Replace the property dropdown in the Create Maintenance Request form with this simplified version */}
                  {/* Find the Select element with name="property" and replace it with: */}
                  <Select name="property" defaultValue={properties.length > 0 ? properties[0].name : ""}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.length > 0 ? (
                        properties.map((property) => (
                          <SelectItem key={property.id} value={property.name}>
                            {property.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-properties">No properties available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input id="unit" name="unit" placeholder="e.g. Unit 101" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant" className="text-right">
                    Tenant
                  </Label>
                  <Input id="tenant" name="tenant" placeholder="Tenant name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select name="priority" defaultValue="medium">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detailed description of the maintenance issue"
                    className="col-span-3"
                    rows={4}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>View and manage all maintenance requests.</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search requests..."
                      className="pl-8 w-full sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="property">Property View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-4 space-y-4">
                  {filteredRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No maintenance requests found</h3>
                      <p className="text-muted-foreground mt-2">
                        {searchQuery
                          ? "Try adjusting your search or filter criteria."
                          : "Create a new maintenance request to get started."}
                      </p>
                    </div>
                  ) : (
                    filteredRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsDetailsOpen(true)
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-2 h-full min-h-[2.5rem] rounded-full ${
                              request.priority === "low"
                                ? "bg-green-500"
                                : request.priority === "medium"
                                  ? "bg-yellow-500"
                                  : request.priority === "high"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                          />
                          <div>
                            <h3 className="font-medium">{request.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge
                                variant={
                                  request.status === "new"
                                    ? "outline"
                                    : request.status === "assigned"
                                      ? "secondary"
                                      : request.status === "in-progress"
                                        ? "default"
                                        : "success"
                                }
                                className="capitalize"
                              >
                                {request.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {request.property} • {request.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mt-4 md:mt-0">
                          <div className="flex items-center mr-4">
                            <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{request.date}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedRequest(request)
                                  setIsDetailsOpen(true)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(request.id, "assigned")
                                }}
                                disabled={request.status === "assigned" || request.status === "completed"}
                              >
                                Mark as Assigned
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(request.id, "in-progress")
                                }}
                                disabled={request.status === "in-progress" || request.status === "completed"}
                              >
                                Mark as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleStatusChange(request.id, "completed")
                                }}
                                disabled={request.status === "completed"}
                              >
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteRequest(request)
                                }}
                                className="text-red-600"
                              >
                                Delete Request
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
                <TabsContent value="property" className="mt-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {propertyNames.map((property) => {
                      const propertyRequests = filteredRequests.filter((req) => req.property === property)
                      return (
                        <Card key={property} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{property}</CardTitle>
                            <CardDescription>
                              {propertyRequests.length} maintenance request{propertyRequests.length !== 1 && "s"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-0">
                            {propertyRequests.length === 0 ? (
                              <div className="px-6 py-4 text-center text-muted-foreground">No maintenance requests</div>
                            ) : (
                              <div className="divide-y">
                                {propertyRequests.map((request) => (
                                  <div
                                    key={request.id}
                                    className="px-6 py-3 hover:bg-accent/50 cursor-pointer transition-colors"
                                    onClick={() => {
                                      setSelectedRequest(request)
                                      setIsDetailsOpen(true)
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-medium truncate max-w-[200px]">{request.title}</p>
                                        <p className="text-sm text-muted-foreground">{request.unit}</p>
                                      </div>
                                      <Badge
                                        variant={
                                          request.status === "new"
                                            ? "outline"
                                            : request.status === "assigned"
                                              ? "secondary"
                                              : request.status === "in-progress"
                                                ? "default"
                                                : "success"
                                        }
                                        className="capitalize"
                                      >
                                        {request.status}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className={`h-full ${!isDetailsOpen && "hidden md:block"}`}>
            {selectedRequest ? (
              <>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Request Details</CardTitle>
                      <CardDescription>View and manage request information</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsDetailsOpen(false)}>
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedRequest.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge
                        variant={
                          selectedRequest.status === "new"
                            ? "outline"
                            : selectedRequest.status === "assigned"
                              ? "secondary"
                              : selectedRequest.status === "in-progress"
                                ? "default"
                                : "success"
                        }
                        className="capitalize"
                      >
                        {selectedRequest.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`capitalize ${
                          selectedRequest.priority === "low"
                            ? "text-green-500 border-green-500"
                            : selectedRequest.priority === "medium"
                              ? "text-yellow-500 border-yellow-500"
                              : selectedRequest.priority === "high"
                                ? "text-orange-500 border-orange-500"
                                : "text-red-500 border-red-500"
                        }`}
                      >
                        {selectedRequest.priority} Priority
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Property:</span>
                      <span className="text-sm">{selectedRequest.property}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Unit:</span>
                      <span className="text-sm">{selectedRequest.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Tenant:</span>
                      <span className="text-sm">{selectedRequest.tenant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Date Reported:</span>
                      <span className="text-sm">{selectedRequest.date}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Description:</h4>
                    <p className="text-sm">{selectedRequest.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Status:</h4>
                    <Select
                      value={selectedRequest.status}
                      onValueChange={(value) => handleStatusChange(selectedRequest.id, value)}
                      disabled={selectedRequest.status === "completed"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Assigned To:</h4>
                    <Select
                      value={
                        selectedRequest.assignedTo
                          ? serviceProviders.find((p) => p.name === selectedRequest.assignedTo)?.id.toString()
                          : "unassigned"
                      }
                      onValueChange={(value) => handleAssignProvider(selectedRequest.id, value)}
                      disabled={selectedRequest.status === "completed"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Assign service provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Not Assigned</SelectItem>
                        {serviceProviders.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id.toString()}>
                            {provider.name} ({provider.specialty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Add Note:</h4>
                    <Textarea
                      placeholder="Add a note about this maintenance request..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      disabled={selectedRequest.status === "completed"}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddNote(selectedRequest.id)}
                      disabled={selectedRequest.status === "completed" || !newNote.trim()}
                    >
                      Add Note
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Activity Log:</h4>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                      {selectedRequest.activityLog.map((activity, index) => (
                        <div key={index} className="text-sm border-l-2 border-primary pl-3 py-1">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{activity.date}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.user}</span>
                          </div>
                          <p>{activity.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteRequest(selectedRequest)}>
                      Delete Request
                    </Button>
                    {selectedRequest.status !== "completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleStatusChange(selectedRequest.id, "completed")}
                      >
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        Mark Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No request selected</h3>
                <p className="text-muted-foreground mt-2 max-w-[250px]">
                  Select a maintenance request to view its details and manage it.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this maintenance request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {requestToDelete && <p className="text-center font-medium">{requestToDelete.title}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDeleteRequest}>
              Delete Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-17T14:34:14.586Z
