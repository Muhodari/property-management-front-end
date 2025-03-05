"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { OverviewChart } from "@/components/overview-chart"
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  MoreVertical,
  Calendar,
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
import { Pencil, Trash2, Eye } from "lucide-react"

// Sample transactions data
const initialTransactions = [
  {
    id: "TX123",
    date: "2023-08-01",
    description: "Rent payment - Unit 3B",
    amount: 1850,
    type: "income",
    property: "Sunset Apartments",
    category: "Rent",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX124",
    date: "2023-08-02",
    description: "Plumbing repair",
    amount: 350,
    type: "expense",
    property: "Sunset Apartments",
    category: "Maintenance",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX125",
    date: "2023-08-03",
    description: "Rent payment - Unit 12A",
    amount: 2100,
    type: "income",
    property: "Oakwood Heights",
    category: "Rent",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX126",
    date: "2023-08-03",
    description: "Landscaping service",
    amount: 450,
    type: "expense",
    property: "Riverside Condos",
    category: "Maintenance",
    paymentMethod: "Check",
  },
  {
    id: "TX127",
    date: "2023-08-04",
    description: "Rent payment - Unit 5C",
    amount: 1950,
    type: "income",
    property: "Riverside Condos",
    category: "Rent",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX128",
    date: "2023-08-05",
    description: "Property insurance premium",
    amount: 1200,
    type: "expense",
    property: "All Properties",
    category: "Insurance",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX129",
    date: "2023-08-07",
    description: "Rent payment - Unit 1A",
    amount: 1750,
    type: "income",
    property: "Pine Street Townhomes",
    category: "Rent",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX130",
    date: "2023-08-10",
    description: "HVAC maintenance",
    amount: 275,
    type: "expense",
    property: "Oakwood Heights",
    category: "Maintenance",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX131",
    date: "2023-08-12",
    description: "Property tax payment",
    amount: 3200,
    type: "expense",
    property: "All Properties",
    category: "Taxes",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TX132",
    date: "2023-08-15",
    description: "Rent payment - Unit 4B",
    amount: 1900,
    type: "income",
    property: "Sunset Apartments",
    category: "Rent",
    paymentMethod: "Bank Transfer",
  },
]

// Financial summary data
const financialSummary = {
  totalIncome: 9550,
  totalExpenses: 5475,
  netProfit: 4075,
  profitMargin: 42.7,
  monthlyTrend: 5.2,
  yearToDateIncome: 68500,
  yearToDateExpenses: 39200,
  yearToDateProfit: 29300,
}

export default function FinancesPage() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [activeTab, setActiveTab] = useState("overview")
  const [filterType, setFilterType] = useState("all")
  const { toast } = useToast()

  // Add these state variables after the existing useState declarations
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [transactionToEdit, setTransactionToEdit] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState(null)
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false)
  const [transactionToView, setTransactionToView] = useState(null)
  const [properties, setProperties] = useState([])

  // Load properties from localStorage
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

  // Filter transactions based on type
  const filteredTransactions = transactions.filter((transaction) => {
    if (filterType === "all") return true
    return transaction.type === filterType
  })

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalIncome - totalExpenses
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Add these handler functions after the existing functions
  // Function to handle editing a transaction
  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction)
    setIsEditDialogOpen(true)
  }

  // Function to handle deleting a transaction
  const handleDeleteTransaction = (transaction) => {
    setTransactionToDelete(transaction)
    setIsDeleteDialogOpen(true)
  }

  // Function to view transaction details
  const handleViewTransactionDetails = (transaction) => {
    setTransactionToView(transaction)
    setIsViewDetailsDialogOpen(true)
  }

  // Function to confirm transaction deletion
  const confirmDeleteTransaction = () => {
    const updatedTransactions = transactions.filter((t) => t.id !== transactionToDelete.id)
    setTransactions(updatedTransactions)

    toast({
      title: "Transaction Deleted",
      description: `Transaction ${transactionToDelete.id} has been deleted successfully.`,
      duration: 3000,
    })

    setIsDeleteDialogOpen(false)
    setTransactionToDelete(null)
  }

  // Function to save edited transaction
  const saveEditedTransaction = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const updatedTransaction = {
      ...transactionToEdit,
      date: formData.get("date"),
      description: formData.get("description"),
      amount: Number(formData.get("amount")),
      type: formData.get("type"),
      property: formData.get("property"),
      category: formData.get("category"),
      paymentMethod: formData.get("paymentMethod"),
    }

    const updatedTransactions = transactions.map((t) => (t.id === transactionToEdit.id ? updatedTransaction : t))

    setTransactions(updatedTransactions)

    toast({
      title: "Transaction Updated",
      description: `Transaction ${updatedTransaction.id} has been updated successfully.`,
      duration: 3000,
    })

    setIsEditDialogOpen(false)
    setTransactionToEdit(null)
  }

  // Function to download transaction
  const handleDownloadTransaction = (transaction) => {
    // In a real app, this would generate a PDF or CSV
    toast({
      title: "Transaction Downloaded",
      description: `Transaction ${transaction.id} has been downloaded.`,
      duration: 3000,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Financial Management"
        text="Track income, expenses, and financial performance across your properties."
      >
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>Record a new financial transaction.</DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  const newTransaction = {
                    id: `TX${Math.floor(Math.random() * 10000)}`,
                    date: formData.get("date"),
                    description: formData.get("description"),
                    amount: Number(formData.get("amount")),
                    type: formData.get("type"),
                    property: formData.get("property"),
                    category: formData.get("category"),
                    paymentMethod: formData.get("paymentMethod"),
                  }

                  // Add new transaction to the list
                  setTransactions([newTransaction, ...transactions])

                  // Show success toast
                  toast({
                    title: "Transaction Added",
                    description: `${newTransaction.type === "income" ? "Income" : "Expense"} of $${newTransaction.amount} has been recorded.`,
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
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select name="type" defaultValue="income">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" name="date" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="Rent payment, repair, etc."
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <div className="relative col-span-3">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property" className="text-right">
                      Property
                    </Label>
                    <Select
                      name="property"
                      defaultValue={properties.length > 0 ? properties[0].name : "All Properties"}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.length > 0 ? (
                          <>
                            {properties.map((property) => (
                              <SelectItem key={property.id} value={property.name}>
                                {property.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="All Properties">All Properties</SelectItem>
                          </>
                        ) : (
                          <SelectItem value="All Properties">All Properties</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select name="category" defaultValue="Rent">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rent">Rent</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Taxes">Taxes</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="paymentMethod" className="text-right">
                      Payment Method
                    </Label>
                    <Select name="paymentMethod" defaultValue="Bank Transfer">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Transaction</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />+{financialSummary.monthlyTrend}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +1.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Monthly income and expenses for the current year</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Year-to-Date Summary</CardTitle>
                <CardDescription>Financial performance for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Total Income</div>
                      <div className="text-2xl font-bold">${financialSummary.yearToDateIncome.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Total Expenses</div>
                      <div className="text-2xl font-bold">${financialSummary.yearToDateExpenses.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Net Profit</div>
                    <div className="text-2xl font-bold">${financialSummary.yearToDateProfit.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your most recent financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`p-2 rounded-full mr-3 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(transaction.date)}</div>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("transactions")}>
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3">
                <Filter className="h-3.5 w-3.5 lg:mr-2" />
                <span className="hidden lg:inline-block">Filter</span>
              </Button>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-8 w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expenses Only</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Search transactions..." className="h-8 w-[150px] lg:w-[250px]" />
            </div>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-3.5 w-3.5 mr-2" />
              Export CSV
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                A record of all your financial transactions
                {filterType !== "all" && ` (${filterType} only)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-400px)]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                            )}
                            {transaction.description}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.property}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${
                            transaction.type === "income" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewTransactionDetails(transaction)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTransaction(transaction)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadTransaction(transaction)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDeleteTransaction(transaction)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Income Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      A summary of income and expenses for a specific time period.
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cash Flow Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Track the flow of cash in and out of your properties.
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Financial performance metrics for each property.
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Summary of tax-related income and expenses.</p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Detailed breakdown of expenses by category.</p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Custom Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a custom report with your selected parameters.
                    </p>
                    <Button variant="outline" className="w-full">
                      Create Custom Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Transaction Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>Update transaction details.</DialogDescription>
          </DialogHeader>
          {transactionToEdit && (
            <form onSubmit={saveEditedTransaction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select name="type" defaultValue={transactionToEdit.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={transactionToEdit.date}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={transactionToEdit.description}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <div className="relative col-span-3">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      min="0"
                      step="0.01"
                      defaultValue={transactionToEdit.amount}
                      className="pl-7"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <Select name="property" defaultValue={transactionToEdit.property}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.length > 0 ? (
                        <>
                          {properties.map((property) => (
                            <SelectItem key={property.id} value={property.name}>
                              {property.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="All Properties">All Properties</SelectItem>
                        </>
                      ) : (
                        <SelectItem value="All Properties">All Properties</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select name="category" defaultValue={transactionToEdit.category}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Taxes">Taxes</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paymentMethod" className="text-right">
                    Payment Method
                  </Label>
                  <Select name="paymentMethod" defaultValue={transactionToEdit.paymentMethod}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
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
              Are you sure you want to delete this transaction? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {transactionToDelete && (
              <div className="text-center">
                <p className="font-medium">{transactionToDelete.description}</p>
                <p className="text-muted-foreground">
                  {formatDate(transactionToDelete.date)} - ${transactionToDelete.amount.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDeleteTransaction}>
              Delete Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Transaction Details Dialog */}
      <Dialog open={isViewDetailsDialogOpen} onOpenChange={setIsViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Detailed information about the transaction.</DialogDescription>
          </DialogHeader>
          {transactionToView && (
            <div className="py-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${transactionToView.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {transactionToView.type === "income" ? (
                      <ArrowUpRight className="h-6 w-6 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{transactionToView.description}</h3>
                    <p className="text-muted-foreground">{formatDate(transactionToView.date)}</p>
                  </div>
                </div>
                <div
                  className={`text-xl font-bold ${transactionToView.type === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {transactionToView.type === "income" ? "+" : "-"}${transactionToView.amount.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Transaction Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">ID:</span>
                      <span className="font-medium">{transactionToView.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Type:</span>
                      <span className="font-medium capitalize">{transactionToView.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Category:</span>
                      <span className="font-medium">{transactionToView.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Method:</span>
                      <span className="font-medium">{transactionToView.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Property Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Property:</span>
                      <span className="font-medium">{transactionToView.property}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleDownloadTransaction(transactionToView)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => handleEditTransaction(transactionToView)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDeleteTransaction(transactionToView)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-16T01:57:16.969Z

// Feature: Implement financial forecasting
// Added on 2025-03-05T21:08:29.173Z
