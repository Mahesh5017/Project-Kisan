"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Leaf } from "lucide-react"
import Image from "next/image"

interface DiagnosisResult {
  disease: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  treatment: string[]
  prevention: string[]
  localRemedies: string[]
}

export function CropDiagnosis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setDiagnosis(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeCrop = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      // Mock diagnosis result
      const mockDiagnosis: DiagnosisResult = {
        disease: "Tomato Late Blight",
        confidence: 92,
        severity: "High",
        treatment: [
          "Apply copper-based fungicide immediately",
          "Remove affected leaves and destroy them",
          "Improve air circulation around plants",
          "Reduce watering frequency",
        ],
        prevention: [
          "Plant resistant varieties",
          "Ensure proper spacing between plants",
          "Water at soil level, not on leaves",
          "Apply preventive fungicide spray",
        ],
        localRemedies: [
          "Neem oil spray (10ml per liter water)",
          "Baking soda solution (5g per liter)",
          "Garlic and chili extract spray",
          "Cow urine diluted 1:10 with water",
        ],
      }

      setDiagnosis(mockDiagnosis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span>Crop Disease Diagnosis</span>
        </CardTitle>
        <CardDescription>
          Take a photo of your diseased plant for instant AI-powered diagnosis and treatment recommendations
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="space-y-4">
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Crop image for diagnosis"
                fill
                className="object-cover"
              />
            </div>

            <Button onClick={analyzeCrop} disabled={isAnalyzing} className="w-full bg-green-600 hover:bg-green-700">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Diagnose Crop
                </>
              )}
            </Button>
          </div>
        )}

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Diagnosis Results</h3>
              <Badge className={getSeverityColor(diagnosis.severity)}>{diagnosis.severity} Severity</Badge>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-red-800">{diagnosis.disease}</h4>
              </div>
              <p className="text-sm text-red-700">Confidence: {diagnosis.confidence}% | Immediate action required</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🚨 Immediate Treatment</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {diagnosis.treatment.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🌿 Local & Affordable Remedies</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {diagnosis.localRemedies.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🛡️ Future Prevention</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {diagnosis.prevention.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!selectedImage && (
          <div className="text-center text-gray-500 text-sm bg-gray-50 p-4 rounded-lg">
            <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>Upload a clear photo of the affected plant parts</p>
            <p className="text-xs mt-1">Supported formats: JPG, PNG, HEIC</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
