"use client"

import { useState } from "react"

interface Stats {
  tauxReussite: number
  tempsMoyen: number // en minutes
  noteMoyenne: number
  nombreRatings: number
  missionsCompletes: number
  gainsTotal: number
  gainsThisMois: number
  distanceTotale: number
  tempsTotal: number // en heures
  meilleureNote: number
  streakActuel: number
  classement: number
}

interface TrendData {
  period: string
  missions: number
  gains: number
  rating: number
}

const statsMock: Stats = {
  tauxReussite: 95,
  tempsMoyen: 34,
  noteMoyenne: 4.8,
  nombreRatings: 50,
  missionsCompletes: 45,
  gainsTotal: 125000,
  gainsThisMois: 45000,
  distanceTotale: 1250,
  tempsTotal: 89,
  meilleureNote: 5.0,
  streakActuel: 12,
  classement: 8,
}

const trendDataMock: TrendData[] = [
  { period: "Jan", missions: 8, gains: 25000, rating: 4.6 },
  { period: "Fév", missions: 12, gains: 35000, rating: 4.7 },
  { period: "Mar", missions: 15, gains: 42000, rating: 4.8 },
  { period: "Avr", missions: 10, gains: 23000, rating: 4.9 },
]

export default function PerformanceMetrics() {
  const [stats, setStats] = useState<Stats>(statsMock)
  const [selectedPeriod, setSelectedPeriod] = useState<"semaine" | "mois" | "trimestre">("mois")
  const [trendData, setTrendData] = useState<TrendData[]>(trendDataMock)

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 95)
      return { label: "Excellent", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
    if (rate >= 85) return { label: "Très bien", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" }
    if (rate >= 75) return { label: "Bien", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" }
    return { label: "À améliorer", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  }

  const getTimeComparison = (actual: number, standard: number) => {
    const diff = ((actual - standard) / standard) * 100
    if (diff <= -10) return { status: "Excellent", color: "text-green-600", icon: "🚀" }
    if (diff <= 0) return { status: "Bon", color: "text-blue-600", icon: "✅" }
    if (diff <= 15) return { status: "Moyen", color: "text-yellow-600", icon: "⚠️" }
    return { status: "Lent", color: "text-red-600", icon: "🐌" }
  }

  const performanceLevel = getPerformanceLevel(stats.tauxReussite)
  const timeComparison = getTimeComparison(stats.tempsMoyen, 40)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📊</span>
          <h1 className="text-3xl font-bold text-gray-900">Indicateurs de Performance</h1>
        </div>
        <p className="text-gray-600">Suivez vos performances et améliorez votre service de livraison</p>
      </div>

      {/* Period Filter */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Période d'analyse :</span>
          <div className="flex gap-2">
            {(["semaine", "mois", "trimestre"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className={`rounded-lg border p-6 ${performanceLevel.bg} ${performanceLevel.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Niveau de Performance Global</h3>
            <p className={`text-2xl font-bold ${performanceLevel.color}`}>{performanceLevel.label}</p>
            <p className="text-sm text-gray-600">Basé sur vos {stats.missionsCompletes} missions complétées</p>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-2">
              {stats.tauxReussite >= 95 ? "🏆" : stats.tauxReussite >= 85 ? "🥈" : "📈"}
            </div>
            <p className="text-sm text-gray-600">Classement #{stats.classement}</p>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Taux de réussite */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${performanceLevel.bg} ${performanceLevel.color}`}
            >
              {performanceLevel.label}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
            <p className="text-3xl font-bold text-green-600">{stats.tauxReussite}%</p>
            <p className="text-xs text-gray-500">Missions livrées à temps</p>
          </div>
        </div>

        {/* Temps moyen */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">⏱️</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${timeComparison.color}`}>
              {timeComparison.icon} {timeComparison.status}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Temps moyen de livraison</p>
            <p className="text-3xl font-bold text-blue-600">{stats.tempsMoyen} min</p>
            <p className="text-xs text-gray-500">Standard: 40 min</p>
          </div>
        </div>

        {/* Note moyenne */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${star <= Math.floor(stats.noteMoyenne) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Note des destinataires</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.noteMoyenne}/5</p>
            <p className="text-xs text-gray-500">{stats.nombreRatings} évaluations</p>
          </div>
        </div>

        {/* Missions complétées */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-600">
              +{stats.streakActuel} série
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Missions complétées</p>
            <p className="text-3xl font-bold text-purple-600">{stats.missionsCompletes}</p>
            <p className="text-xs text-gray-500">Total depuis inscription</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Gains totaux</p>
              <p className="text-xl font-bold text-green-600">{stats.gainsTotal.toLocaleString()} FCFA</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Ce mois: {stats.gainsThisMois.toLocaleString()} FCFA</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🛣️</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Distance parcourue</p>
              <p className="text-xl font-bold text-blue-600">{stats.distanceTotale} km</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Temps total: {stats.tempsTotal}h</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏅</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Meilleure note</p>
              <p className="text-xl font-bold text-yellow-600">{stats.meilleureNote}/5</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Note parfaite obtenue</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm font-medium text-gray-600">Série actuelle</p>
              <p className="text-xl font-bold text-orange-600">{stats.streakActuel}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Missions réussies consécutives</p>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          💡 Conseils pour améliorer vos performances
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-xl">🚀</span>
            <div>
              <p className="text-sm font-medium text-blue-900">Optimisez vos trajets</p>
              <p className="text-xs text-blue-700">
                Planifiez vos itinéraires pour réduire le temps de livraison de {stats.tempsMoyen} à 30 minutes
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">⭐</span>
            <div>
              <p className="text-sm font-medium text-green-900">Améliorez votre service client</p>
              <p className="text-xs text-green-700">
                Visez une note de 4.9/5 en communiquant proactivement avec les destinataires
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">🏆 Réalisations</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <span className="text-2xl">🥇</span>
            <div>
              <p className="text-sm font-medium text-yellow-900">Top Performer</p>
              <p className="text-xs text-yellow-700">95%+ de réussite</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-medium text-blue-900">Livraison Rapide</p>
              <p className="text-xs text-blue-700">Sous la moyenne</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="text-2xl">💎</span>
            <div>
              <p className="text-sm font-medium text-green-900">Service Premium</p>
              <p className="text-xs text-green-700">Note 4.8+</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-sm font-medium text-purple-900">Série de 12</p>
              <p className="text-xs text-purple-700">Missions consécutives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
