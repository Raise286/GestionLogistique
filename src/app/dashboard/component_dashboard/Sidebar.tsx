"use client"

import { useState } from "react"
import type { SectionKey } from "../types"

interface SidebarOption {
  key: SectionKey
  label: string
  badge?: number
}

interface SidebarProps {
  selected: SectionKey
  onSelect: (section: SectionKey) => void
}

const sidebarOptions: SidebarOption[] = [
  { key: "mission", label: "📦 Mission actuelle" },
  { key: "available", label: "🔍 Offres disponibles", badge: 12 },
  { key: "history", label: "📋 Historique" },
  { key: "notifications", label: "🔔 Notifications", badge: 3 },
  { key: "profile", label: "👤 Profil" },
  { key: "metrics", label: "📊 Performance" },
]

export default function SimpleSidebar({ selected, onSelect }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleSelect = (section: SectionKey) => {
    onSelect(section)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md border"
        onClick={toggleMobile}
      >
        {isMobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 shadow-lg w-64
          transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">🚛</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">DeliveryPro</h2>
                <p className="text-xs text-gray-500">Tableau de bord</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</p>
              </div>

              {sidebarOptions.map((option) => {
                const isActive = selected === option.key

                return (
                  <button
                    key={option.key}
                    className={`
                      w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center justify-between
                      ${isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                    `}
                    onClick={() => handleSelect(option.key)}
                  >
                    <span>{option.label}</span>
                    {option.badge && (
                      <span
                        className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${isActive ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"}
                        `}
                      >
                        {option.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-6 px-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Aperçu rapide</p>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">✅ Missions complétées</span>
                    <span className="text-lg font-bold text-green-800">24</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">💰 Gains ce mois</span>
                    <span className="text-lg font-bold text-blue-800">125k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              ⚙️ Paramètres
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50">
              🚪 Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
