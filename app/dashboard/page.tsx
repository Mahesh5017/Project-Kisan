import { DashboardHeader } from "@/components/dashboard-header"
import { VoiceAssistant } from "@/components/voice-assistant"
import { CropDiagnosis } from "@/components/crop-diagnosis"
import { MarketAnalysis } from "@/components/market-analysis"
import { GovernmentSchemes } from "@/components/government-schemes"
import { QuickActions } from "@/components/quick-actions"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Voice Assistant - Always visible */}
        <div className="mb-8">
          <VoiceAssistant />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <CropDiagnosis />
          <MarketAnalysis />
        </div>

        {/* Government Schemes - Full width */}
        <div className="mt-8">
          <GovernmentSchemes />
        </div>
      </main>
    </div>
  )
}
