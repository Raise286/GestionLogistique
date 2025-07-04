"use client"

import { useEffect, useState } from "react"

interface Mission {
  id: string
  date: string
  lieuRamassage: string
  lieuDepot: string
  statut: string
  gain: number
  couts: Array<{ type: string; montant: number }>
}

interface Resume {
  total: number
  gains: number
  couts: number
}

const missionsLivréesMock: Mission[] = [
  {
    id: "PKG12345",
    date: "2025-07-01",
    lieuRamassage: "Point de Livraison A",
    lieuDepot: "Point de Livraison B",
    statut: "Livré au point de livraison",
    gain: 7500,
    couts: [{ type: "Carburant", montant: 1500 }],
  },
  {
    id: "PKG12346",
    date: "2025-07-02",
    lieuRamassage: "Marché Central",
    lieuDepot: "Client - 456 Avenue Nord",
    statut: "Livré au destinataire",
    gain: 10000,
    couts: [
      { type: "Carburant", montant: 1800 },
      { type: "Frais plateforme", montant: 500 },
    ],
  },
  {
    id: "PKG12344",
    date: "2025-06-30",
    lieuRamassage: "Agence Express",
    lieuDepot: "Boulangerie du coin",
    statut: "Livré au point de livraison",
    gain: 5000,
    couts: [],
  },
]

export default function MissionHistory() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [periode, setPeriode] = useState("mois")
  const [statutFiltre, setStatutFiltre] = useState("tous")
  const [resume, setResume] = useState<Resume>({ total: 0, gains: 0, couts: 0 })

  useEffect(() => {
    let filteredMissions = missionsLivréesMock
    if (statutFiltre !== "tous") {
      filteredMissions = filteredMissions.filter((m) => m.statut.toLowerCase().includes(statutFiltre.toLowerCase()))
    }
    setMissions(filteredMissions)

    const total = filteredMissions.length
    const gains = filteredMissions.reduce((acc, m) => acc + m.gain, 0)
    const couts = filteredMissions.reduce((acc, m) => acc + m.couts.reduce((cAcc, c) => cAcc + c.montant, 0), 0)
    setResume({ total, gains, couts })
  }, [periode, statutFiltre])

  const getStatusBadge = (statut: string) => {
    if (statut.includes("destinataire")) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✅ Destinataire
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        🎯 Point de livraison
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const beneficeNet = resume.gains - resume.couts

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📋</span>
          <h1 className="text-3xl font-bold text-gray-900">Historique des Missions</h1>
        </div>
        <p className="text-gray-600">Consultez vos performances et revenus passés</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Missions Complétées</h3>
            <span className="text-xl">📦</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{resume.total}</div>
          <p className="text-xs text-gray-500">{periode === "mois" ? "Ce mois" : "Cette semaine"}</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Gains Totaux</h3>
            <span className="text-xl">📈</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{resume.gains.toLocaleString()} FCFA</div>
          <p className="text-xs text-gray-500">Revenus bruts</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Dépenses</h3>
            <span className="text-xl">📉</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{resume.couts.toLocaleString()} FCFA</div>
          <p className="text-xs text-gray-500">Coûts totaux</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Bénéfice Net</h3>
            <span className="text-xl">💰</span>
          </div>
          <div className={`text-2xl font-bold ${beneficeNet >= 0 ? "text-blue-600" : "text-red-600"}`}>
            {beneficeNet.toLocaleString()} FCFA
          </div>
          <p className="text-xs text-gray-500">Profit réel</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🔍</span>
          <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Période</label>
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="mois">📅 Ce mois</option>
              <option value="semaine">📅 Cette semaine</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Statut</label>
            <select
              value={statutFiltre}
              onChange={(e) => setStatutFiltre(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="point de livraison">Point de livraison</option>
              <option value="destinataire">Destinataire</option>
            </select>
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Détail des Missions</h2>
        </div>
        <div>
          {missions.map((mission, index) => (
            <div key={mission.id}>
              <div className="p-6 space-y-4">
                {/* Mission Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📦</span>
                      <span className="font-semibold text-gray-900">Mission #{mission.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>📅</span>
                      {formatDate(mission.date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(mission.statut)}</div>
                </div>

                {/* Route Information */}
                <div className="grid gap-4 sm:grid-cols-2">
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
                      <p className="text-sm font-medium text-gray-900">Livraison</p>
                      <p className="text-sm text-gray-600">{mission.lieuDepot}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-green-700">Gain</p>
                    <p className="text-lg font-semibold text-green-700">{mission.gain.toLocaleString()} FCFA</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-red-700">Coûts</p>
                    {mission.couts.length > 0 ? (
                      <div className="space-y-1">
                        {mission.couts.map((cout, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-red-600">🧾</span>
                            <span className="text-gray-600">{cout.type}:</span>
                            <span className="font-medium text-red-600">{cout.montant.toLocaleString()} FCFA</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Aucun coût</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-700">Bénéfice</p>
                    <p className="text-lg font-semibold text-blue-700">
                      {(mission.gain - mission.couts.reduce((acc, c) => acc + c.montant, 0)).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              </div>
              {index < missions.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights de Performance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Gain moyen par mission</p>
            <p className="text-2xl font-bold text-blue-600">
              {resume.total > 0 ? Math.round(resume.gains / resume.total).toLocaleString() : 0} FCFA
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Coût moyen par mission</p>
            <p className="text-2xl font-bold text-orange-600">
              {resume.total > 0 ? Math.round(resume.couts / resume.total).toLocaleString() : 0} FCFA
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Marge bénéficiaire</p>
            <p className="text-2xl font-bold text-green-600">
              {resume.gains > 0 ? Math.round(((resume.gains - resume.couts) / resume.gains) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
