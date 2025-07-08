"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar } from "lucide-react"

interface MarketData {
  crop: string
  currentPrice: number
  previousPrice: number
  trend: "up" | "down" | "stable"
  change: number
  market: string
  date: string
  recommendation: string
}

export function MarketAnalysis() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedMarket, setSelectedMarket] = useState("")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const crops = ["Tomato", "Onion", "Potato", "Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Soybean", "Groundnut"]

  const markets = [
    "Local Market",
    "Mandi - Delhi",
    "Mandi - Mumbai",
    "Mandi - Bangalore",
    "Mandi - Chennai",
    "Mandi - Kolkata",
    "Wholesale Market",
  ]

  const fetchMarketData = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockData: MarketData[] = [
        {
          crop: "Tomato",
          currentPrice: 28,
          previousPrice: 24,
          trend: "up",
          change: 16.7,
          market: "Local Market",
          date: "Today",
          recommendation: "Good time to sell - prices are rising due to reduced supply",
        },
        {
          crop: "Onion",
          currentPrice: 22,
          previousPrice: 25,
          trend: "down",
          change: -12,
          market: "Mandi - Delhi",
          date: "Today",
          recommendation: "Hold if possible - prices expected to recover next week",
        },
        {
          crop: "Potato",
          currentPrice: 18,
          previousPrice: 18,
          trend: "stable",
          change: 0,
          market: "Wholesale Market",
          date: "Today",
          recommendation: "Stable market - sell based on your storage capacity",
        },
      ]

      setMarketData(mockData)
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

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

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <span>Market Analysis</span>
        </CardTitle>
        <CardDescription>Get real-time market prices and trends to make informed selling decisions</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Filters */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger>
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                {markets.map((market) => (
                  <SelectItem key={market} value={market.toLowerCase()}>
                    {market}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={fetchMarketData} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Fetching Prices..." : "Get Latest Prices"}
          </Button>
        </div>

        {/* Market Data */}
        <div className="space-y-4">
          {marketData.map((data, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{data.crop}</h3>
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {data.market}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{data.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">₹{data.currentPrice}/kg</div>
                  <div className="text-sm text-gray-500">Previous: ₹{data.previousPrice}/kg</div>
                </div>

                <div className={`flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
                  {getTrendIcon(data.trend)}
                  <span className="font-semibold">
                    {data.change > 0 ? "+" : ""}
                    {data.change}%
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-1">💡 Recommendation:</h4>
                <p className="text-sm text-blue-700">{data.recommendation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Voice Query */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-2">Quick Voice Queries:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• "What's the price of tomatoes today?"</div>
            <div>• "Show me onion prices in Delhi mandi"</div>
            <div>• "Compare wheat prices across markets"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
