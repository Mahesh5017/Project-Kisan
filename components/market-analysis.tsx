"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar, AlertCircle, BarChart3 } from "lucide-react"

// Define MarketData interface based on actual API response
interface MarketData {
  state: string
  district: string
  market: string
  commodity: string
  variety: string
  grade: string
  arrival_date: string
  min_price: number
  max_price: number
  modal_price: number
  trend: "up" | "down" | "stable"
  change: number
  recommendation: string
}

// PostgreSQL client (simplified in-memory; replace with 'pg' package)
let dbData: MarketData[] = []

export function MarketAnalysis() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Comprehensive crop list based on Indian agricultural markets
  const crops = [
    "Arhar (Tur/Red Gram)",
    "Bajra (Pearl Millet)",
    "Barley",
    "Bengalgram (Chana)",
    "Blackgram (Urad)",
    "Castor Seed",
    "Coconut",
    "Cotton",
    "Gram (Chana)",
    "Groundnut",
    "Guar Seed",
    "Jaggery",
    "Jowar (Sorghum)",
    "Jute",
    "Linseed",
    "Maize",
    "Masoor (Lentil)",
    "Moong (Green Gram)",
    "Mustard",
    "Onion",
    "Potato",
    "Rapeseed",
    "Rice",
    "Safflower",
    "Sesamum",
    "Soybean",
    "Sugarcane",
    "Sunflower",
    "Tomato",
    "Turmeric",
    "Wheat"
  ]

  // Indian states for market data
  const states = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ]

  // Fetch real-time data using the provided API key
  const fetchMarketData = async () => {
    if (!selectedCrop && !selectedState) {
      setError("Please select at least a crop or state to fetch data")
      return
    }

    setIsLoading(true)
    setError(null)
    
    const queryParams = new URLSearchParams()
    queryParams.append('api-key', '579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645')
    queryParams.append('format', 'json')
    queryParams.append('offset', '0')
    queryParams.append('limit', '1000')

    // Add filters if selected
    if (selectedCrop) {
      queryParams.append('filters[commodity]', selectedCrop)
    }
    if (selectedState) {
      queryParams.append('filters[state]', selectedState)
    }

    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${queryParams.toString()}`

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`)
      }
      
      const rawData = await response.json()

      // Log the raw data to debug the structure
      console.log('Raw API Response:', rawData)

      // Check if the response has the expected structure
      if (!rawData || typeof rawData !== 'object') {
        throw new Error('Invalid API response format')
      }

      // Handle API response structure based on actual response
      let records = []
      if (rawData.records && Array.isArray(rawData.records)) {
        records = rawData.records
      } else {
        console.log('Unexpected response structure:', rawData)
        throw new Error('No records found in API response')
      }

      console.log('Records found:', records.length)

      // Map API response to MarketData based on actual structure
      const data: MarketData[] = records.map((item: any, index: number) => {
        console.log(`Mapping item ${index}:`, item)
        
        // Calculate trend based on min/max prices (since we don't have previous prices)
        const minPrice = parseFloat(item.min_price || '0')
        const maxPrice = parseFloat(item.max_price || '0')
        const modalPrice = parseFloat(item.modal_price || '0')
        
        // Simple trend calculation: if modal price is closer to max, it's trending up
        const priceRange = maxPrice - minPrice
        const modalPosition = modalPrice - minPrice
        const trendPercentage = priceRange > 0 ? (modalPosition / priceRange) : 0.5
        
        let trend: "up" | "down" | "stable" = "stable"
        let change = 0
        
        if (trendPercentage > 0.7) {
          trend = "up"
          change = Math.round(((modalPrice - minPrice) / minPrice) * 100 * 100) / 100
        } else if (trendPercentage < 0.3) {
          trend = "down"
          change = -Math.round(((maxPrice - modalPrice) / maxPrice) * 100 * 100) / 100
        }
        
        return {
          state: item.state || 'Unknown State',
          district: item.district || 'Unknown District',
          market: item.market || 'Unknown Market',
          commodity: item.commodity || 'Unknown Commodity',
          variety: item.variety || 'Local',
          grade: item.grade || 'FAQ',
          arrival_date: item.arrival_date || new Date().toISOString().split('T')[0],
          min_price: minPrice,
          max_price: maxPrice,
          modal_price: modalPrice,
          trend,
          change,
          recommendation: generateRecommendation(change, modalPrice),
        }
      }).filter((item: { modal_price: number }) => item.modal_price > 0) // Filter out items with no valid price

      console.log('Mapped Data:', data)
      
      if (data.length === 0) {
        setError('No price data available for the selected filters. Try different crop or state combinations.')
      }
      
      dbData = data
      setMarketData(data.slice(0, 50)) // Limit to first 50 results for better performance
      
    } catch (error) {
      console.error('Fetch error:', error)
      let errorMessage = 'Failed to fetch market data. Please try again.'
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.'
        } else if (error.message.includes('JSON')) {
          errorMessage = 'Invalid data format received from API.'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
      setMarketData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Generate recommendation based on price change
  const generateRecommendation = (change: number, price: number): string => {
    if (change > 5) {
      return "Prices are rising significantly. Good time to sell if you have stock."
    } else if (change > 2) {
      return "Moderate price increase. Consider selling soon."
    } else if (change < -5) {
      return "Prices are falling. Consider holding if possible or diversify crops."
    } else if (change < -2) {
      return "Slight price decline. Monitor market trends closely."
    } else {
      return "Prices are stable. Good time for regular trading."
    }
  }

  // Store data (simplified; replace with PostgreSQL logic)
  const storeMarketData = async (data: MarketData[]) => {
    dbData = data
  }

  // Load initial data on component mount
  useEffect(() => {
    // Don't auto-fetch on mount, let user select options first
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
        <CardDescription>Get real-time market prices and trends from Indian agricultural markets</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={fetchMarketData} 
            disabled={isLoading || (!selectedCrop && !selectedState)} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Fetching Prices..." : "Get Latest Prices"}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {marketData.length > 0 ? (
            <>
              <div className="text-sm text-gray-600 mb-4 animate-fade-in">
                Showing {marketData.length} results
              </div>
              {marketData.map((data, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3 animate-fade-in hover-scale transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{data.commodity}</h3>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        {data.market}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {data.state}
                      </Badge>
                      <Badge variant="default" className="text-xs">
                        {data.variety}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{data.arrival_date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{data.modal_price.toFixed(2)}/quintal
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>Min: ₹{data.min_price.toFixed(2)} | Max: ₹{data.max_price.toFixed(2)}</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{data.grade}</Badge>
                          <span className="text-xs text-muted-foreground">{data.district}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
                      {getTrendIcon(data.trend)}
                      <span className="font-semibold">
                        {data.change > 0 ? "+" : ""}
                        {data.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 animate-scale-in">
                    <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      💡 Recommendation:
                    </h4>
                    <p className="text-sm text-blue-700">{data.recommendation}</p>
                  </div>
                </div>
              ))}
            </>
          ) : !isLoading && !error && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a crop or state and click "Get Latest Prices" to view market data</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-2">Quick Tips:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Select specific crops for targeted price information</div>
            <div>• Choose states to see regional market variations</div>
            <div>• Compare prices across different markets and states</div>
            <div>• Use trend indicators to make informed selling decisions</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}