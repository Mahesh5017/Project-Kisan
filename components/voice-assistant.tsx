"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if speech recognition is supported
    setIsSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  }, [])

  const startListening = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US" // Can be changed to support local languages

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript("")
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setTranscript(transcript)
      processVoiceCommand(transcript)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.start()
  }

  const processVoiceCommand = async (command: string) => {
    // Simulate AI processing
    setResponse("Processing your request...")

    // Mock AI response based on command
    setTimeout(() => {
      let aiResponse = ""

      if (command.toLowerCase().includes("price") || command.toLowerCase().includes("market")) {
        aiResponse =
          "Current tomato prices in your area are ₹25-30 per kg. Prices have increased by 15% this week due to reduced supply. Consider selling today for better profits."
      } else if (command.toLowerCase().includes("disease") || command.toLowerCase().includes("crop")) {
        aiResponse =
          "Please take a photo of the affected plant using the crop diagnosis feature. I'll analyze it and provide treatment recommendations."
      } else if (command.toLowerCase().includes("scheme") || command.toLowerCase().includes("subsidy")) {
        aiResponse =
          "I found 3 relevant government schemes for you: PM-KISAN Direct Benefit Transfer, Soil Health Card Scheme, and Pradhan Mantri Fasal Bima Yojana. Would you like details about any specific scheme?"
      } else {
        aiResponse =
          "I'm here to help with crop diseases, market prices, and government schemes. You can ask me questions like 'What's the price of wheat today?' or 'Show me subsidy schemes for irrigation'."
      }

      setResponse(aiResponse)
      speakResponse(aiResponse)
    }, 2000)
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Mic className="h-6 w-6 text-green-600" />
          <span>Voice Assistant</span>
        </CardTitle>
        <CardDescription>Speak in your native language - I'm here to help with all your farming needs</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Control Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={startListening}
            disabled={isListening || !isSupported}
            size="lg"
            className={`${isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} transition-all duration-300`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-5 w-5 animate-pulse" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start Speaking
              </>
            )}
          </Button>

          {isSpeaking && (
            <Button onClick={stopSpeaking} variant="outline" size="lg">
              <VolumeX className="mr-2 h-4 w-4" />
              Stop Audio
            </Button>
          )}
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center space-x-2">
          {isListening && <Badge className="bg-red-100 text-red-800 animate-pulse">🎤 Listening</Badge>}
          {isSpeaking && <Badge className="bg-blue-100 text-blue-800 animate-pulse">🔊 Speaking</Badge>}
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">You said:</h4>
            <p className="text-gray-600 italic">"{transcript}"</p>
          </div>
        )}

        {/* AI Response */}
        {response && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <Volume2 className="mr-2 h-4 w-4" />
              Kisan Assistant:
            </h4>
            <p className="text-green-700">{response}</p>
          </div>
        )}

        {/* Quick Voice Commands */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-3">Try saying:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>• "What's the price of tomatoes today?"</div>
            <div>• "Show me crop disease diagnosis"</div>
            <div>• "Find subsidy schemes for irrigation"</div>
            <div>• "Help me with government schemes"</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
