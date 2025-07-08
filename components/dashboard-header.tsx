import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, Settings, User, Bell } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">Project Kisan</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              AI Assistant Active
            </Badge>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
