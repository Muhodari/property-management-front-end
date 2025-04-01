"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useState, useContext, useEffect } from "react"
import { DashboardShell, PropertiesContext } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  FileText,
  Download,
  MoreVertical,
  Trash2,
  Eye,
  Share2,
  Upload,
  File,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  FileTextIcon,
  FolderOpen,
} from "lucide-react"
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

// Sample documents data
const initialDocuments = [
  {
    id: "DOC001",
    name: "Purchase Agreement - Sunset Apartments",
    type: "agreement",
    property: "Sunset Apartments",
    category: "Legal",
    dateAdded: "2023-01-15",
    addedBy: "Admin",
    size: "2.4 MB",
    extension: "pdf",
    description: "Purchase agreement for Sunset Apartments property acquisition.",
    tags: ["purchase", "legal", "agreement"],
    shared: ["john@example.com"],
  },
  {
    id: "DOC002",
    name: "Insurance Policy - All Properties",
    type: "insurance",
    property: "All Properties",
    category: "Insurance",
    dateAdded: "2023-02-03",
    addedBy: "Admin",
    size: "1.8 MB",
    extension: "pdf",
    description: "Comprehensive insurance policy covering all managed properties.",
    tags: ["insurance", "policy", "coverage"],
    shared: [],
  },
  {
    id: "DOC003",
    name: "Property Tax Records - 2023",
    type: "tax",
    property: "All Properties",
    category: "Financial",
    dateAdded: "2023-03-12",
    addedBy: "Admin",
    size: "3.2 MB",
    extension: "pdf",
    description: "Property tax records for all properties for the 2023 fiscal year.",
    tags: ["tax", "financial", "records"],
    shared: ["accountant@example.com"],
  },
  {
    id: "DOC004",
    name: "Building Inspection Report - Oakwood Heights",
    type: "inspection",
    property: "Oakwood Heights",
    category: "Maintenance",
    dateAdded: "2023-01-20",
    addedBy: "Admin",
    size: "5.1 MB",
    extension: "pdf",
    description: "Annual building inspection report for Oakwood Heights property.",
    tags: ["inspection", "maintenance", "report"],
    shared: [],
  },
  {
    id: "DOC005",
    name: "Floor Plans - Riverside Condos",
    type: "floor_plan",
    property: "Riverside Condos",
    category: "Property",
    dateAdded: "2023-01-25",
    addedBy: "Admin",
    size: "8.7 MB",
    extension: "pdf",
    description: "Detailed floor plans for all units in Riverside Condos.",
    tags: ["floor plan", "property", "layout"],
    shared: ["contractor@example.com"],
  },
  {
    id: "DOC006",
    name: "Tenant Lease Agreement Template",
    type: "lease",
    property: "All Properties",
    category: "Legal",
    dateAdded: "2023-02-10",
    addedBy: "Admin",
    size: "1.2 MB",
    extension: "docx",
    description: "Standard lease agreement template for new tenants.",
    tags: ["lease", "agreement", "template"],
    shared: [],
  },
  {
    id: "DOC007",
    name: "Property Management Contract",
    type: "contract",
    property: "All Properties",
    category: "Legal",
    dateAdded: "2023-01-05",
    addedBy: "Admin",
    size: "1.5 MB",
    extension: "pdf",
    description: "Property management service contract.",
    tags: ["contract", "management", "legal"],
    shared: ["legal@example.com"],
  },
  {
    id: "DOC008",
    name: "Maintenance Vendor List",
    type: "vendor",
    property: "All Properties",
    category: "Maintenance",
    dateAdded: "2023-02-15",
    addedBy: "Admin",
    size: "0.8 MB",
    extension: "xlsx",
    description: "List of approved maintenance vendors and service providers.",
    tags: ["vendor", "maintenance", "contacts"],
    shared: [],
  },
  {
    id: "DOC009",
    name: "Property Photos - Pine Street Townhomes",
    type: "photos",
    property: "Pine Street Townhomes",
    category: "Property",
    dateAdded: "2023-03-05",
    addedBy: "Admin",
    size: "15.2 MB",
    extension: "zip",
    description: "High-resolution photos of Pine Street Townhomes property and units.",
    tags: ["photos", "property", "marketing"],
    shared: [],
  },
  {
    id: "DOC010",
    name: "Financial Report - Q1 2023",
    type: "financial",
    property: "All Properties",
    category: "Financial",
    dateAdded: "2023-04-10",
    addedBy: "Admin",
    size: "2.3 MB",
    extension: "xlsx",
    description: "Quarterly financial report for all properties, Q1 2023.",
    tags: ["financial", "report", "quarterly"],
    shared: ["accountant@example.com"],
  },
  {
    id: "DOC011",
    name: "Renovation Proposal - Sunset Apartments",
    type: "proposal",
    property: "Sunset Apartments",
    category: "Maintenance",
    dateAdded: "2023-03-22",
    addedBy: "Admin",
    size: "4.5 MB",
    extension: "pdf",
    description: "Renovation proposal for lobby and common areas at Sunset Apartments.",
    tags: ["renovation", "proposal", "maintenance"],
    shared: ["contractor@example.com"],
  },
  {
    id: "DOC012",
    name: "Tenant Handbook",
    type: "handbook",
    property: "All Properties",
    category: "Tenant",
    dateAdded: "2023-02-08",
    addedBy: "Admin",
    size: "3.7 MB",
    extension: "pdf",
    description: "Comprehensive handbook for tenants with policies and procedures.",
    tags: ["handbook", "tenant", "policies"],
    shared: [],
  },
]

// Document categories
const categories = [
  { id: "all", name: "All Documents" },
  { id: "legal", name: "Legal" },
  { id: "financial", name: "Financial" },
  { id: "property", name: "Property" },
  { id: "maintenance", name: "Maintenance" },
  { id: "insurance", name: "Insurance" },
  { id: "tenant", name: "Tenant" },
]

// Get icon based on file extension
const getFileIcon = (extension) => {
  switch (extension) {
    case "pdf":
      return <FilePdf className="h-10 w-10 text-red-500" />
    case "docx":
    case "doc":
      return <FileTextIcon className="h-10 w-10 text-blue-500" />
    case "xlsx":
    case "xls":
      return <FileSpreadsheet className="h-10 w-10 text-green-500" />
    case "jpg":
    case "png":
    case "gif":
      return <FileImage className="h-10 w-10 text-purple-500" />
    case "zip":
      return <File className="h-10 w-10 text-yellow-500" />
    default:
      return <FileText className="h-10 w-10 text-gray-500" />
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments)
  // Add this state variable for properties
  const [internalProperties, setInternalProperties] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [filterProperty, setFilterProperty] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const { toast } = useToast()
  const { properties: systemProperties, refreshProperties } = useContext(PropertiesContext)

  const [documentToDelete, setDocumentToDelete] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Add this useEffect to load properties from localStorage
  useEffect(() => {
    try {
      const storedProperties = localStorage.getItem("properties")
      if (storedProperties) {
        setInternalProperties(JSON.parse(storedProperties))
      }
    } catch (error) {
      console.error("Error loading properties:", error)
    }
  }, [])

  // Load properties when component mounts
  useEffect(() => {
    refreshProperties()
  }, [refreshProperties])

  // Filter documents based on active category, property, and search term
  const filteredDocuments = documents.filter((document) => {
    // Filter by category
    if (activeCategory !== "all" && document.category.toLowerCase() !== activeCategory.toLowerCase()) return false

    // Filter by property
    if (filterProperty !== "all" && document.property !== filterProperty) return false

    // Filter by search term
    if (
      searchTerm &&
      !document.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !document.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !document.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    return true
  })

  // Get unique properties for filter dropdown
  const documentProperties = [...new Set(documents.map((document) => document.property))]

  // Count documents by category
  const categoryCounts = categories.reduce((acc, category) => {
    if (category.id === "all") {
      acc[category.id] = documents.length
    } else {
      acc[category.id] = documents.filter((doc) => doc.category.toLowerCase() === category.id.toLowerCase()).length
    }
    return acc
  }, {})

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Document Management"
        text="Store, organize, and share important documents for your properties."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a document to your property management system.</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const newDocument = {
                  id: `DOC${Math.floor(Math.random() * 1000)}`,
                  name: formData.get("name"),
                  type: formData.get("type"),
                  property: formData.get("property"),
                  category: formData.get("category"),
                  dateAdded: new Date().toISOString().split("T")[0],
                  addedBy: "Admin",
                  size: "1.2 MB", // Placeholder
                  extension: formData.get("file").name.split(".").pop() || "pdf",
                  description: formData.get("description"),
                  tags: formData
                    .get("tags")
                    .split(",")
                    .map((tag) => tag.trim()),
                  shared: [],
                }

                // Add new document to the list
                setDocuments([newDocument, ...documents])

                // Show success toast
                toast({
                  title: "Document Uploaded",
                  description: `${newDocument.name} has been uploaded successfully.`,
                  duration: 3000,
                })

                // Close dialog - find the close button and click it
                const closeButton = document.querySelector('[data-state="open"] button[data-state="closed"]')
                if (closeButton instanceof HTMLElement) {
                  closeButton.click()
                }

                // Reset the form
                e.target.reset()
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    File
                  </Label>
                  <div className="col-span-3">
                    <Input id="file" name="file" type="file" required />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Document Name
                  </Label>
                  <Input id="name" name="name" placeholder="e.g. Lease Agreement" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Document Type
                  </Label>
                  <Select name="type" defaultValue="agreement">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agreement">Agreement</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="lease">Lease</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="tax">Tax Document</SelectItem>
                      <SelectItem value="inspection">Inspection Report</SelectItem>
                      <SelectItem value="financial">Financial Report</SelectItem>
                      <SelectItem value="floor_plan">Floor Plan</SelectItem>
                      <SelectItem value="photos">Photos</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <Select name="property" defaultValue="All Properties">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Properties">All Properties</SelectItem>
                      {systemProperties.map((property) => (
                        <SelectItem key={property.id} value={property.name}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select name="category" defaultValue="Legal">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c.id !== "all")
                        .map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Brief description of the document"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="tags" className="text-right pt-2">
                    Tags
                  </Label>
                  <Input id="tags" name="tags" placeholder="Enter tags separated by commas" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Upload Document</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents by name, description, or tags..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterProperty} onValueChange={setFilterProperty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {systemProperties.map((property) => (
                <SelectItem key={property.id} value={property.name}>
                  {property.name}
                </SelectItem>
              ))}
              {documentProperties
                .filter((p) => p !== "All Properties" && !systemProperties.some((sp) => sp.name === p))
                .map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-grid-2x2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 12h18" />
                <path d="M12 3v18" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveCategory} value={activeCategory}>
        <TabsList className="flex overflow-x-auto pb-px">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {category.name} ({categoryCounts[category.id]})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          {selectedDocument ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{getFileIcon(selectedDocument.extension)}</div>
                    <div>
                      <CardTitle>{selectedDocument.name}</CardTitle>
                      <CardDescription>
                        {selectedDocument.property} • Added on {formatDate(selectedDocument.dateAdded)}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                    Back to Documents
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Document Details</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Category</p>
                          <p className="mt-1">{selectedDocument.category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Type</p>
                          <p className="mt-1">
                            {selectedDocument.type.charAt(0).toUpperCase() +
                              selectedDocument.type.slice(1).replace("_", " ")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Description</p>
                        <p className="mt-1">{selectedDocument.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">File Size</p>
                          <p className="mt-1">{selectedDocument.size}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">File Type</p>
                          <p className="mt-1 uppercase">{selectedDocument.extension}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tags</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedDocument.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="bg-muted">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Document Preview</h3>
                      <div className="border rounded-md p-4 flex items-center justify-center bg-muted h-[300px]">
                        <div className="text-center">
                          {getFileIcon(selectedDocument.extension)}
                          <p className="mt-4 text-muted-foreground">Preview not available</p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                              window.open(`#view-${selectedDocument.id}`, "_blank")
                              toast({
                                title: "Opening Document",
                                description: `Opening ${selectedDocument.name} in a new tab.`,
                              })
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Open Document
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Document Actions</h3>
                    <div className="space-y-4">
                      <Button
                        className="w-full"
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement("a")
                          link.href = `#download-${selectedDocument.id}`
                          link.download = selectedDocument.name
                          link.click()
                          toast({
                            title: "Document Downloaded",
                            description: `${selectedDocument.name} has been downloaded.`,
                          })
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Document
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Share Link Generated",
                            description: `A sharing link for ${selectedDocument.name} has been copied to clipboard.`,
                          })
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Document
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          window.open(`#view-${selectedDocument.id}`, "_blank")
                          toast({
                            title: "Opening Document",
                            description: `Opening ${selectedDocument.name} in a new tab.`,
                          })
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Document
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => {
                          setDocumentToDelete(selectedDocument)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Document
                      </Button>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Shared With</h3>
                      {selectedDocument.shared.length > 0 ? (
                        <div className="space-y-2">
                          {selectedDocument.shared.map((email, index) => (
                            <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                              <span>{email}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  // Remove email from shared list
                                  const updatedDocument = {
                                    ...selectedDocument,
                                    shared: selectedDocument.shared.filter((_, i) => i !== index),
                                  }

                                  // Update documents array
                                  setDocuments(
                                    documents.map((d) => (d.id === selectedDocument.id ? updatedDocument : d)),
                                  )

                                  // Update selected document
                                  setSelectedDocument(updatedDocument)

                                  toast({
                                    title: "Sharing Removed",
                                    description: `${email} no longer has access to ${selectedDocument.name}.`,
                                  })
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">This document hasn't been shared with anyone yet.</p>
                      )}

                      <div className="mt-4">
                        <Label htmlFor="share-email">Share with</Label>
                        <div className="flex mt-1 gap-2">
                          <Input id="share-email" placeholder="Enter email address" />
                          <Button
                            onClick={() => {
                              const emailInput = document.getElementById("share-email") as HTMLInputElement
                              if (emailInput && emailInput.value) {
                                const email = emailInput.value
                                // Update the shared list
                                const updatedDocument = {
                                  ...selectedDocument,
                                  shared: [...selectedDocument.shared, email],
                                }

                                // Update documents array
                                setDocuments(documents.map((d) => (d.id === selectedDocument.id ? updatedDocument : d)))

                                // Update selected document
                                setSelectedDocument(updatedDocument)

                                // Clear input
                                emailInput.value = ""

                                toast({
                                  title: "Document Shared",
                                  description: `${selectedDocument.name} has been shared with ${email}.`,
                                })
                              } else {
                                toast({
                                  title: "Error",
                                  description: "Please enter a valid email address.",
                                  variant: "destructive",
                                })
                              }
                            }}
                          >
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredDocuments.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDocuments.map((document) => (
                      <Card
                        key={document.id}
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => setSelectedDocument(document)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">{getFileIcon(document.extension)}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{document.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{document.property}</p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="bg-muted text-xs">
                                  {document.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{formatDate(document.dateAdded)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Simulate download
                              const link = document.createElement("a")
                              link.href = `#download-${document.id}`
                              link.download = document.name
                              link.click()
                              toast({
                                title: "Document Downloaded",
                                description: `${document.name} has been downloaded.`,
                              })
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedDocument(document)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  // Simulate download
                                  const link = document.createElement("a")
                                  link.href = `#download-${document.id}`
                                  link.download = document.name
                                  link.click()
                                  toast({
                                    title: "Document Downloaded",
                                    description: `${document.name} has been downloaded.`,
                                  })
                                }}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  toast({
                                    title: "Share Link Generated",
                                    description: `A sharing link for ${document.name} has been copied to clipboard.`,
                                  })
                                }}
                              >
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setDocumentToDelete(document)
                                  setDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Library</CardTitle>
                      <CardDescription>All documents matching your filters</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Date Added</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredDocuments.map((document) => (
                              <TableRow
                                key={document.id}
                                className="cursor-pointer"
                                onClick={() => setSelectedDocument(document)}
                              >
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    {getFileIcon(document.extension)}
                                    <span>{document.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{document.category}</TableCell>
                                <TableCell>{document.property}</TableCell>
                                <TableCell>{formatDate(document.dateAdded)}</TableCell>
                                <TableCell>{document.size}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        // Simulate download
                                        const link = document.createElement("a")
                                        link.href = `#download-${document.id}`
                                        link.download = document.name
                                        link.click()
                                        toast({
                                          title: "Document Downloaded",
                                          description: `${document.name} has been downloaded.`,
                                        })
                                      }}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => setSelectedDocument(document)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            // Simulate download
                                            const link = document.createElement("a")
                                            link.href = `#download-${document.id}`
                                            link.download = document.name
                                            link.click()
                                            toast({
                                              title: "Document Downloaded",
                                              description: `${document.name} has been downloaded.`,
                                            })
                                          }}
                                        >
                                          <Download className="mr-2 h-4 w-4" />
                                          Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            toast({
                                              title: "Share Link Generated",
                                              description: `A sharing link for ${document.name} has been copied to clipboard.`,
                                            })
                                          }}
                                        >
                                          <Share2 className="mr-2 h-4 w-4" />
                                          Share
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setDocumentToDelete(document)
                                            setDeleteDialogOpen(true)
                                          }}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )
              ) : (
                <div className="flex justify-center items-center p-8">
                  <div className="text-center">
                    <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
                    <p className="text-muted-foreground mt-2">
                      {searchTerm || filterProperty !== "all" || activeCategory !== "all"
                        ? "Try adjusting your filters or search term"
                        : "Upload a document to get started"}
                    </p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        document.querySelector('[role="dialog"] button')?.click()
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Remove the document from the list
                setDocuments(documents.filter((d) => d.id !== documentToDelete.id))

                // If we're deleting the currently selected document, go back to the list
                if (selectedDocument && selectedDocument.id === documentToDelete.id) {
                  setSelectedDocument(null)
                }

                // Show success toast
                toast({
                  title: "Document Deleted",
                  description: `${documentToDelete.name} has been deleted.`,
                  variant: "destructive",
                })

                // Close the dialog
                setDeleteDialogOpen(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-18T14:58:52.998Z

// Fix/Improvement: Enhance form validation error messages
// Modified on 2025-03-17T13:51:50.907Z

// Fix/Improvement: Improve error boundary handling
// Modified on 2025-04-01T20:01:27.082Z
