"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
  className?: string
}

export const PropertiesContext = React.createContext({
  properties: [],
  setProperties: (props) => {},
  refreshProperties: () => {},
  updateProperties: (props) => {},
})

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [properties, setProperties] = React.useState([])

  const refreshProperties = React.useCallback(() => {
    try {
      const storedProperties = localStorage.getItem("properties")
      if (storedProperties) {
        const parsedProperties = JSON.parse(storedProperties)
        console.log("Refreshing properties from localStorage:", parsedProperties)
        setProperties(parsedProperties)
      } else {
        console.log("No properties found in localStorage, using empty array")
        setProperties([])
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      setProperties([])
    }
  }, [])

  const updateProperties = React.useCallback((newProperties) => {
    console.log("Updating properties:", newProperties)
    // First update localStorage
    localStorage.setItem("properties", JSON.stringify(newProperties))
    // Then update state
    setProperties(newProperties)
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("propertiesUpdated"))
  }, [])

  React.useEffect(() => {
    refreshProperties()

    // Listen for property changes from other components
    const handleStorageChange = () => {
      refreshProperties()
    }

    window.addEventListener("propertiesUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("propertiesUpdated", handleStorageChange)
    }
  }, [refreshProperties])

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        refreshProperties,
        updateProperties,
      }}
    >
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <DashboardNav />
          </aside>
          <main
            className={cn(
              "flex-1 p-6 md:p-8 bg-background/95 backdrop-blur-sm",
              "rounded-lg shadow-sm border border-border/40",
              className,
            )}
          >
            <div className="relative z-10">{children}</div>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-lg -z-10 pointer-events-none" />
          </main>
        </div>
      </div>
    </PropertiesContext.Provider>
  )
}


// Simulated initial commit note on 2025-02-12T12:31:02.528Z
