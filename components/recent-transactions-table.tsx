import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface RecentTransactionsTableProps {
  propertyId?: string
  showMore?: boolean
}

export function RecentTransactionsTable({ propertyId, showMore = false }: RecentTransactionsTableProps) {
  // In a real app, you would fetch transactions based on propertyId if provided
  const transactions = [
    {
      id: "TX123",
      date: "2023-08-01",
      description: "Rent payment - Unit 3B",
      amount: 1850,
      type: "income",
      property: "Sunset Apartments",
    },
    {
      id: "TX124",
      date: "2023-08-02",
      description: "Plumbing repair",
      amount: 350,
      type: "expense",
      property: "Sunset Apartments",
    },
    {
      id: "TX125",
      date: "2023-08-03",
      description: "Rent payment - Unit 12A",
      amount: 2100,
      type: "income",
      property: "Oakwood Heights",
    },
    {
      id: "TX126",
      date: "2023-08-03",
      description: "Landscaping service",
      amount: 450,
      type: "expense",
      property: "Riverside Condos",
    },
    {
      id: "TX127",
      date: "2023-08-04",
      description: "Rent payment - Unit 5C",
      amount: 1950,
      type: "income",
      property: "Riverside Condos",
    },
  ]

  // Filter by propertyId if provided
  const filteredTransactions = propertyId
    ? transactions.filter((t) => t.property.toLowerCase().replace(/\s+/g, "-") === propertyId)
    : transactions

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                  )}
                  {transaction.description}
                </div>
                {!propertyId && <div className="text-xs text-muted-foreground mt-1">{transaction.property}</div>}
              </TableCell>
              <TableCell
                className={`text-right font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showMore && (
        <div className="mt-4 text-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      )}
    </div>
  )
}


// Simulated initial commit note on 2025-02-17T02:21:55.380Z
