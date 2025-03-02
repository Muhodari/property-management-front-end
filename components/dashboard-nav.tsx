"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LayoutDashboard, Building, Users, DollarSign, Wrench, FileText, Settings, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: <Building className="mr-2 h-4 w-4" />,
    },
    {
      title: "Tenants",
      href: "/dashboard/tenants",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Finances",
      href: "/dashboard/finances",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
    {
      title: "Maintenance",
      href: "/dashboard/maintenance",
      icon: <Wrench className="mr-2 h-4 w-4" />,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4 h-full overflow-y-auto" data-component="sidebar-nav">
      {navItems.map((item) => {
        // Check if the current path matches this nav item
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))

        return (
          <Link
            key={item.href}
            href={item.href}
            scroll={false}
            className={cn(
              buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
              isActive && "bg-primary text-primary-foreground",
              "justify-start",
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        )
      })}
      <div className="mt-auto pt-4 border-t">
        <Link
          href="/logout"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "justify-start text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Link>
      </div>
    </nav>
  )
}


// Simulated initial commit note on 2025-02-12T00:18:43.322Z

// Feature: Implement document upload functionality
// Added on 2025-02-24T17:26:43.468Z

// Feature: Implement user role management
// Added on 2025-03-02T19:54:33.938Z
