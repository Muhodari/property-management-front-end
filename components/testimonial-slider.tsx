"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "PropertyPro has completely transformed how I manage my rental properties. The financial tracking alone has saved me hours of work each month. I can't imagine going back to spreadsheets!",
    author: "Sarah Johnson",
    role: "Property Owner",
    image: "/placeholder.svg?height=100&width=100",
    company: "Johnson Properties",
  },
  {
    quote:
      "As a property manager handling multiple buildings, this system has been a game-changer. The maintenance request feature has improved tenant satisfaction significantly and reduced our response time by 60%.",
    author: "Michael Chen",
    role: "Property Manager",
    image: "/placeholder.svg?height=100&width=100",
    company: "Urban Living Management",
  },
  {
    quote:
      "The reporting features in PropertyPro give me insights I never had before. I can now make data-driven decisions about my property investments and have increased my ROI by 15% in just six months.",
    author: "David Rodriguez",
    role: "Real Estate Investor",
    image: "/placeholder.svg?height=100&width=100",
    company: "Rodriguez Investments",
  },
  {
    quote:
      "We manage over 200 units across multiple properties, and PropertyPro has streamlined our entire operation. The tenant portal has reduced our administrative workload by at least 30%.",
    author: "Jennifer Williams",
    role: "Operations Director",
    image: "/placeholder.svg?height=100&width=100",
    company: "Citywide Properties",
  },
]

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary">
                      <Quote size={48} />
                    </div>
                    <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                    <div className="mt-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-primary">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-gray-300"}`}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-md border md:flex hidden"
        onClick={() => {
          prev()
          setAutoplay(false)
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-md border md:flex hidden"
        onClick={() => {
          next()
          setAutoplay(false)
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

