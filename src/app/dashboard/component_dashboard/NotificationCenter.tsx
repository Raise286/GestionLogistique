"use client"

import { useEffect, useState } from "react"

interface Notification {
  id: number
  type: "mission" | "alert" | "payment"
  message: string
  timestamp: string
  urgency?: "high" | "critical"
  read?: boolean
}

const notificationsMock: Notification[] = [
  {
    id: 1,
    type: "mission",
    message: "📦 Nouvelle mission disponible : 2km, 4000 FCFA",
    timestamp: "il y a 2 minutes",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    message: "⏰ Ramassage pour la mission #PKG12345 dans 10 minutes !",
    timestamp: "il y a 5 minutes",
    urgency: "high",
    read: false,
  },
  {
    id: 3,
    type: "payment",
    message: "💰 Paiement reçu : le destinataire a payé 1500 FCFA.",
    timestamp: "il y a 1 heure",
    read: true,
  },
  {
    id: 4,
    type: "alert",
    message: "⛔ Délai dépassé pour la mission #PKG67890 — mission disponible pour d'autres livreurs.",
    timestamp: "il y a 3 heures",
    urgency: "critical",
    read: true,
  },
  {
    id: 5,
    type: "mission",
    message: "🔗 Mission #PKG12400 confirmée comme livrée à Point de Livraison B.",
    timestamp: "il y a 1 jour",
    read: true,
  },
]

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filtrerPar, setFiltrerPar] = useState<"toutes" | "mission" | "alert" | "payment">("toutes")

  useEffect(() => {
    let filtered = notificationsMock
    if (filtrerPar !== "toutes") {
      filtered = notificationsMock.filter((n) => n.type === filtrerPar)
    }
    setNotifications(filtered)
  }, [filtrerPar])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationStyle = (notification: Notification) => {
    const baseStyle = "p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer"
    const readStyle = notification.read ? "opacity-75" : "shadow-sm"

    if (notification.type === "alert") {
      if (notification.urgency === "critical") {
        return `${baseStyle} ${readStyle} bg-red-50 border-red-200 hover:bg-red-100`
      }
      return `${baseStyle} ${readStyle} bg-yellow-50 border-yellow-200 hover:bg-yellow-100`
    }

    if (notification.type === "payment") {
      return `${baseStyle} ${readStyle} bg-green-50 border-green-200 hover:bg-green-100`
    }

    return `${baseStyle} ${readStyle} bg-blue-50 border-blue-200 hover:bg-blue-100`
  }

  const getNotificationIcon = (notification: Notification) => {
    if (notification.type === "alert") {
      return notification.urgency === "critical" ? "🚨" : "⚠️"
    }
    if (notification.type === "payment") {
      return "💰"
    }
    return "📦"
  }

  const getTypeLabel = (type: Notification["type"]) => {
    switch (type) {
      case "mission":
        return "Mission"
      case "alert":
        return "Alerte"
      case "payment":
        return "Paiement"
      default:
        return type
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🔔</span>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                {unreadCount} nouveau{unreadCount > 1 ? "x" : ""}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Tout marquer comme lu
            </button>
          )}
        </div>
        <p className="text-gray-600">Restez informé de vos missions et alertes importantes</p>
      </div>

      {/* Filters and Stats */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filtrer par :</span>
            <select
              value={filtrerPar}
              onChange={(e) => setFiltrerPar(e.target.value as typeof filtrerPar)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="toutes">📋 Toutes les notifications</option>
              <option value="mission">📦 Missions</option>
              <option value="alert">⚠️ Alertes</option>
              <option value="payment">💰 Paiements</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
              <span className="text-gray-600">{notifications.filter((n) => n.type === "mission").length} Missions</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="text-gray-600">{notifications.filter((n) => n.type === "alert").length} Alertes</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="text-gray-600">
                {notifications.filter((n) => n.type === "payment").length} Paiements
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={getNotificationStyle(notification)}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    <span className="text-lg">{getNotificationIcon(notification)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          notification.type === "alert"
                            ? notification.urgency === "critical"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                            : notification.type === "payment"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {getTypeLabel(notification.type)}
                      </span>
                      {notification.urgency && (
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                            notification.urgency === "critical"
                              ? "bg-red-200 text-red-900"
                              : "bg-orange-200 text-orange-900"
                          }`}
                        >
                          {notification.urgency === "critical" ? "CRITIQUE" : "URGENT"}
                        </span>
                      )}
                      {!notification.read && <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>}
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>🕒</span>
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
            <span className="text-6xl mb-4 block">🔕</span>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune notification</h3>
            <p className="text-gray-600">
              {filtrerPar === "toutes"
                ? "Vous n'avez aucune notification pour le moment."
                : `Aucune notification de type "${getTypeLabel(filtrerPar as Notification["type"])}" trouvée.`}
            </p>
          </div>
        )}
      </div>

      {/* Summary Card */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des notifications</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">Non lues</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-orange-600">
                {notifications.filter((n) => n.urgency === "critical" || n.urgency === "high").length}
              </div>
              <div className="text-sm text-gray-600">Urgentes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
