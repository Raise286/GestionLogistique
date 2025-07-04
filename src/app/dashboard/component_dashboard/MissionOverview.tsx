"use client"

import { useEffect, useState } from "react"

interface Mission {
  parcelId: string
  missionStatus: "Assigned" | "Picked Up" | "In Transit" | "Delivered"
  pickupLocation: string
  pickupDeadline: Date
  destination: string
  recipientName: string
  recipientPhone: string
  parcelType: string
  weight: string
  dimensions: string
  quantity: number
  deliveryInstruction: string
  dropType: "Recipient" | "Point de Livraison"
}

const mockMission: Mission = {
  parcelId: "PKG12345",
  missionStatus: "Assigned",
  pickupLocation: "Point de Livraison A, 123 Rue Exemple",
  pickupDeadline: new Date(Date.now() + 1000 * 60 * 90), // 1.5 hours from now
  destination: "John Doe, 456 Avenue Exemple",
  recipientName: "John Doe",
  recipientPhone: "+237 699 12 34 56",
  parcelType: "Documents",
  weight: "2kg",
  dimensions: "30x20x10 cm",
  quantity: 1,
  deliveryInstruction: "Fragile – Handle with care. Requires recipient's CNI.",
  dropType: "Recipient",
}

export default function MissionOverview() {
  const [timeLeft, setTimeLeft] = useState("")
  const [timerExpired, setTimerExpired] = useState(false)

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(mockMission.pickupDeadline).getTime() - now

      if (distance < 0) {
        setTimerExpired(true)
        setTimeLeft("Pickup deadline missed. Mission available to other delivery persons.")
        clearInterval(countdown)
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}h ${minutes}m left to pick up`)
      }
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const handlePickup = () => {
    alert("Pickup confirmed!")
  }

  const handleDropoff = () => {
    alert("Drop-off confirmed!")
  }

  const getStatusColor = (status: Mission["missionStatus"]) => {
    switch (status) {
      case "Assigned":
        return "bg-blue-100 text-blue-800"
      case "Picked Up":
        return "bg-yellow-100 text-yellow-800"
      case "In Transit":
        return "bg-orange-100 text-orange-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Mission["missionStatus"]) => {
    switch (status) {
      case "Assigned":
        return "📋"
      case "Picked Up":
        return "📦"
      case "In Transit":
        return "🚚"
      case "Delivered":
        return "✅"
      default:
        return "📋"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚚</span>
          <h1 className="text-3xl font-bold text-gray-900">Mission Actuelle</h1>
        </div>
        <p className="text-gray-600">Détails de votre mission en cours</p>
      </div>

      {/* Mission Card */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">📦</span>
                <h2 className="text-xl font-bold text-gray-900">Colis #{mockMission.parcelId}</h2>
              </div>
              <p className="text-sm text-gray-600">Mission assignée</p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                mockMission.missionStatus,
              )}`}
            >
              {getStatusIcon(mockMission.missionStatus)} {mockMission.missionStatus}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Timer Alert */}
          <div
            className={`p-4 rounded-lg border ${
              timerExpired ? "bg-red-50 border-red-200 text-red-800" : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{timerExpired ? "⚠️" : "⏰"}</span>
              <div>
                <p className="font-medium">
                  {timerExpired ? "Délai de ramassage dépassé" : "Temps restant pour le ramassage"}
                </p>
                <p className="text-sm">{timeLeft}</p>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📍 Informations de livraison
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">🟢</span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Point de ramassage</p>
                    <p className="text-sm text-gray-600">{mockMission.pickupLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-red-600 mt-1">🔴</span>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Destination</p>
                    <p className="text-sm text-gray-600">{mockMission.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">👤 Destinataire</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">👤</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nom</p>
                    <p className="text-sm text-gray-600">{mockMission.recipientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600">📞</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Téléphone</p>
                    <p className="text-sm text-gray-600">{mockMission.recipientPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Parcel Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">📦 Détails du colis</h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type</p>
                <p className="text-sm font-semibold text-gray-900">{mockMission.parcelType}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Poids</p>
                <p className="text-sm font-semibold text-gray-900">{mockMission.weight}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</p>
                <p className="text-sm font-semibold text-gray-900">{mockMission.dimensions}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</p>
                <p className="text-sm font-semibold text-gray-900">{mockMission.quantity}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              📋 Instructions de livraison
            </h3>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-yellow-800">Type de livraison:</span>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      mockMission.dropType === "Recipient" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {mockMission.dropType === "Recipient" ? "👤 Destinataire" : "📍 Point de livraison"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Instructions spéciales:</p>
                  <p className="text-sm text-yellow-700">{mockMission.deliveryInstruction}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handlePickup}
              disabled={timerExpired}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                timerExpired
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              📦 Confirmer le ramassage
            </button>
            <button
              onClick={handleDropoff}
              disabled={mockMission.missionStatus === "Assigned"}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                mockMission.missionStatus === "Assigned"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              ✅ Confirmer la livraison
            </button>
          </div>

          {mockMission.missionStatus === "Assigned" && (
            <p className="text-xs text-gray-500 text-center">
              Vous devez d'abord confirmer le ramassage avant de pouvoir livrer le colis.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
