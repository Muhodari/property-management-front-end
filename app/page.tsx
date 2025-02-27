"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, ArrowRight, BarChart, Users, Wrench, Check, ChevronRight } from "lucide-react"

// At the top of the file, add this import for the Poppins font
// Remove these lines
// import { Poppins } from 'next/font/google'
//
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-poppins",
// })

// Animated section that fades in when in view
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Feature card component
function FeatureCard({ icon, title, description, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="h-full border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="bg-primary/10 p-2.5 rounded-full w-fit mb-3">{icon}</div>
          <h3 className="text-base font-semibold mb-1.5">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

// Testimonial component
function Testimonial({ quote, author, role, delay }) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="h-full border border-border hover:shadow-md transition-all duration-300">
        <CardContent className="p-5">
          <div className="mb-3 text-primary">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14.2667 4.73333 12.8667 5.53333 11.5333C6.33333 10.2 7.46667 9.06667 8.93333 8.13333L10.6667 10.1333C9.46667 10.8 8.53333 11.6 7.86667 12.5333C7.2 13.4667 6.86667 14.4667 6.86667 15.5333C6.86667 15.7333 6.93333 15.9333 7.06667 16.1333C7.2 16.3333 7.4 16.4667 7.66667 16.5333C8 16.6 8.33333 16.5333 8.66667 16.3333C9 16.1333 9.26667 15.8667 9.46667 15.5333C9.73333 15.0667 10.0667 14.7333 10.4667 14.5333C10.8667 14.3333 11.3333 14.2667 11.8667 14.3333C12.4 14.4 12.8667 14.6 13.2667 14.9333C13.6667 15.2667 13.9333 15.7333 14.0667 16.3333C14.2 17 14.1333 17.6 13.8667 18.1333C13.6 18.6667 13.2 19.1333 12.6667 19.5333C12.1333 19.9333 11.5333 20.2 10.8667 20.3333C10.2 20.4667 9.73333 20.5333 9.33333 20.5333V21.3333ZM21.3333 21.3333C19.8667 21.3333 18.6667 20.8 17.7333 19.7333C16.8 18.6667 16.3333 17.3333 16.3333 15.7333C16.3333 14.2667 16.7333 12.8667 17.5333 11.5333C18.3333 10.2 19.4667 9.06667 20.9333 8.13333L22.6667 10.1333C21.4667 10.8 20.5333 11.6 19.8667 12.5333C19.2 13.4667 18.8667 14.4667 18.8667 15.5333C18.8667 15.7333 18.9333 15.9333 19.0667 16.1333C19.2 16.3333 19.4 16.4667 19.6667 16.5333C20 16.6 20.3333 16.5333 20.6667 16.3333C21 16.1333 21.2667 15.8667 21.4667 15.5333C21.7333 15.0667 22.0667 14.7333 22.4667 14.5333C22.8667 14.3333 23.3333 14.2667 23.8667 14.3333C24.4 14.4 24.8667 14.6 25.2667 14.9333C25.6667 15.2667 25.9333 15.7333 26.0667 16.3333C26.2 17 26.1333 17.6 25.8667 18.1333C25.6 18.6667 25.2 19.1333 24.6667 19.5333C24.1333 19.9333 23.5333 20.2 22.8667 20.3333C22.2 20.4667 21.7333 20.5333 21.3333 20.5333V21.3333Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm mb-4 italic">{quote}</p>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold">{author}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

// In the HomePage component, update the return statement to include the font class
export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PropertyPro</span>
          </div>
          {/* Header navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-xs font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-xs font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-xs font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-xs">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Manage Your Properties <span className="text-primary">with Ease</span>
              </h1>
              <p className="text-base text-muted-foreground mb-6">
                A comprehensive solution for property owners and managers to track finances, handle maintenance
                requests, and manage tenants all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-sm font-medium">Easy to Use</h3>
                    <p className="text-sm text-muted-foreground">Intuitive interface for all users</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-sm font-medium">Secure</h3>
                    <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-10"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0 animate-pulse"></div>
                <div
                  className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full z-0 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="rounded-lg overflow-hidden shadow-2xl relative z-10 border">
                  <img
                    src="/placeholder.svg?height=600&width=800&text=Property+Management+Dashboard"
                    alt="Property Management Dashboard"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-6 max-w-[80%]">
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div className="w-full h-24 bg-primary/20 rounded-md mb-2 flex items-center justify-center">
                          <Building className="h-10 w-10 text-primary" />
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                      </motion.div>
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="w-full h-24 bg-primary/20 rounded-md mb-2 flex items-center justify-center">
                          <BarChart className="h-10 w-10 text-primary" />
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <AnimatedSection delay={0.1}>
              <div className="text-3xl font-bold mb-1">5,000+</div>
              <div className="text-xs opacity-80">Properties Managed</div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="text-3xl font-bold mb-1">12,000+</div>
              <div className="text-xs opacity-80">Happy Tenants</div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-xs opacity-80">Customer Satisfaction</div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-xs opacity-80">Customer Support</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">Powerful Features for Property Management</h2>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                Everything you need to efficiently manage your properties, tenants, and finances in one place.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Building className="h-10 w-10 text-primary" />}
              title="Property Management"
              description="Easily add, edit, and organize all your properties. Track occupancy, lease terms, and property details in one place."
              delay={0.1}
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Tenant Management"
              description="Manage tenant information, lease agreements, and communications. Streamline the rental process from application to move-out."
              delay={0.2}
            />
            <FeatureCard
              icon={<Wrench className="h-10 w-10 text-primary" />}
              title="Maintenance Tracking"
              description="Receive and track maintenance requests, assign tasks to service providers, and keep tenants updated on progress."
              delay={0.3}
            />
            <FeatureCard
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Financial Reporting"
              description="Track rent payments, expenses, and generate detailed financial reports. Get insights into your property performance."
              delay={0.4}
            />
          </div>

          <AnimatedSection delay={0.5}>
            <div className="mt-12 text-center">
              <Link href="/features">
                <Button variant="outline" size="lg" className="group">
                  Explore All Features
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">What Our Users Say</h2>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                Join thousands of property owners and managers who have transformed their business with PropertyPro.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="PropertyPro has completely transformed how I manage my rental properties. The financial tracking alone has saved me hours of work each month."
              author="Sarah Johnson"
              role="Property Owner"
              delay={0.1}
            />
            <Testimonial
              quote="As a property manager handling multiple buildings, this system has been a game-changer. The maintenance request feature has improved tenant satisfaction significantly."
              author="Michael Chen"
              role="Property Manager"
              delay={0.2}
            />
            <Testimonial
              quote="The reporting features give me insights I never had before. I can now make data-driven decisions about my property investments and have increased my ROI by 15%."
              author="David Rodriguez"
              role="Real Estate Investor"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">Simple, Transparent Pricing</h2>
              <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that works best for your property management needs.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.1}>
              <Card className="overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-base font-bold mb-1.5">Starter</h3>
                  <p className="text-xs text-muted-foreground mb-3">Perfect for small property owners</p>
                  <div className="mb-3">
                    <span className="text-3xl font-bold">$5</span>
                    <span className="text-xs text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 mb-5 text-xs">
                    <li className="flex items-center">
                      <Check className="mr-2 h-3 w-3 text-primary" />
                      <span>Up to 5 properties</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-3 w-3 text-primary" />
                      <span>Basic financial reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-3 w-3 text-primary" />
                      <span>Maintenance request tracking</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-3 w-3 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Card className="overflow-hidden border-2 border-primary relative transform scale-105 shadow-lg">
                <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-6 pt-10">
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <p className="text-muted-foreground mb-4">Ideal for growing portfolios</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 20 properties</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced financial reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Document management</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Tenant portal</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Card className="overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-4">For large property portfolios</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$20</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited properties</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom financial reports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>White-labeling</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>24/7 dedicated support</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4">Ready to Simplify Your Property Management?</h2>
            <p className="text-sm opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of property owners and managers who have streamlined their operations with PropertyPro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white hover:bg-white/10"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Building className="h-5 w-5 text-primary" />
              <span className="text-base font-bold">PropertyPro</span>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-xs hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#" className="text-xs hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-xs hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="text-xs hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} PropertyPro. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


// Simulated initial commit note on 2025-02-04T21:26:14.440Z

// Feature: Add responsive design for mobile devices
// Added on 2025-02-27T06:28:19.497Z
