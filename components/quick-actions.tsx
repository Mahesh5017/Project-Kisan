import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, TrendingUp, FileText, Phone, MessageCircle, Newspaper } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: Camera,
      label: "Diagnose Crop",
      description: "Take photo for disease analysis",
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      icon: TrendingUp,
      label: "Check Prices",
      description: "Get current market rates",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
      icon: FileText,
      label: "Find Schemes",
      description: "Browse government programs",
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    },
    {
      icon: Phone,
      label: "Expert Call",
      description: "Connect with agronomist",
      color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    },
    {
      icon: MessageCircle,
      label: "Community",
      description: "Join farmer discussions",
      color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
    },
    {
      icon: Newspaper,
      label: "Agri News",
      description: "Latest farming updates",
      color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color}`}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
