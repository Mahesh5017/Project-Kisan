import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Search, Phone, Mail, MessageCircle, Book, Video, FileText } from "lucide-react"

export default function HelpPage() {
  const faqItems = [
    {
      question: "How do I use the crop diagnosis feature?",
      answer:
        "Simply take a clear photo of the affected plant part and upload it through the Crop Diagnosis page. Our AI will analyze the image and provide treatment recommendations.",
      category: "Features",
    },
    {
      question: "Are the market prices real-time?",
      answer:
        "Yes, our market prices are updated multiple times daily from various mandi and wholesale markets across India.",
      category: "Market Data",
    },
    {
      question: "How can I apply for government schemes?",
      answer:
        "Browse available schemes in the Government Schemes section, check eligibility criteria, and click on the application links to apply directly through official portals.",
      category: "Government Schemes",
    },
    {
      question: "Is the voice assistant available in regional languages?",
      answer:
        "Currently, the voice assistant supports Hindi and English. We're working on adding more regional languages soon.",
      category: "Voice Assistant",
    },
    {
      question: "How accurate is the crop disease diagnosis?",
      answer:
        "Our AI model has an accuracy rate of 95% for common crop diseases. However, we recommend consulting with experts for complex cases.",
      category: "AI Diagnosis",
    },
  ]

  const helpResources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using Project Kisan",
      icon: Book,
      type: "Guide",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video instructions",
      icon: Video,
      type: "Video",
    },
    {
      title: "Feature Documentation",
      description: "Detailed documentation for all features",
      icon: FileText,
      type: "Docs",
    },
    {
      title: "Best Practices",
      description: "Tips for getting the most out of the platform",
      icon: HelpCircle,
      type: "Tips",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <HelpCircle className="mr-3 h-8 w-8 text-blue-600" />
          Help & Support
        </h1>
        <p className="text-gray-600">
          Find answers to common questions, access resources, and get support for using Project Kisan.
        </p>
      </div>

      {/* Search Help */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search for help topics..." className="pl-10 text-lg h-12" />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Can't find what you're looking for? Get in touch with us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="your.email@example.com" type="email" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Describe your issue in detail..." rows={4} />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle>Get Help</CardTitle>
              <CardDescription>Multiple ways to reach us</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Phone Support</p>
                    <p className="text-xs text-muted-foreground">+91 1800-XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@projectkisan.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Available 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Help Resources</CardTitle>
              <CardDescription>Learn more about Project Kisan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {helpResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <resource.icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Diagnosis Service</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Data API</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voice Assistant</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Government Schemes DB</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
