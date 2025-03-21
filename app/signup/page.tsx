import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building, Check } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Building className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mt-4 text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">Start managing your properties with PropertyPro</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
              <div className="text-xs text-muted-foreground space-y-1 mt-1">
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  <span>At least one uppercase letter</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  <span>At least one number</span>
                </div>
              </div>
            </div>

            <Button className="w-full">Create Account</Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
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


// Simulated initial commit note on 2025-02-10T23:54:04.910Z

// Feature: Implement tenant portal access
// Added on 2025-03-07T21:57:45.996Z

// Fix/Improvement: Fix tenant filtering by property
// Modified on 2025-03-21T03:18:05.348Z
