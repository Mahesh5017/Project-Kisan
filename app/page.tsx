import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, TrendingUp, FileText, Mic, Camera, Globe, Users, Award } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">Project Kisan</span>
          </div>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            AI-Powered Agricultural Assistant
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Personal <span className="text-green-600">Agronomist</span> in Your Pocket
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empowering small-scale farmers with AI-driven crop diagnosis, real-time market analysis, and government
            scheme navigation - all through simple voice commands in your native language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                <Mic className="mr-2 h-5 w-5" />
                Start Voice Assistant
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Everything You Need to Succeed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-green-800">Instant Crop Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Take a photo of diseased plants and get instant AI-powered diagnosis with affordable treatment
                  recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-green-800">Real-Time Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get current market prices and trends for your crops to make informed selling decisions and maximize
                  profits.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-green-800">Government Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Navigate complex government agricultural schemes, check eligibility, and get direct links to
                  application portals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mic className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-green-800">Voice-First Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interact entirely through voice in your native language, overcoming literacy barriers with clear audio
                  responses.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Farmers Empowered</p>
            </div>
            <div>
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Languages Supported</p>
            </div>
            <div>
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers who are already using AI to increase their yields and income.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sprout className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">Project Kisan</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Project Kisan. Empowering farmers with AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
