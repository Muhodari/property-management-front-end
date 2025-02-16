"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

export function OverviewChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sample data for the chart
  const data = [
    { name: "Jan", income: 18500, expenses: 6200 },
    { name: "Feb", income: 19200, expenses: 6800 },
    { name: "Mar", income: 21000, expenses: 7500 },
    { name: "Apr", income: 20500, expenses: 7200 },
    { name: "May", income: 22000, expenses: 7800 },
    { name: "Jun", income: 23500, expenses: 8100 },
    { name: "Jul", income: 24580, expenses: 8245 },
  ]

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Bar dataKey="income" name="Income" fill="hsl(220, 85%, 45%)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


// Simulated initial commit note on 2025-02-16T14:09:36.174Z
