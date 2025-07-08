"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FileText, Search, ExternalLink, CheckCircle, Clock, Users } from "lucide-react"

interface Scheme {
  id: string
  name: string
  category: string
  description: string
  benefits: string[]
  eligibility: string[]
  documents: string[]
  applicationLink: string
  deadline: string
  status: "Active" | "Upcoming" | "Closing Soon"
}

export function GovernmentSchemes() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [schemes] = useState<Scheme[]>([
    {
      id: "pm-kisan",
      name: "PM-KISAN Direct Benefit Transfer",
      category: "Financial Support",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers",
      benefits: ["₹2,000 every 4 months (₹6,000 annually)", "Direct bank transfer", "No middleman involvement"],
      eligibility: ["Small and marginal farmers", "Land holding up to 2 hectares", "Valid Aadhaar card required"],
      documents: ["Aadhaar Card", "Bank Account Details", "Land Records", "Mobile Number"],
      applicationLink: "https://pmkisan.gov.in",
      deadline: "Open throughout the year",
      status: "Active",
    },
    {
      id: "fasal-bima",
      name: "Pradhan Mantri Fasal Bima Yojana",
      category: "Insurance",
      description: "Crop insurance scheme providing financial support to farmers in case of crop loss",
      benefits: ["Premium subsidy up to 95%", "Coverage for all stages of crop cycle", "Quick settlement of claims"],
      eligibility: [
        "All farmers (sharecroppers & tenant farmers included)",
        "Enrolled in participating banks",
        "Timely premium payment",
      ],
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
      applicationLink: "https://pmfby.gov.in",
      deadline: "Before sowing season",
      status: "Closing Soon",
    },
    {
      id: "soil-health",
      name: "Soil Health Card Scheme",
      category: "Soil Management",
      description: "Free soil testing and nutrient management recommendations",
      benefits: ["Free soil testing", "Customized fertilizer recommendations", "Improved crop productivity"],
      eligibility: ["All farmers", "Land ownership or cultivation proof", "One card per 2.5 acres"],
      documents: ["Land Records", "Aadhaar Card", "Mobile Number"],
      applicationLink: "https://soilhealth.dac.gov.in",
      deadline: "Open throughout the year",
      status: "Active",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Closing Soon":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4" />
      case "Upcoming":
        return <Clock className="h-4 w-4" />
      case "Closing Soon":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-purple-600" />
          <span>Government Schemes Navigator</span>
        </CardTitle>
        <CardDescription>Find and apply for relevant government agricultural schemes and subsidies</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search schemes (e.g., 'irrigation subsidy', 'crop insurance')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{scheme.category}</Badge>
                    <Badge className={getStatusColor(scheme.status)}>
                      {getStatusIcon(scheme.status)}
                      <span className="ml-1">{scheme.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-gray-600">{scheme.description}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Benefits
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Users className="mr-2 h-4 w-4 text-blue-600" />
                    Eligibility
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {scheme.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Required Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {scheme.documents.map((doc, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <strong>Deadline:</strong> {scheme.deadline}
                </div>
                <Button
                  onClick={() => window.open(scheme.applicationLink, "_blank")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">Need Help?</h4>
          <p className="text-sm text-purple-700 mb-3">Ask me about specific schemes using voice commands like:</p>
          <div className="text-sm text-purple-600 space-y-1">
            <div>• "Show me subsidy schemes for drip irrigation"</div>
            <div>• "What insurance schemes are available for cotton?"</div>
            <div>• "Find loan schemes for small farmers"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
