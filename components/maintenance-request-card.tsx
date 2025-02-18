import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar } from "lucide-react"

interface MaintenanceRequestCardProps {
  title: string
  property: string
  unit: string
  status: "new" | "assigned" | "in-progress" | "completed" | "cancelled"
  date: string
  priority: "low" | "medium" | "high" | "emergency"
  description?: string
}

export function MaintenanceRequestCard({
  title,
  property,
  unit,
  status,
  date,
  priority,
  description,
}: MaintenanceRequestCardProps) {
  // Generate a random ID for demo purposes
  const id = Math.floor(Math.random() * 1000)

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    assigned: "bg-purple-100 text-purple-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-gray-100 text-gray-800",
  }

  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    emergency: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold">{title}</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className={priorityColors[priority]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
            <Badge variant="outline" className={statusColors[status]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="flex items-center text-muted-foreground">
            <Building className="h-3.5 w-3.5 mr-1" />
            {property}, {unit}
          </p>
          <p className="flex items-center text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Reported on {new Date(date).toLocaleDateString()}
          </p>
          {description && <p className="pt-2 text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1">
          View Details
        </Button>
        {status !== "completed" && status !== "cancelled" && (
          <Button variant="outline" className="flex-1">
            Update Status
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}


// Simulated initial commit note on 2025-02-18T02:46:33.792Z
