"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, RefreshCcw } from "lucide-react"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-100 rounded-full z-0 animate-pulse"></div>
                  <div className="relative z-10 bg-red-100 p-4 rounded-full">
                    <Building className="h-12 w-12 text-red-600" />
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-3xl font-bold">Something went wrong!</h1>
              <p className="mt-4 text-muted-foreground">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => reset()} className="w-full sm:w-auto">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                <p>If the problem persists, please contact our support team.</p>
                <p className="mt-2">Error ID: {error.digest}</p>
              </div>
            </div>
          </div>

          <footer className="py-6 border-t">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PropertyPro. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}


// Simulated initial commit note on 2025-02-21T04:00:29.027Z

// Feature: Add property creation form validation
// Added on 2025-02-23T04:49:45.850Z
