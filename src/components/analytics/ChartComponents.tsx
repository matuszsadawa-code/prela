import React from 'react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const COLORS = ['#FF006E', '#00D9FF', '#A100F2', '#FFD60A', '#00F5FF', '#FF006E']

interface ChartProps {
  data: Record<string, number>
  title: string
  type?: 'bar' | 'pie'
}

export const SimpleChart: React.FC<ChartProps> = ({ data, title, type = 'bar' }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }))

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-6 h-80 flex items-center justify-center">
        <p className="text-gray-400">Brak danych do wyświetlenia</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-neon-pink">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #FF006E',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="#FF006E" radius={[8, 8, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

interface TimeSeriesChartProps {
  data: Array<{ time: string; value: number }>
  title: string
  color?: string
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  color = '#FF006E',
}) => {
  if (data.length === 0) {
    return (
      <div className="glass rounded-xl p-6 h-80 flex items-center justify-center">
        <p className="text-gray-400">Brak danych do wyświetlenia</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-neon-pink">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a2e',
              border: `1px solid ${color}`,
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface ConversionFunnelProps {
  data: Record<string, number>
  title: string
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data, title }) => {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1])

  if (entries.length === 0) {
    return (
      <div className="glass rounded-xl p-6 flex items-center justify-center">
        <p className="text-gray-400">Brak danych do wyświetlenia</p>
      </div>
    )
  }

  const maxValue = entries[0][1]

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-neon-pink">{title}</h3>
      <div className="space-y-3">
        {entries.map(([name, value], index) => {
          const percentage = (value / maxValue) * 100
          const conversionRate =
            index > 0 ? Math.round((value / entries[index - 1][1]) * 100) : 100

          return (
            <div key={name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold text-gray-300">{name}</span>
                <span className="text-sm text-neon-pink">
                  {value} ({conversionRate}%)
                </span>
              </div>
              <div className="w-full bg-dark-800/50 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-neon-pink to-neon-blue h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 20 && (
                    <span className="text-xs font-bold text-white">{Math.round(percentage)}%</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

