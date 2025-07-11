import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, Clock, ExternalLink, TrendingUp, AlertTriangle, Info } from "lucide-react"

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "New Government Subsidy Announced for Organic Farming",
      summary:
        "The government has announced a new subsidy scheme worth ₹10,000 crores to promote organic farming practices across the country.",
      category: "Government Policy",
      type: "policy",
      time: "2 hours ago",
      source: "Agriculture Ministry",
      readTime: "3 min read",
    },
    {
      id: 2,
      title: "Weather Alert: Heavy Rainfall Expected in Northern States",
      summary:
        "Meteorological department issues warning for heavy rainfall in Punjab, Haryana, and UP. Farmers advised to take precautionary measures.",
      category: "Weather Alert",
      type: "alert",
      time: "4 hours ago",
      source: "IMD Weather",
      readTime: "2 min read",
    },
    {
      id: 3,
      title: "Wheat Prices Surge 15% Due to Export Demand",
      summary:
        "International demand for Indian wheat has led to a significant price increase, benefiting farmers across wheat-growing regions.",
      category: "Market News",
      type: "market",
      time: "6 hours ago",
      source: "Market Watch",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Revolutionary Drone Technology for Precision Agriculture",
      summary:
        "New AI-powered drones can detect crop diseases early and optimize pesticide application, reducing costs by up to 30%.",
      category: "Technology",
      type: "tech",
      time: "1 day ago",
      source: "AgriTech Today",
      readTime: "5 min read",
    },
    {
      id: 5,
      title: "Sustainable Farming Practices Show 25% Yield Increase",
      summary:
        "Recent study reveals that sustainable farming methods not only protect the environment but also increase crop yields significantly.",
      category: "Research",
      type: "research",
      time: "2 days ago",
      source: "Agricultural Research",
      readTime: "6 min read",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "policy":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Newspaper className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-800"
      case "market":
        return "bg-green-100 text-green-800"
      case "policy":
        return "bg-blue-100 text-blue-800"
      case "tech":
        return "bg-purple-100 text-purple-800"
      case "research":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const categories = [
    { name: "All News", count: 156, active: true },
    { name: "Weather Alerts", count: 23, active: false },
    { name: "Market Updates", count: 45, active: false },
    { name: "Government Policy", count: 32, active: false },
    { name: "Technology", count: 28, active: false },
    { name: "Research", count: 28, active: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Newspaper className="mr-3 h-8 w-8 text-gray-600" />
          Agricultural News
        </h1>
        <p className="text-gray-600">
          Stay updated with the latest news, weather alerts, market trends, and agricultural developments.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main News Feed */}
        <div className="lg:col-span-3 space-y-4">
          {newsArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(article.type)}
                      <Badge className={getTypeColor(article.type)}>{article.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{article.time}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">{article.title}</h2>
                    <p className="text-muted-foreground">{article.summary}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Source: {article.source}</span>
                      <span>• {article.readTime}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Filter news by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      category.active ? "bg-blue-100 text-blue-800" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Weather Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800">Heavy Rainfall Warning</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Expected in your area for the next 48 hours. Take necessary precautions for your crops.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Temperature: 28°C - 32°C</p>
                  <p>Humidity: 85%</p>
                  <p>Wind: 15 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                Market Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wheat</span>
                  <span className="text-sm font-medium text-green-600">₹35/kg (+8%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rice</span>
                  <span className="text-sm font-medium text-green-600">₹42/kg (+5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cotton</span>
                  <span className="text-sm font-medium text-red-600">₹85/kg (-3%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tomato</span>
                  <span className="text-sm font-medium text-green-600">₹28/kg (+15%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle>Stay Updated</CardTitle>
              <CardDescription>Get daily agricultural news digest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Subscribe to receive personalized news updates based on your farming interests.
                </p>
                <Button className="w-full bg-gray-600 hover:bg-gray-700">Subscribe to Newsletter</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
