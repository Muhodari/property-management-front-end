import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-full z-0 animate-pulse"></div>
              <div className="relative z-10 bg-primary/10 p-4 rounded-full">
                <Building className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-4xl font-bold">404</h1>
          <h2 className="mt-2 text-2xl font-semibold">Page Not Found</h2>
          <p className="mt-4 text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>

          {/* Removed search section */}

          {/* Removed testimonials/quick links section */}
        </div>
      </div>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PropertyPro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


// Simulated initial commit note on 2025-02-20T15:48:09.821Z
