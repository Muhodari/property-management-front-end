"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building, Check } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Sample property types for the form
const propertyTypes = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Industrial", label: "Industrial" },
  { value: "Mixed Use", label: "Mixed Use" },
  { value: "Land", label: "Land" },
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "Residential",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    description: "",
    units: 1,
    occupied: 0,
    acquisitionDate: "",
    purchasePrice: "",
    currentValue: "",
    image: null,
  })

  const { toast } = useToast()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create full address
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`

      // Create new property object
      const newProperty = {
        id: Date.now(), // Use timestamp as unique ID
        name: formData.name,
        address: fullAddress,
        units: Number.parseInt(formData.units),
        occupancyRate:
          formData.units > 0 ? (Number.parseInt(formData.occupied) / Number.parseInt(formData.units)) * 100 : 0,
        image: "/placeholder.svg?height=200&width=300", // Default image
        price: formData.purchasePrice ? Number.parseInt(formData.purchasePrice) : 0,
        type: formData.type,
      }

      // Get existing properties from localStorage or use initial properties
      let existingProperties = []

      try {
        const storedProperties = localStorage.getItem("properties")
        existingProperties = storedProperties ? JSON.parse(storedProperties) : []
      } catch (error) {
        console.error("Error reading from localStorage:", error)
        existingProperties = []
      }

      // Add new property to array
      const updatedProperties = [...existingProperties, newProperty]

      // Save to localStorage
      localStorage.setItem("properties", JSON.stringify(updatedProperties))

      // Show success toast
      toast({
        title: "Property Added",
        description: `${formData.name} has been added to your portfolio.`,
        duration: 3000,
      })

      // Reset form
      setFormData({
        name: "",
        type: "Residential",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
        description: "",
        units: 1,
        occupied: 0,
        acquisitionDate: "",
        purchasePrice: "",
        currentValue: "",
        image: null,
      })

      // Redirect to properties page
      setTimeout(() => {
        setIsSubmitting(false)
        router.push("/dashboard/properties")
      }, 1000)
    } catch (error) {
      console.error("Error adding property:", error)
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "There was a problem adding your property. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Add New Property"
        text="Enter the details of your new property to add it to your portfolio."
      >
        <Link href="/dashboard/properties">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Basic information about your property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Property Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Sunset Apartments"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">
                    Property Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input id="city" placeholder="Anytown" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input id="state" placeholder="CA" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">
                      Zip Code <span className="text-red-500">*</span>
                    </Label>
                    <Input id="zip" placeholder="94321" value={formData.zip} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="United States" value={formData.country} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the property"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Units & Financials</CardTitle>
                <CardDescription>Information about units and financial details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="units">
                      Total Units <span className="text-red-500">*</span>
                    </Label>
                    <Input id="units" type="number" min="1" value={formData.units} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupied">Occupied Units</Label>
                    <Input
                      id="occupied"
                      type="number"
                      min="0"
                      max={formData.units}
                      value={formData.occupied}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acquisitionDate">Acquisition Date</Label>
                  <Input id="acquisitionDate" type="date" value={formData.acquisitionDate} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">
                    Purchase Price <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input
                      id="purchasePrice"
                      className="pl-7"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentValue">Current Value</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input
                      id="currentValue"
                      className="pl-7"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      value={formData.currentValue}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Image</CardTitle>
                <CardDescription>Upload an image of your property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <div className="mx-auto flex flex-col items-center justify-center">
                    <Building className="h-10 w-10 text-muted-foreground mb-2" />
                    <div className="flex text-sm text-muted-foreground">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }))
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    {formData.image && (
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <Check className="mr-1 h-4 w-4" />
                        {formData.image.name}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link href="/dashboard/properties">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Property"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-14T13:20:19.351Z
