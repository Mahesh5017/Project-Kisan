import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, ThumbsUp, MessageSquare, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CommunityPage() {
  const discussions = [
    {
      id: 1,
      title: "Best practices for organic wheat farming",
      author: "Suresh Kumar",
      location: "Punjab",
      replies: 12,
      likes: 25,
      time: "2 hours ago",
      category: "Organic Farming",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Dealing with aphid infestation in cotton crops",
      author: "Priya Patel",
      location: "Gujarat",
      replies: 8,
      likes: 18,
      time: "4 hours ago",
      category: "Pest Control",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Water-saving techniques for rice cultivation",
      author: "Ramesh Singh",
      location: "Haryana",
      replies: 15,
      likes: 32,
      time: "1 day ago",
      category: "Water Management",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "Market prices for tomatoes - when to sell?",
      author: "Meera Sharma",
      location: "Maharashtra",
      replies: 6,
      likes: 14,
      time: "2 days ago",
      category: "Market Discussion",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const categories = [
    { name: "Crop Management", count: 45, color: "bg-green-100 text-green-800" },
    { name: "Pest Control", count: 32, color: "bg-red-100 text-red-800" },
    { name: "Market Discussion", count: 28, color: "bg-blue-100 text-blue-800" },
    { name: "Organic Farming", count: 23, color: "bg-purple-100 text-purple-800" },
    { name: "Water Management", count: 19, color: "bg-cyan-100 text-cyan-800" },
    { name: "Government Schemes", count: 16, color: "bg-orange-100 text-orange-800" },
  ]

  const topContributors = [
    {
      name: "Dr. Rajesh Kumar",
      location: "Punjab",
      posts: 45,
      helpful: 128,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Priya Sharma",
      location: "Gujarat",
      posts: 38,
      helpful: 95,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Suresh Patel",
      location: "Maharashtra",
      posts: 32,
      helpful: 87,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="mr-3 h-8 w-8 text-indigo-600" />
          Farmer Community
        </h1>
        <p className="text-gray-600">
          Connect with fellow farmers, share experiences, and learn from the community's collective wisdom.
        </p>
      </div>

      {/* Search and New Discussion */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search discussions..." className="pl-10" />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Discussions */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
              <CardDescription>Latest conversations from the farming community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={discussion.avatar || "/placeholder.svg"} alt={discussion.author} />
                        <AvatarFallback>
                          {discussion.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium hover:text-indigo-600 cursor-pointer">{discussion.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {discussion.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <span>• {discussion.location}</span>
                          <span>• {discussion.time}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Browse discussions by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge className={category.color}>{category.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Most helpful community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                      <AvatarFallback>
                        {contributor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{contributor.name}</h4>
                      <p className="text-xs text-muted-foreground">{contributor.location}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{contributor.posts} posts</span>
                        <span>• {contributor.helpful} helpful</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Members</span>
                  <span className="font-bold text-indigo-600">12,450</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Discussions</span>
                  <span className="font-bold text-green-600">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Questions Answered</span>
                  <span className="font-bold text-blue-600">8,765</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Online Now</span>
                  <span className="font-bold text-orange-600">234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
