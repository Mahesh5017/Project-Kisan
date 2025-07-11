import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Video, MessageCircle, Calendar, Star, Clock } from "lucide-react"

export default function ConsultationPage() {
  const experts = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Crop Disease Specialist",
      rating: 4.8,
      experience: "15 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: true,
      price: "₹500/hour",
    },
    {
      id: 2,
      name: "Prof. Rajesh Gupta",
      specialization: "Soil & Nutrition Expert",
      rating: 4.9,
      experience: "20 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: false,
      price: "₹600/hour",
    },
    {
      id: 3,
      name: "Dr. Meera Patel",
      specialization: "Organic Farming Consultant",
      rating: 4.7,
      experience: "12 years",
      avatar: "/placeholder.svg?height=60&width=60",
      available: true,
      price: "₹450/hour",
    },
  ]

  const upcomingConsultations = [
    {
      id: 1,
      expert: "Dr. Priya Sharma",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Video Call",
      topic: "Tomato Disease Treatment",
    },
    {
      id: 2,
      expert: "Prof. Rajesh Gupta",
      date: "March 15",
      time: "10:00 AM",
      type: "Phone Call",
      topic: "Soil Testing Results",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Phone className="mr-3 h-8 w-8 text-orange-600" />
          Expert Consultation
        </h1>
        <p className="text-gray-600">
          Connect with agricultural experts for personalized advice and solutions to your farming challenges.
        </p>
      </div>

      {/* Upcoming Consultations */}
      {upcomingConsultations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Consultations</CardTitle>
            <CardDescription>Your scheduled expert sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{consultation.topic}</h4>
                    <p className="text-sm text-muted-foreground">with {consultation.expert}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {consultation.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {consultation.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{consultation.type}</Badge>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Experts */}
      <Card>
        <CardHeader>
          <CardTitle>Available Experts</CardTitle>
          <CardDescription>Choose from our network of certified agricultural specialists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <div key={expert.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={expert.avatar || "/placeholder.svg"} alt={expert.name} />
                    <AvatarFallback>
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1">{expert.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">• {expert.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{expert.price}</p>
                    <Badge variant={expert.available ? "default" : "secondary"} className="text-xs">
                      {expert.available ? "Available Now" : "Busy"}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled={!expert.available}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent" disabled={!expert.available}>
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consultation Types */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-green-600" />
              Phone Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Quick voice consultation for immediate farming queries and advice.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Instant expert advice</li>
              <li>• Cost-effective solution</li>
              <li>• Available 24/7</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2 h-5 w-5 text-blue-600" />
              Video Consultation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Face-to-face consultation with visual crop examination and detailed guidance.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Visual crop assessment</li>
              <li>• Detailed explanations</li>
              <li>• Screen sharing support</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-purple-600" />
              Chat Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Text-based consultation with image sharing and document exchange.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Share photos & documents</li>
              <li>• Written recommendations</li>
              <li>• Flexible timing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
