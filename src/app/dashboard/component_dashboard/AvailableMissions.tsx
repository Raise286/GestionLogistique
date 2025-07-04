"use client"

import { useState } from "react"

interface Mission {
  id: string
  lieuRamassage: string
  destination: string
  poids: string
  type: string
  coutEstime: number
  gainEstime: number
  statut: string
  urgence: number
  distance: number
}

const missionsDisponiblesMock: Mission[] = [
  {
    id: "PDL001",
    lieuRamassage: "Point de Livraison C",
    destination: "789 Rue Exemple",
    poids: "5kg",
    type: "Colis Standard",
    coutEstime: 3000,
    gainEstime: 1500,
    statut: "Disponible",
    urgence: 2,
    distance: 4.3,
  },
  {
    id: "PDL002",
    lieuRamassage: "Point de Livraison D",
    destination: "987 Avenue Centrale",
    poids: "2kg",
    type: "Documents",
    coutEstime: 2000,
    gainEstime: 1000,
    statut: "Disponible",
    urgence: 1,
    distance: 2.1,
  },
  {
    id: "PDL003",
    lieuRamassage: "Marché Nkololoun",
    destination: "Maison du client, Akwa",
    poids: "10kg",
    type: "Électronique",
    coutEstime: 5000,
    gainEstime: 2500,
    statut: "Délaissée",
    urgence: 0,
    distance: 6.5,
  },
]

export default function AvailableMissions() {
  const [tri, setTri] = useState<"gain" | "urgence" | "distance">("gain")
  const [missions, setMissions] = useState<Mission[]>(missionsDisponiblesMock)

  const trierMissions = (criterium: "gain" | "urgence" | "distance") => {
    setTri(criterium)
    const trié = [...missions].sort((a, b) => {
      if (criterium === "gain") return b.gainEstime - a.gainEstime
      if (criterium === "urgence") return a.urgence - b.urgence
      if (criterium === "distance") return a.distance - b.distance
      return 0
    })
    setMissions(trié)
  }

  const accepterMission = (idMission: string) => {
    alert(`✅ Mission ${idMission} acceptée !`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚛</span>
          <h1 className="text-3xl font-bold text-gray-900">Missions Disponibles</h1>
        </div>
        <p className="text-gray-600">Découvrez les missions de livraison disponibles et maximisez vos gains</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔍</span>
          <h2 className="text-lg font-semibold text-gray-900">Filtres et Tri</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">Trier par :</span>
          <select
            value={tri}
            onChange={(e) => trierMissions(e.target.value as "gain" | "urgence" | "distance")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="gain">💰 Gain estimé</option>
            <option value="urgence">⏰ Urgence</option>
            <option value="distance">📍 Distance</option>
          </select>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    📦 Mission #{mission.id}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      mission.statut === "Disponible" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {mission.statut === "Disponible" ? "✅" : "⚠️"} {mission.statut}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    mission.urgence === 0
                      ? "bg-red-100 text-red-800"
                      : mission.urgence <= 1
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  ⏰ {mission.urgence}h
                </span>
              </div>

              {/* Route Information */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">📍</span>
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Ramassage</p>
                    <p className="text-sm text-gray-600">{mission.lieuRamassage}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-red-600 mt-0.5">🎯</span>
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Destination</p>
                    <p className="text-sm text-gray-600">{mission.destination}</p>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Package Details */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Type</p>
                  <p className="text-gray-600">{mission.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">Poids</p>
                  <p className="text-gray-600">{mission.poids}</p>
                </div>
              </div>

              <hr className="my-4" />

              {/* Financial Information */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Coût estimé</span>
                  <span className="text-sm font-mono text-gray-700">{mission.coutEstime.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">Gain estimé</span>
                  <span className="text-sm font-mono font-semibold text-green-700">
                    {mission.gainEstime.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Distance</span>
                  <span className="text-sm font-mono text-gray-700">{mission.distance} km</span>
                </div>
              </div>

              {/* Action Button */}
              {mission.statut === "Disponible" && (
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                  onClick={() => accepterMission(mission.id)}
                >
                  ✅ Accepter la mission
                </button>
              )}

              {mission.statut === "Délaissée" && (
                <button
                  className="w-full border border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                  onClick={() => accepterMission(mission.id)}
                >
                  ⚠️ Récupérer la mission
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
