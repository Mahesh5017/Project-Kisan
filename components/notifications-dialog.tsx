"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, AlertTriangle, X, CheckCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface NotificationsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Notification {
  id: string
  type: "alert" | "info" | "success" | "warning"
  title: string
  message: string
  time: string
  read: boolean
}

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "Weather Alert",
      message: "Heavy rainfall expected in your area. Protect your crops from waterlogging.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Market Price Update",
      message: "Tomato prices increased by 15% in your local market. Good time to sell!",
      time: "4 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "New Government Scheme",
      message: "PM-KISAN scheme application deadline extended. Apply now for benefits.",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "warning",
      title: "Crop Disease Alert",
      message: "Late blight reported in nearby farms. Check your tomato plants regularly.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "info",
      title: "Expert Consultation",
      message: "Your scheduled consultation with Dr. Sharma is tomorrow at 2 PM.",
      time: "3 days ago",
      read: true,
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "success":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      default:
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    })
  }

  const clearAll = () => {
    setNotifications([])
    toast({
      title: "All notifications cleared",
      description: "Your notification list is now empty.",
    })
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DialogTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </DialogTitle>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearAll}>
                Clear all
              </Button>
            </div>
          </div>
          <DialogDescription>Stay updated with important farming alerts and updates</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
                <p className="text-sm text-muted-foreground">We'll notify you when something important happens</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-4 rounded-lg border-l-4 cursor-pointer transition-colors ${getNotificationColor(notification.type)} ${
                      !notification.read ? "ring-1 ring-green-500/20" : ""
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="my-2" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
