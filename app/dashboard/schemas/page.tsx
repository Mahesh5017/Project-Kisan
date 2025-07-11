import { GovernmentSchemes } from "@/components/government-schemes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function SchemesPage() {
  const appliedSchemes = [
    {
      id: 1,
      name: "PM-KISAN",
      status: "Active",
      amount: "₹6,000/year",
      nextPayment: "March 2024",
    },
    {
      id: 2,
      name: "Crop Insurance",
      status: "Applied",
      amount: "₹50,000 coverage",
      nextPayment: "Processing",
    },
    {
      id: 3,
      name: "Soil Health Card",
      status: "Completed",
      amount: "Free",
      nextPayment: "Renewal due",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Applied":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Applied":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-3 h-8 w-8 text-purple-600" />
          Government Schemes
        </h1>
        <p className="text-gray-600">
          Discover and apply for government agricultural schemes and subsidies to support your farming operations.
        </p>
      </div>

      {/* Applied Schemes Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your Applied Schemes</CardTitle>
          <CardDescription>Track the status of your scheme applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {appliedSchemes.map((scheme) => (
              <div key={scheme.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{scheme.name}</h4>
                  {getStatusIcon(scheme.status)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Benefit: {scheme.amount}</p>
                  <p className="text-xs text-muted-foreground">Next: {scheme.nextPayment}</p>
                </div>
                <Badge className={getStatusColor(scheme.status)}>{scheme.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Government Schemes Component */}
      <GovernmentSchemes />

      {/* Application Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Application Tips</CardTitle>
          <CardDescription>Increase your chances of scheme approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800">Complete Documentation</h4>
              <p className="text-sm text-gray-600">Ensure all required documents are properly filled and signed</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800">Meet Deadlines</h4>
              <p className="text-sm text-gray-600">Submit applications well before the deadline to avoid rejection</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800">Verify Eligibility</h4>
              <p className="text-sm text-gray-600">Double-check eligibility criteria before applying</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-800">Follow Up</h4>
              <p className="text-sm text-gray-600">Track your application status regularly through official portals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
