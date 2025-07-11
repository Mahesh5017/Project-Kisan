"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Sprout, Edit, Phone, Mail, Camera } from "lucide-react"
import { useState } from "react"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.farmer@gmail.com",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg?height=80&width=80",
    location: "Village Khanna, Punjab, India",
    farmSize: "2.5 acres",
    joinDate: "January 2024",
    crops: ["Wheat", "Rice", "Cotton"],
    experience: "15 years",
    bio: "Experienced farmer specializing in wheat and rice cultivation. Always looking to adopt new farming techniques and technologies.",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a database
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Profile
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </DialogTitle>
          <DialogDescription>Manage your profile information and farming details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">RK</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2 flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={user.location}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {user.joinDate}
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Farm Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Sprout className="h-4 w-4 mr-2 text-green-600" />
                Farm Size
              </div>
              {isEditing ? (
                <Input value={user.farmSize} onChange={(e) => setUser({ ...user, farmSize: e.target.value })} />
              ) : (
                <p className="text-2xl font-bold text-green-600">{user.farmSize}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium">
                <Calendar className="h-4 w-4 mr-2 text-green-600" />
                Experience
              </div>
              {isEditing ? (
                <Input value={user.experience} onChange={(e) => setUser({ ...user, experience: e.target.value })} />
              ) : (
                <p className="text-2xl font-bold text-green-600">{user.experience}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Primary Crops */}
          <div className="space-y-2">
            <h4 className="font-medium">Primary Crops</h4>
            {isEditing ? (
              <Input
                placeholder="Enter crops separated by commas"
                value={user.crops.join(", ")}
                onChange={(e) => setUser({ ...user, crops: e.target.value.split(", ") })}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.crops.map((crop) => (
                  <Badge key={crop} variant="secondary">
                    {crop}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  user.email
                )}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="flex-1"
                  />
                ) : (
                  user.phone
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-2">
            <h4 className="font-medium">About</h4>
            {isEditing ? (
              <Textarea
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                placeholder="Tell us about your farming experience..."
                rows={3}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
