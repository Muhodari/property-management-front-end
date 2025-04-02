"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Building, Users, Wrench, BarChart, FileText } from "lucide-react"

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("properties")

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
            <TabsTrigger value="properties" className="flex flex-col items-center py-3 px-2">
              <Building className="h-5 w-5 mb-1" />
              <span className="text-xs">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="tenants" className="flex flex-col items-center py-3 px-2">
              <Users className="h-5 w-5 mb-1" />
              <span className="text-xs">Tenants</span>
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="flex flex-col items-center py-3 px-2">
              <Wrench className="h-5 w-5 mb-1" />
              <span className="text-xs">Maintenance</span>
            </TabsTrigger>
            <TabsTrigger value="finances" className="flex flex-col items-center py-3 px-2">
              <BarChart className="h-5 w-5 mb-1" />
              <span className="text-xs">Finances</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex flex-col items-center py-3 px-2">
              <FileText className="h-5 w-5 mb-1" />
              <span className="text-xs">Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="mt-0">
            <h3 className="text-2xl font-bold mb-4">Property Management</h3>
            <p className="text-muted-foreground mb-4">
              Easily manage all your properties in one place. Track occupancy, lease terms, and property details with
              our intuitive interface.
            </p>
            <ul className="space-y-2">
              <FeatureItem>Comprehensive property listings with detailed information</FeatureItem>
              <FeatureItem>Unit management with occupancy tracking</FeatureItem>
              <FeatureItem>Visual dashboards showing property performance</FeatureItem>
              <FeatureItem>Automated notifications for important property events</FeatureItem>
            </ul>
          </TabsContent>

          <TabsContent value="tenants" className="mt-0">
            <h3 className="text-2xl font-bold mb-4">Tenant Management</h3>
            <p className="text-muted-foreground mb-4">
              Keep track of all tenant information, lease agreements, and communications in one centralized system.
            </p>
            <ul className="space-y-2">
              <FeatureItem>Complete tenant profiles with contact information</FeatureItem>
              <FeatureItem>Lease tracking with renewal reminders</FeatureItem>
              <FeatureItem>Tenant screening and application processing</FeatureItem>
              <FeatureItem>Tenant portal for communication and payments</FeatureItem>
            </ul>
          </TabsContent>

          <TabsContent value="maintenance" className="mt-0">
            <h3 className="text-2xl font-bold mb-4">Maintenance Tracking</h3>
            <p className="text-muted-foreground mb-4">
              Streamline maintenance requests and track repairs from submission to completion.
            </p>
            <ul className="space-y-2">
              <FeatureItem>Online maintenance request submission</FeatureItem>
              <FeatureItem>Work order creation and assignment</FeatureItem>
              <FeatureItem>Vendor management and scheduling</FeatureItem>
              <FeatureItem>Maintenance history for each property</FeatureItem>
            </ul>
          </TabsContent>

          <TabsContent value="finances" className="mt-0">
            <h3 className="text-2xl font-bold mb-4">Financial Management</h3>
            <p className="text-muted-foreground mb-4">
              Track rent payments, expenses, and generate detailed financial reports for your properties.
            </p>
            <ul className="space-y-2">
              <FeatureItem>Rent collection and payment tracking</FeatureItem>
              <FeatureItem>Expense management and categorization</FeatureItem>
              <FeatureItem>Financial reporting and analytics</FeatureItem>
              <FeatureItem>Tax preparation assistance</FeatureItem>
            </ul>
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <h3 className="text-2xl font-bold mb-4">Document Management</h3>
            <p className="text-muted-foreground mb-4">
              Store and organize all your important property documents securely in the cloud.
            </p>
            <ul className="space-y-2">
              <FeatureItem>Secure document storage and organization</FeatureItem>
              <FeatureItem>Lease agreement generation and e-signing</FeatureItem>
              <FeatureItem>Document sharing with tenants and vendors</FeatureItem>
              <FeatureItem>Document expiration reminders</FeatureItem>
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      <div className="relative">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0"></div>

        <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border">
          {activeTab === "properties" && (
            <img
              src="/placeholder.svg?height=500&width=600&text=Property+Management"
              alt="Property Management Screenshot"
              className="w-full h-auto"
            />
          )}
          {activeTab === "tenants" && (
            <img
              src="/placeholder.svg?height=500&width=600&text=Tenant+Management"
              alt="Tenant Management Screenshot"
              className="w-full h-auto"
            />
          )}
          {activeTab === "maintenance" && (
            <img
              src="/placeholder.svg?height=500&width=600&text=Maintenance+Tracking"
              alt="Maintenance Tracking Screenshot"
              className="w-full h-auto"
            />
          )}
          {activeTab === "finances" && (
            <img
              src="/placeholder.svg?height=500&width=600&text=Financial+Management"
              alt="Financial Management Screenshot"
              className="w-full h-auto"
            />
          )}
          {activeTab === "documents" && (
            <img
              src="/placeholder.svg?height=500&width=600&text=Document+Management"
              alt="Document Management Screenshot"
              className="w-full h-auto"
            />
          )}
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ children }) {
  return (
    <li className="flex items-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-primary mr-2 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>{children}</span>
    </li>
  )
}

