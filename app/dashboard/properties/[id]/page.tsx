import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Users, FileText, MapPin, Calendar, Plus, Check } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { MaintenanceRequestCard } from "@/components/maintenance-request-card"
import { RecentTransactionsTable } from "@/components/recent-transactions-table"
import { Progress } from "@/components/ui/progress"

export default function PropertyDetailsPage({ params }) {
  // In a real app, you would fetch property data based on params.id
  const property = {
    id: params.id,
    name: "Sunset Apartments",
    address: "123 Main St, Anytown, CA 94321",
    type: "Residential",
    units: 8,
    occupiedUnits: 7,
    occupancyRate: 87.5,
    monthlyIncome: 12500,
    monthlyExpenses: 4200,
    image: "/placeholder.svg?height=300&width=600",
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={property.name} text={property.address}>
        <Link href={`/dashboard/properties/${property.id}/edit`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Property
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardContent className="p-0">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              className="w-full h-auto rounded-t-lg"
            />
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Property Type</h3>
                  <p className="font-medium">{property.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Total Units</h3>
                  <p className="font-medium">{property.units}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Address</h3>
                  <p className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {property.address}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Acquisition Date</h3>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    January 15, 2020
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Occupancy</CardTitle>
            <CardDescription>Current occupancy status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Occupancy Rate</span>
                <span className="font-bold">{property.occupancyRate}%</span>
              </div>
              <Progress value={property.occupancyRate} className="h-2" />

              <div className="pt-2">
                <div className="flex justify-between text-sm">
                  <span>Occupied Units</span>
                  <span>
                    {property.occupiedUnits} / {property.units}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Income</span>
                  <span className="font-bold">${property.monthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium">Monthly Expenses</span>
                  <span className="font-bold">${property.monthlyExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <span className="text-sm font-medium">Net Income</span>
                  <span className="font-bold">
                    ${(property.monthlyIncome - property.monthlyExpenses).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="units" className="mt-6">
        <TabsList>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="space-y-4 mt-6">
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Property Management</h2>
              <Link href="/dashboard/properties/add">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Property Portfolio</CardTitle>
                <CardDescription>Manage your property investments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Use our comprehensive property management tools to:</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Add new properties to your portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Track financial performance of your investments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Manage maintenance requests and property upkeep</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Generate detailed reports on your property portfolio</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Link href="/dashboard/properties/add">
                    <Button size="lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Property
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Tenants</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Tenants</CardTitle>
              <CardDescription>All tenants currently occupying units in this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(property.occupiedUnits)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">John Doe {index + 1}</p>
                        <p className="text-sm text-muted-foreground">Unit {index + 1} • Since Jan 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Income and expenses for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Income</p>
                    <p className="text-2xl font-bold">${property.monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Expenses</p>
                    <p className="text-2xl font-bold">${property.monthlyExpenses.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Net Income</p>
                    <p className="text-2xl font-bold">
                      ${(property.monthlyIncome - property.monthlyExpenses).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Cash on Cash Return</p>
                    <p className="text-2xl font-bold">8.2%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                  <RecentTransactionsTable propertyId={property.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Maintenance Requests</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>

          <div className="space-y-4">
            <MaintenanceRequestCard
              title="Leaking faucet in bathroom"
              property={property.name}
              unit="Unit 3"
              status="in-progress"
              date="2023-08-02"
              priority="medium"
              description="The bathroom sink faucet is leaking constantly, causing water to pool around the base."
            />
            <MaintenanceRequestCard
              title="Broken cabinet door in kitchen"
              property={property.name}
              unit="Unit 5"
              status="assigned"
              date="2023-08-01"
              priority="low"
              description="The hinge on one of the kitchen cabinet doors is broken, causing the door to hang at an angle."
            />
            <MaintenanceRequestCard
              title="Ceiling light fixture flickering"
              property={property.name}
              unit="Unit 4"
              status="completed"
              date="2023-07-28"
              priority="low"
              description="The ceiling light in the living room flickers intermittently. May need new bulbs or wiring check."
            />
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Documents</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Documents</CardTitle>
              <CardDescription>Important documents related to this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Purchase Agreement",
                  "Insurance Policy",
                  "Property Tax Records",
                  "Building Inspection Report",
                  "Floor Plans",
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc}</p>
                        <p className="text-sm text-muted-foreground">
                          Added on{" "}
                          {["Jan 15, 2020", "Feb 3, 2020", "Mar 12, 2020", "Jan 20, 2020", "Jan 25, 2020"][index]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-15T01:32:38.557Z
