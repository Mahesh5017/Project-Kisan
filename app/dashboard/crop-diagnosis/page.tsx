"use client"

import { CropDiagnosis } from "@/components/crop-diagnosis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function CropDiagnosisPage() {
  const { t } = useLanguage()

  const recentDiagnoses = [
    {
      id: 1,
      crop: t("tomato"),
      disease: "Late Blight",
      severity: t("high"),
      date: "2 " + t("hoursAgo"),
      status: t("treated"),
    },
    {
      id: 2,
      crop: t("wheat"),
      disease: "Rust Disease",
      severity: t("medium"),
      date: "1 day ago",
      status: t("inProgress"),
    },
    {
      id: 3,
      crop: t("cotton"),
      disease: t("healthy"),
      severity: t("none"),
      date: "3 days ago",
      status: t("healthy"),
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case t("high"):
        return "bg-red-100 text-red-800"
      case t("medium"):
        return "bg-yellow-100 text-yellow-800"
      case t("none"):
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case t("treated"):
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case t("inProgress"):
        return <Clock className="h-4 w-4 text-yellow-600" />
      case t("healthy"):
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Camera className="mr-3 h-8 w-8 text-green-600" />
          {t("cropDiseaseTitle")}
        </h1>
        <p className="text-gray-600">{t("cropDiseaseDesc")}</p>
      </div>

      {/* Main Diagnosis Component */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CropDiagnosis />
        </div>

        {/* Recent Diagnoses */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t("recentDiagnoses")}</CardTitle>
              <CardDescription>Your latest crop health assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiagnoses.map((diagnosis) => (
                  <div key={diagnosis.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{diagnosis.crop}</h4>
                      {getStatusIcon(diagnosis.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{diagnosis.disease}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getSeverityColor(diagnosis.severity)}>{diagnosis.severity}</Badge>
                      <span className="text-xs text-muted-foreground">{diagnosis.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("photographyTips")}</CardTitle>
          <CardDescription>Follow these guidelines to get the most accurate results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-800">{t("goodLighting")}</h4>
              <p className="text-sm text-gray-600">Take photos in natural daylight for best color accuracy</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-green-800">Close-up Shots</h4>
              <p className="text-sm text-gray-600">Focus on affected areas with clear, detailed images</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-green-800">Multiple Angles</h4>
              <p className="text-sm text-gray-600">Capture different parts of the plant for comprehensive analysis</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-green-800">Clean Background</h4>
              <p className="text-sm text-gray-600">Avoid cluttered backgrounds that might confuse the AI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
