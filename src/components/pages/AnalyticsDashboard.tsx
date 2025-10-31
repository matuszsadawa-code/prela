import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Zap, Download, Trash2, Eye, EyeOff, Smartphone, Activity, Globe } from 'lucide-react'
import type {
  AnalyticsData,
  ConversionData,
  DeviceData,
  BehaviorData,
} from '../../utils/analytics'
import {
  getStoredAnalyticsEvents,
  getStoredConversions,
  getAnalyticsSummary,
  clearAnalyticsData,
  getStoredDeviceData,
  getStoredBehaviorData,
} from '../../utils/analytics'
import { SimpleChart, ConversionFunnel } from '../analytics/ChartComponents'

const AnalyticsDashboard: React.FC = () => {
  const [events, setEvents] = useState<AnalyticsData[]>([])
  const [conversions, setConversions] = useState<ConversionData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceData[]>([])
  const [behaviorData, setBehaviorData] = useState<BehaviorData[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'conversions' | 'devices' | 'behavior'>('overview')

  // Simple password protection
  const DASHBOARD_PASSWORD = 'maja2024analytics'

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
      const interval = setInterval(loadData, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const loadData = () => {
    setEvents(getStoredAnalyticsEvents())
    setConversions(getStoredConversions())
    setDeviceData(getStoredDeviceData())
    setBehaviorData(getStoredBehaviorData())
    setSummary(getAnalyticsSummary())
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true)
      setPasswordInput('')
    } else {
      alert('Nieprawidłowe hasło!')
      setPasswordInput('')
    }
  }

  const handleClearData = () => {
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie dane analityki?')) {
      clearAnalyticsData()
      loadData()
    }
  }

  const handleExportData = () => {
    const data = {
      events,
      conversions,
      summary,
      exportedAt: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics_${Date.now()}.json`
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neon-gradient flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-2 text-neon-pink">
            Analytics Dashboard
          </h1>
          <p className="text-center text-gray-300 mb-6">Wpisz hasło aby uzyskać dostęp</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Hasło"
                className="w-full px-4 py-3 bg-dark-800/50 border border-neon-pink/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-neon-pink"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-pink to-neon-purple py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-neon-pink/50 transition"
            >
              Zaloguj się
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neon-gradient p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-neon-pink">Analytics Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-4 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg transition"
            >
              <Download size={20} /> Export
            </button>
            <button
              onClick={handleClearData}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition"
            >
              <Trash2 size={20} /> Wyczyść
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {(['overview', 'events', 'conversions', 'devices', 'behavior'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                activeTab === tab
                  ? 'bg-neon-pink text-white'
                  : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50'
              }`}
            >
              {tab === 'overview' && 'Przegląd'}
              {tab === 'events' && 'Zdarzenia'}
              {tab === 'conversions' && 'Konwersje'}
              {tab === 'devices' && 'Urządzenia'}
              {tab === 'behavior' && 'Zachowanie'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && summary && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<Zap size={24} />}
                label="Całkowite zdarzenia"
                value={summary.totalEvents}
                color="neon-pink"
              />
              <StatCard
                icon={<TrendingUp size={24} />}
                label="Konwersje"
                value={summary.totalConversions}
                color="neon-blue"
              />
              <StatCard
                icon={<Users size={24} />}
                label="Sesje"
                value={summary.uniqueSessions}
                color="neon-purple"
              />
              <StatCard
                icon={<BarChart3 size={24} />}
                label="Wartość konwersji"
                value={`$${summary.totalConversionValue.toFixed(2)}`}
                color="gold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<Activity size={24} />}
                label="Bounce Rate"
                value={`${summary.bounceRate}%`}
                color="neon-pink"
              />
              <StatCard
                icon={<TrendingUp size={24} />}
                label="Conversion Rate"
                value={`${summary.conversionRate}%`}
                color="neon-blue"
              />
              <StatCard
                icon={<Smartphone size={24} />}
                label="Avg Scroll Depth"
                value={`${summary.avgScrollDepth}%`}
                color="neon-purple"
              />
              <StatCard
                icon={<Globe size={24} />}
                label="Avg Time on Page"
                value={`${summary.avgTimeOnPage}s`}
                color="gold"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {summary?.eventsByType && Object.keys(summary.eventsByType).length > 0 && (
                <SimpleChart
                  data={summary.eventsByType}
                  title="Zdarzenia po Typach"
                  type="bar"
                />
              )}
              {summary?.conversionsByType && Object.keys(summary.conversionsByType).length > 0 && (
                <SimpleChart
                  data={summary.conversionsByType}
                  title="Konwersje po Typach"
                  type="pie"
                />
              )}
              {summary?.conversionsBySource && Object.keys(summary.conversionsBySource).length > 0 && (
                <ConversionFunnel
                  data={summary.conversionsBySource}
                  title="Konwersje po Źródle"
                />
              )}
              {summary?.devicesByType && Object.keys(summary.devicesByType).length > 0 && (
                <SimpleChart
                  data={summary.devicesByType}
                  title="Urządzenia"
                  type="pie"
                />
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="glass rounded-xl p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Ostatnie zdarzenia</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neon-pink/30">
                  <th className="text-left py-2 px-4">Czas</th>
                  <th className="text-left py-2 px-4">Zdarzenie</th>
                  <th className="text-left py-2 px-4">Źródło</th>
                  <th className="text-left py-2 px-4">Kampania</th>
                </tr>
              </thead>
              <tbody>
                {events.slice().reverse().map((event, idx) => (
                  <tr key={idx} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                    <td className="py-2 px-4">{new Date(event.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 px-4 font-semibold">{event.eventName}</td>
                    <td className="py-2 px-4">{event.utmParameters.utm_source || '-'}</td>
                    <td className="py-2 px-4">{event.utmParameters.utm_campaign || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Conversions Tab */}
        {activeTab === 'conversions' && (
          <div className="glass rounded-xl p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Konwersje</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neon-pink/30">
                  <th className="text-left py-2 px-4">Czas</th>
                  <th className="text-left py-2 px-4">Typ</th>
                  <th className="text-left py-2 px-4">Źródło</th>
                  <th className="text-left py-2 px-4">Medium</th>
                  <th className="text-left py-2 px-4">Wartość</th>
                </tr>
              </thead>
              <tbody>
                {conversions.slice().reverse().map((conv, idx) => (
                  <tr key={idx} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                    <td className="py-2 px-4">{new Date(conv.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 px-4 font-semibold">{conv.type}</td>
                    <td className="py-2 px-4">{conv.source}</td>
                    <td className="py-2 px-4">{conv.medium}</td>
                    <td className="py-2 px-4">{conv.value ? `$${conv.value}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {summary?.devicesByType && Object.keys(summary.devicesByType).length > 0 && (
                <SimpleChart
                  data={summary.devicesByType}
                  title="Urządzenia"
                  type="pie"
                />
              )}

              {summary?.browserStats && Object.keys(summary.browserStats).length > 0 && (
                <SimpleChart
                  data={summary.browserStats}
                  title="Przeglądarki"
                  type="bar"
                />
              )}

              {summary?.osStats && Object.keys(summary.osStats).length > 0 && (
                <SimpleChart
                  data={summary.osStats}
                  title="Systemy Operacyjne"
                  type="pie"
                />
              )}
            </div>

            <div className="glass rounded-xl p-6 overflow-x-auto">
              <h3 className="text-lg font-bold mb-4">Szczegóły Urządzeń</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neon-pink/30">
                    <th className="text-left py-2 px-4">Typ</th>
                    <th className="text-left py-2 px-4">OS</th>
                    <th className="text-left py-2 px-4">Przeglądarka</th>
                    <th className="text-left py-2 px-4">Rozdzielczość</th>
                    <th className="text-left py-2 px-4">Język</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceData.slice().reverse().map((device, idx) => (
                    <tr key={idx} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                      <td className="py-2 px-4">{device.deviceType}</td>
                      <td className="py-2 px-4">{device.os}</td>
                      <td className="py-2 px-4">{device.browser}</td>
                      <td className="py-2 px-4">{device.screenResolution}</td>
                      <td className="py-2 px-4">{device.language}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Behavior Tab */}
        {activeTab === 'behavior' && (
          <div className="glass rounded-xl p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Zachowanie Użytkowników</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neon-pink/30">
                  <th className="text-left py-2 px-4">Czas</th>
                  <th className="text-left py-2 px-4">Typ Zdarzenia</th>
                  <th className="text-left py-2 px-4">Sekcja</th>
                  <th className="text-left py-2 px-4">Scroll Depth</th>
                  <th className="text-left py-2 px-4">Czas na Stronie</th>
                </tr>
              </thead>
              <tbody>
                {behaviorData.slice().reverse().map((behavior, idx) => (
                  <tr key={idx} className="border-b border-dark-700/50 hover:bg-dark-800/30">
                    <td className="py-2 px-4">{new Date(behavior.timestamp).toLocaleTimeString()}</td>
                    <td className="py-2 px-4 font-semibold">{behavior.eventType}</td>
                    <td className="py-2 px-4">{behavior.section || '-'}</td>
                    <td className="py-2 px-4">{behavior.scrollDepth ? `${behavior.scrollDepth}%` : '-'}</td>
                    <td className="py-2 px-4">{behavior.timeOnPage ? `${behavior.timeOnPage}s` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-xl p-6"
  >
    <div className={`text-${color} mb-2`}>{icon}</div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </motion.div>
)

export default AnalyticsDashboard

