import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface PropertyCardProps {
  name: string
  address: string
  units: number
  occupancyRate: number
  image: string
  price?: number
  type?: string
  id: number
}

export function PropertyCard({
  name,
  address,
  units,
  occupancyRate,
  image,
  price = 0,
  type = "Residential",
  id,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        <Badge className="absolute top-2 right-2">
          {occupancyRate === 100 ? "Fully Occupied" : occupancyRate < 50 ? "Low Occupancy" : "Partially Occupied"}
        </Badge>
        <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {address}
          </p>
          <p className="text-sm font-medium flex items-center text-primary">
            <DollarSign className="h-3.5 w-3.5 mr-1" />
            {price ? `$${price.toLocaleString()}` : "Price not available"}
          </p>
          <div className="flex items-center justify-between text-sm pt-2">
            <span className="flex items-center">
              <Building className="h-3.5 w-3.5 mr-1" />
              {units} Units
            </span>
            <span className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              {Math.round(occupancyRate)}% Occupied
            </span>
          </div>
          <div className="pt-1">
            <Progress value={occupancyRate} className="h-1.5" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/dashboard/properties/${id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View
          </Button>
        </Link>
        <Link href={`/dashboard/properties/${id}/edit`} className="flex-1">
          <Button variant="outline" className="w-full">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}


// Simulated initial commit note on 2025-02-14T01:08:00.145Z

// Fix/Improvement: Fix tenant search functionality
// Modified on 2025-03-16T01:14:53.289Z
