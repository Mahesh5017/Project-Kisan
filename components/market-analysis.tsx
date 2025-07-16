// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar } from "lucide-react"

// interface MarketData {
//   crop: string
//   currentPrice: number
//   previousPrice: number
//   trend: "up" | "down" | "stable"
//   change: number
//   market: string
//   date: string
//   recommendation: string
// }

// export function MarketAnalysis() {
//   const [selectedCrop, setSelectedCrop] = useState("")
//   const [selectedMarket, setSelectedMarket] = useState("")
//   const [marketData, setMarketData] = useState<MarketData[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   const crops = ["Tomato", "Onion", "Potato", "Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Soybean", "Groundnut"]

//   const markets = [
//     "Local Market",
//     "Mandi - Delhi",
//     "Mandi - Mumbai",
//     "Mandi - Bangalore",
//     "Mandi - Chennai",
//     "Mandi - Kolkata",
//     "Wholesale Market",
//   ]

//   const fetchMarketData = async () => {
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       const mockData: MarketData[] = [
//         {
//           crop: "Tomato",
//           currentPrice: 28,
//           previousPrice: 24,
//           trend: "up",
//           change: 16.7,
//           market: "Local Market",
//           date: "Today",
//           recommendation: "Good time to sell - prices are rising due to reduced supply",
//         },
//         {
//           crop: "Onion",
//           currentPrice: 22,
//           previousPrice: 25,
//           trend: "down",
//           change: -12,
//           market: "Mandi - Delhi",
//           date: "Today",
//           recommendation: "Hold if possible - prices expected to recover next week",
//         },
//         {
//           crop: "Potato",
//           currentPrice: 18,
//           previousPrice: 18,
//           trend: "stable",
//           change: 0,
//           market: "Wholesale Market",
//           date: "Today",
//           recommendation: "Stable market - sell based on your storage capacity",
//         },
//       ]

//       setMarketData(mockData)
//       setIsLoading(false)
//     }, 1500)
//   }

//   useEffect(() => {
//     fetchMarketData()
//   }, [])

//   const getTrendIcon = (trend: string) => {
//     switch (trend) {
//       case "up":
//         return <TrendingUp className="h-4 w-4 text-green-600" />
//       case "down":
//         return <TrendingDown className="h-4 w-4 text-red-600" />
//       default:
//         return <Minus className="h-4 w-4 text-gray-600" />
//     }
//   }

//   const getTrendColor = (trend: string) => {
//     switch (trend) {
//       case "up":
//         return "text-green-600"
//       case "down":
//         return "text-red-600"
//       default:
//         return "text-gray-600"
//     }
//   }

//   return (
//     <Card className="h-fit">
//       <CardHeader>
//         <CardTitle className="flex items-center space-x-2">
//           <TrendingUp className="h-6 w-6 text-blue-600" />
//           <span>Market Analysis</span>
//         </CardTitle>
//         <CardDescription>Get real-time market prices and trends to make informed selling decisions</CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Search Filters */}
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Select value={selectedCrop} onValueChange={setSelectedCrop}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select crop" />
//               </SelectTrigger>
//               <SelectContent>
//                 {crops.map((crop) => (
//                   <SelectItem key={crop} value={crop.toLowerCase()}>
//                     {crop}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={selectedMarket} onValueChange={setSelectedMarket}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select market" />
//               </SelectTrigger>
//               <SelectContent>
//                 {markets.map((market) => (
//                   <SelectItem key={market} value={market.toLowerCase()}>
//                     {market}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Button onClick={fetchMarketData} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
//             <Search className="mr-2 h-4 w-4" />
//             {isLoading ? "Fetching Prices..." : "Get Latest Prices"}
//           </Button>
//         </div>

//         {/* Market Data */}
//         <div className="space-y-4">
//           {marketData.map((data, index) => (
//             <div key={index} className="border rounded-lg p-4 space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <h3 className="font-semibold text-lg">{data.crop}</h3>
//                   <Badge variant="outline" className="text-xs">
//                     <MapPin className="mr-1 h-3 w-3" />
//                     {data.market}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <Calendar className="h-4 w-4 text-gray-500" />
//                   <span className="text-sm text-gray-500">{data.date}</span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-2xl font-bold text-gray-900">₹{data.currentPrice}/kg</div>
//                   <div className="text-sm text-gray-500">Previous: ₹{data.previousPrice}/kg</div>
//                 </div>

//                 <div className={`flex items-center space-x-1 ${getTrendColor(data.trend)}`}>
//                   {getTrendIcon(data.trend)}
//                   <span className="font-semibold">
//                     {data.change > 0 ? "+" : ""}
//                     {data.change}%
//                   </span>
//                 </div>
//               </div>

//               <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
//                 <h4 className="font-semibold text-blue-800 mb-1">💡 Recommendation:</h4>
//                 <p className="text-sm text-blue-700">{data.recommendation}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Voice Query */}
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <h4 className="font-semibold text-gray-700 mb-2">Quick Voice Queries:</h4>
//           <div className="text-sm text-gray-600 space-y-1">
//             <div>• "What's the price of tomatoes today?"</div>
//             <div>• "Show me onion prices in Delhi mandi"</div>
//             <div>• "Compare wheat prices across markets"</div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Minus, Search, MapPin, Calendar } from "lucide-react"
import axios from 'axios'; // Ensure axios is installed: npm install axios

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
    const apiKey = '579b464db66ec23bdd000001db776d4b44e347b25989aca343603b37'; // Replace with env variable in production
    const url = 'https://www.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'; // Replace with actual API URL

    try {
      const response = await axios.get(url, {
        headers: {
          'api-key': apiKey,
        },
      });

      // Transform API response to match MarketData interface (adjust based on actual API response structure)
      const transformedData = response.data.map((item: any) => ({
        crop: item.crop || "Unknown",
        currentPrice: item.current_price || 0,
        previousPrice: item.previous_price || 0,
        trend: item.change > 0 ? "up" : item.change < 0 ? "down" : "stable",
        change: item.change || 0,
        market: item.market || "Unknown",
        date: item.date || "Today",
        recommendation: item.recommendation || "No recommendation available",
      }));

      setMarketData(transformedData);
    } catch (error) {
      console.error('Error fetching market prices:', error);
      setMarketData([]); // Reset to empty on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(); // Initial fetch

    // Set up continuous polling
    const interval = setInterval(async () => {
      await fetchMarketData();
    }, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

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