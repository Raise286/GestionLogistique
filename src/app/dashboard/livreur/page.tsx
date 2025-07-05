"use client"

import { useState } from "react"
import Sidebar from "../component_dashboard/Sidebar"
import AvailableMissions from "../component_dashboard/AvailableMissions"
import MissionHistory from "../component_dashboard/MissionHistory"
import MissionOverview from "../component_dashboard/MissionOverview"
import NotificationsCenter from "../component_dashboard/NotificationCenter"
import PerformanceMetrics from "../component_dashboard/PerformanceMetrics"
import ProfilVerification from "../component_dashboard/ProfileCard"
import type { SectionKey } from "../types"

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState<SectionKey>("profile")

  const renderContent = () => {
    switch (selectedSection) {
      case "mission":
        return <MissionOverview />
      case "available":
        return <AvailableMissions />
      case "history":
        return <MissionHistory />
      case "notifications":
        return <NotificationsCenter />
      case "metrics":
        return <PerformanceMetrics />
      case "profile":
        return <ProfilVerification />
      default:
        return (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🚧</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Section en développement</h2>
            <p className="text-gray-600">Cette section sera bientôt disponible.</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selected={selectedSection} onSelect={setSelectedSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}
