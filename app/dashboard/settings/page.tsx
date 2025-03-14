"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Mail,
  Phone,
  Building,
  Upload,
  Save,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Download,
  Badge,
} from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordInput, setPasswordInput] = useState("")

  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    company: "Smith Property Management",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Experienced property manager with over 10 years in residential and commercial property management.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    currency: "USD",
  }

  // Password strength checker
  const checkPasswordStrength = (password) => {
    setPasswordInput(password)

    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 1

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1

    // Contains number
    if (/[0-9]/.test(password)) strength += 1

    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  // Get password strength text and color
  const getPasswordStrengthInfo = () => {
    if (passwordInput.length === 0) return { text: "", color: "" }

    if (passwordStrength <= 2) return { text: "Weak", color: "text-red-500" }
    if (passwordStrength <= 3) return { text: "Medium", color: "text-yellow-500" }
    return { text: "Strong", color: "text-green-500" }
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleSaveNotifications = (e) => {
    e.preventDefault()
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleSaveAppearance = (e) => {
    e.preventDefault()
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance settings have been updated.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />

      <Tabs defaultValue="profile" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile}>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={user.phone} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" defaultValue={user.company} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue={user.role} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={user.bio} rows={4} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user.location} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your regional and display preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue={user.language}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue={user.timezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Europe/Paris">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue={user.dateFormat}>
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select defaultValue={user.timeFormat}>
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                          <SelectItem value="24h">24-hour (13:30)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue={user.currency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD ($)</SelectItem>
                          <SelectItem value="AUD">AUD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How others can reach you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Change
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{user.company}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSavePassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input id="current-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          onChange={(e) => checkPasswordStrength(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </Button>
                      </div>
                      {passwordInput && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Password strength:</span>
                            <span className={`text-sm font-medium ${getPasswordStrengthInfo().color}`}>
                              {getPasswordStrengthInfo().text}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                passwordStrength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength <= 3
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center text-xs">
                              {/[A-Z]/.test(passwordInput) ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span>Uppercase letter</span>
                            </div>
                            <div className="flex items-center text-xs">
                              {/[a-z]/.test(passwordInput) ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span>Lowercase letter</span>
                            </div>
                            <div className="flex items-center text-xs">
                              {/[0-9]/.test(passwordInput) ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span>Number</span>
                            </div>
                            <div className="flex items-center text-xs">
                              {/[^A-Za-z0-9]/.test(passwordInput) ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span>Special character</span>
                            </div>
                            <div className="flex items-center text-xs">
                              {passwordInput.length >= 8 ? (
                                <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 text-red-500 mr-1" />
                              )}
                              <span>8+ characters</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSavePassword}>
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Text Message Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Receive a code via SMS to verify your identity.
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-sm text-muted-foreground">
                          Use an authenticator app to generate verification codes.
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Security Keys</div>
                        <div className="text-sm text-muted-foreground">
                          Use a hardware security key for authentication.
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Set Up Two-Factor Authentication
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Login Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications for new logins to your account.
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Trusted Devices</div>
                        <div className="text-sm text-muted-foreground">
                          Manage devices that can access your account without verification.
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Session Timeout</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity.
                        </div>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Actions that can permanently affect your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700"
                    >
                      Deactivate Account
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Maintenance Requests</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about new and updated maintenance requests.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Tenant Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about tenant activities and updates.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Financial Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about payments, expenses, and financial reports.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Lease Renewals</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about upcoming lease expirations and renewals.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">System Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about system updates and new features.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">SMS Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Urgent Maintenance</div>
                          <div className="text-sm text-muted-foreground">
                            Receive SMS alerts for urgent maintenance issues.
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Payment Reminders</div>
                          <div className="text-sm text-muted-foreground">
                            Receive SMS reminders about upcoming or overdue payments.
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Security Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive SMS alerts for security-related events.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">All Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive all notifications within the application.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Task Assignments</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications when tasks are assigned to you.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Document Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications when documents are added or updated.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Notification Frequency</h3>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-frequency">Email Digest Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="email-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quiet-hours">Quiet Hours</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="quiet-hours-start" className="text-xs">
                              Start Time
                            </Label>
                            <Select defaultValue="22">
                              <SelectTrigger id="quiet-hours-start">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quiet-hours-end" className="text-xs">
                              End Time
                            </Label>
                            <Select defaultValue="7">
                              <SelectTrigger id="quiet-hours-end">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={i.toString()}>
                                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Notification Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks and feels.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAppearance}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="relative cursor-pointer">
                        <div className="h-24 rounded-md border-2 border-primary bg-background p-2">
                          <div className="h-4 w-full rounded bg-primary mb-2"></div>
                          <div className="h-3 w-3/4 rounded bg-muted"></div>
                          <div className="h-3 w-1/2 rounded bg-muted mt-2"></div>
                        </div>
                        <div className="mt-2 text-center text-sm font-medium">Light</div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-primary/10">
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="relative cursor-pointer">
                        <div className="h-24 rounded-md border-2 border-muted bg-slate-950 p-2">
                          <div className="h-4 w-full rounded bg-primary mb-2"></div>
                          <div className="h-3 w-3/4 rounded bg-slate-800"></div>
                          <div className="h-3 w-1/2 rounded bg-slate-800 mt-2"></div>
                        </div>
                        <div className="mt-2 text-center text-sm font-medium">Dark</div>
                      </div>
                      <div className="relative cursor-pointer">
                        <div className="h-24 rounded-md border-2 border-muted bg-background p-2">
                          <div className="h-4 w-full rounded bg-primary mb-2"></div>
                          <div className="h-3 w-3/4 rounded bg-muted"></div>
                          <div className="h-3 w-1/2 rounded bg-muted mt-2"></div>
                        </div>
                        <div className="mt-2 text-center text-sm font-medium">System</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Color Scheme</h3>
                    <div className="mt-4 grid grid-cols-4 gap-4">
                      <div className="relative cursor-pointer">
                        <div className="h-12 rounded-md bg-primary"></div>
                        <div className="mt-2 text-center text-sm font-medium">Blue</div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-primary/10">
                          <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="relative cursor-pointer">
                        <div className="h-12 rounded-md bg-green-600"></div>
                        <div className="mt-2 text-center text-sm font-medium">Green</div>
                      </div>
                      <div className="relative cursor-pointer">
                        <div className="h-12 rounded-md bg-purple-600"></div>
                        <div className="mt-2 text-center text-sm font-medium">Purple</div>
                      </div>
                      <div className="relative cursor-pointer">
                        <div className="h-12 rounded-md bg-orange-600"></div>
                        <div className="mt-2 text-center text-sm font-medium">Orange</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Small</span>
                          <span className="text-lg">Large</span>
                        </div>
                        <Input type="range" min="0" max="4" defaultValue="2" className="w-full" />
                      </div>
                      <div className="p-4 border rounded-md">
                        <p className="font-medium">Preview</p>
                        <p className="mt-2">This is how text will appear throughout the application.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Layout Density</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="compact" name="density" className="h-4 w-4" />
                          <Label htmlFor="compact">Compact</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="comfortable" name="density" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="comfortable">Comfortable</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="spacious" name="density" className="h-4 w-4" />
                          <Label htmlFor="spacious">Spacious</Label>
                        </div>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="space-y-2">
                          <div className="h-8 bg-muted rounded-md w-full"></div>
                          <div className="h-8 bg-muted rounded-md w-full"></div>
                          <div className="h-8 bg-muted rounded-md w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Animations</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Enable Animations</div>
                          <div className="text-sm text-muted-foreground">
                            Show animations and transitions throughout the application.
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Reduced Motion</div>
                          <div className="text-sm text-muted-foreground">
                            Use simpler animations for accessibility purposes.
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveAppearance}>
                <Save className="mr-2 h-4 w-4" />
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription and billing details.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg">Professional Plan</h3>
                        <p className="text-sm text-muted-foreground">$79/month, billed monthly</p>
                      </div>
                      <Badge>Current Plan</Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Plan includes:</p>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Up to 20 properties
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Advanced financial reporting
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Document management
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Tenant portal
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          Priority support
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Billing Cycle</h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="monthly" name="billing-cycle" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="monthly">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="annually" name="billing-cycle" className="h-4 w-4" />
                        <Label htmlFor="annually">Annually (Save 10%)</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Next Billing Date</h3>
                    <p className="mt-1 text-sm">
                      Your next billing date is <strong>September 15, 2023</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Manage your payment methods.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md flex items-center justify-center text-white font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 09/2025</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your past invoices and payment history.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12345</p>
                          <p className="text-sm text-muted-foreground">August 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$79.00</p>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Paid
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12344</p>
                          <p className="text-sm text-muted-foreground">July 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$79.00</p>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Paid
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Invoice #12343</p>
                          <p className="text-sm text-muted-foreground">June 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$79.00</p>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            Paid
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View All Invoices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Get support or provide feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Support Center</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Browse our knowledge base or contact support for assistance.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Visit Support Center
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Feedback</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share your thoughts and suggestions to help us improve.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Send Feedback
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}


// Simulated initial commit note on 2025-02-19T03:11:12.204Z

// Feature: Add property comparison feature
// Added on 2025-03-04T08:31:31.555Z

// Fix/Improvement: Improve dashboard loading performance
// Modified on 2025-03-14T12:37:55.672Z
