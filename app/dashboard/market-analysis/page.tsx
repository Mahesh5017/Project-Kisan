import { MarketAnalysis } from "@/components/market-analysis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react"

export default function MarketAnalysisPage() {
  const marketTrends = [
    {
      crop: "Tomato",
      currentPrice: 28,
      change: "+15%",
      trend: "up",
      recommendation: "Sell Now",
    },
    {
      crop: "Onion",
      currentPrice: 22,
      change: "-12%",
      trend: "down",
      recommendation: "Hold",
    },
    {
      crop: "Potato",
      currentPrice: 18,
      change: "0%",
      trend: "stable",
      recommendation: "Monitor",
    },
    {
      crop: "Wheat",
      currentPrice: 35,
      change: "+8%",
      trend: "up",
      recommendation: "Good to Sell",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "Sell Now":
      case "Good to Sell":
        return "bg-green-100 text-green-800"
      case "Hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="mr-3 h-8 w-8 text-blue-600" />
          Market Analysis
        </h1>
        <p className="text-gray-600">
          Get real-time market prices and trends to make informed selling decisions for maximum profits.
        </p>
      </div>

      {/* Main Market Analysis Component */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketAnalysis />
        </div>

        {/* Market Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Market Summary</CardTitle>
              <CardDescription>Today's price overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketTrends.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.crop}</h4>
                      {getTrendIcon(item.trend)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">₹{item.currentPrice}/kg</span>
                      <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>{item.change}</span>
                    </div>
                    <Badge className={getRecommendationColor(item.recommendation)}>{item.recommendation}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Weekly Trends
            </CardTitle>
            <CardDescription>Price movements over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tomato</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-green-200 rounded-full">
                    <div className="w-16 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-green-600">+15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Wheat</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-green-200 rounded-full">
                    <div className="w-10 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-green-600">+8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Onion</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-red-200 rounded-full">
                    <div className="w-12 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-red-600">-12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Tips</CardTitle>
            <CardDescription>Maximize your profits with these insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Best Selling Times</h4>
                <p className="text-sm text-gray-600">Early morning (6-8 AM) typically offers better prices</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Quality Matters</h4>
                <p className="text-sm text-gray-600">Grade A produce can fetch 20-30% higher prices</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Seasonal Patterns</h4>
                <p className="text-sm text-gray-600">Track seasonal demand to plan your harvest timing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
