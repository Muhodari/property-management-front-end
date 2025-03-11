"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Building, Plus, DollarSign, TrendingUp, TrendingDown, Wrench, Users } from "lucide-react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PropertyCard } from "@/components/property-card"
import { MaintenanceRequestCard } from "@/components/maintenance-request-card"
import { RecentTransactionsTable } from "@/components/recent-transactions-table"
import { OverviewChart } from "@/components/overview-chart"

export default function DashboardPage() {
  const { toast } = useToast()
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your properties, finances, and maintenance requests.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
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

                // Get existing properties
                const storedProperties = localStorage.getItem("properties")
                const existingProperties = storedProperties ? JSON.parse(storedProperties) : []

                // Add new property
                const updatedProperties = [...existingProperties, newProperty]

                // Save to localStorage
                localStorage.setItem("properties", JSON.stringify(updatedProperties))

                // Show success toast
                toast({
                  title: "Property Added",
                  description: `${newProperty.name} has been added to your portfolio.`,
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
                  <Input
                    id="units"
                    name="units"
                    type="number"
                    min="1"
                    defaultValue="1"
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
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,580</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial-overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial-overview">Financial Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="financial-overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactionsTable />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Maintenance and lease renewal sections removed */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Your income and expenses for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Income</p>
                    <p className="text-2xl font-bold">$24,580</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold">$8,245</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Net Profit</p>
                    <p className="text-2xl font-bold">$16,335</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Profit Margin</p>
                    <p className="text-2xl font-bold">66.5%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                  <RecentTransactionsTable showMore={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Properties</h2>
            <Link href="/dashboard/properties/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Property
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PropertyCard
              name="Sunset Apartments"
              address="123 Main St, Anytown, CA 94321"
              units={8}
              occupancyRate={87.5}
              image="/placeholder.svg?height=200&width=300"
            />
            <PropertyCard
              name="Oakwood Heights"
              address="456 Oak Ave, Somewhere, CA 94123"
              units={12}
              occupancyRate={100}
              image="/placeholder.svg?height=200&width=300"
            />
            <PropertyCard
              name="Riverside Condos"
              address="789 River Rd, Elsewhere, CA 94567"
              units={6}
              occupancyRate={83.3}
              image="/placeholder.svg?height=200&width=300"
            />
            <PropertyCard
              name="Pine Street Townhomes"
              address="321 Pine St, Nowhere, CA 94789"
              units={4}
              occupancyRate={75}
              image="/placeholder.svg?height=200&width=300"
            />
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Maintenance Requests</h2>
            <Link href="/dashboard/maintenance/add">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <MaintenanceRequestCard
              title="Leaking faucet in bathroom"
              property="Sunset Apartments"
              unit="Unit 3B"
              status="in-progress"
              date="2023-08-02"
              priority="medium"
              description="The bathroom sink faucet is leaking constantly, causing water to pool around the base."
            />
            <MaintenanceRequestCard
              title="AC not cooling properly"
              property="Oakwood Heights"
              unit="Unit 12A"
              status="new"
              date="2023-08-03"
              priority="high"
              description="The air conditioning unit is running but not cooling the apartment. Temperature inside is consistently above 80°F."
            />
            <MaintenanceRequestCard
              title="Broken cabinet door in kitchen"
              property="Riverside Condos"
              unit="Unit 5C"
              status="assigned"
              date="2023-08-01"
              priority="low"
              description="The hinge on one of the kitchen cabinet doors is broken, causing the door to hang at an angle."
            />
            <MaintenanceRequestCard
              title="Garbage disposal not working"
              property="Pine Street Townhomes"
              unit="Unit 2B"
              status="new"
              date="2023-08-03"
              priority="medium"
              description="The garbage disposal makes a humming sound but doesn't grind. May be jammed or need replacement."
            />
            <MaintenanceRequestCard
              title="Ceiling light fixture flickering"
              property="Sunset Apartments"
              unit="Unit 4A"
              status="completed"
              date="2023-07-28"
              priority="low"
              description="The ceiling light in the living room flickers intermittently. May need new bulbs or wiring check."
            />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-11T12:06:24.116Z

// Feature: Add maintenance request tracking
// Added on 2025-02-24T05:14:24.262Z

// Feature: Implement maintenance history logging
// Added on 2025-03-11T23:36:19.643Z
