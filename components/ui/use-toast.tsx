"use client"

import * as React from "react"
import { createContext, useContext, useState } from "react"

const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive"
  duration?: number
}

type ToastContextType = {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<ToastProps>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = toast.duration || TOAST_REMOVE_DELAY

    setToasts((prevToasts) => [...prevToasts, { ...toast, id, open: true }])

    // Auto-remove toast after delay
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = React.useCallback((id: string, toast: Partial<ToastProps>) => {
    setToasts((prevToasts) => prevToasts.map((t) => (t.id === id ? { ...t, ...toast } : t)))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>{children}</ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    const toasts: ToastProps[] = []

    return {
      toasts,
      toast: (props: Omit<ToastProps, "id">) => {
        console.warn("useToast was used outside of ToastProvider")
        return { id: "0" }
      },
      dismiss: (id: string) => {},
    }
  }

  const { toasts, addToast, removeToast } = context

  const toast = (props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    addToast({ ...props, id })
    return { id }
  }

  const dismiss = (id: string) => {
    removeToast(id)
  }

  return {
    toasts,
    toast,
    dismiss,
  }
}

export type { ToastProps }


// Simulated initial commit note on 2025-02-09T11:17:07.293Z

// Fix/Improvement: Improve mobile responsiveness on small screens
// Modified on 2025-03-16T13:27:12.495Z

// Fix/Improvement: Improve loading states and skeleton screens
// Modified on 2025-03-30T19:12:10.259Z
