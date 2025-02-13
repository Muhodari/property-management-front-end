import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 pb-5 md:flex-row md:items-center md:justify-between", className)}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children && <div className="mt-4 flex items-center md:mt-0">{children}</div>}
    </div>
  )
}


// Simulated initial commit note on 2025-02-13T00:43:21.734Z
