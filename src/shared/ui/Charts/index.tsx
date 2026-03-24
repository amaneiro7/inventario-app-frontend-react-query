import { lazy } from 'react'

export const BarChart = lazy(() =>
	import('recharts').then(module => ({ default: module.BarChart }))
)
export const Bar = lazy(() => import('recharts').then(module => ({ default: module.Bar })))
export const Cell = lazy(() => import('recharts').then(module => ({ default: module.Cell })))
export const Pie = lazy(() => import('recharts').then(module => ({ default: module.Pie })))
export const PieChart = lazy(() =>
	import('recharts').then(module => ({ default: module.PieChart }))
)
export const CartesianGrid = lazy(() =>
	import('recharts').then(module => ({ default: module.CartesianGrid }))
)
export const Legend = lazy(() => import('recharts').then(module => ({ default: module.Legend })))
export const ResponsiveContainer = lazy(() =>
	import('recharts').then(module => ({ default: module.ResponsiveContainer }))
)
export const Tooltip = lazy(() => import('recharts').then(module => ({ default: module.Tooltip })))
export const XAxis = lazy(() => import('recharts').then(module => ({ default: module.XAxis })))
export const YAxis = lazy(() => import('recharts').then(module => ({ default: module.YAxis })))
export const LabelList = lazy(() =>
	import('recharts').then(module => ({ default: module.LabelList }))
)
