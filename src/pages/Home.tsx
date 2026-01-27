import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import Typography from '@/shared/ui/Typography'
import { InventorySummarySkeleton } from '@/widgets/InventorySummary/InventorySummarySkeleton'

const QuickActions = lazy(() =>
	import('@/widgets/QuickAccess').then(m => ({ default: m.QuickActions }))
)
const WelcomeHero = lazy(() =>
	import('@/widgets/WelcomeHero').then(m => ({ default: m.WelcomeHero }))
)
const InventorySummary = lazy(() =>
	import('@/widgets/InventorySummary').then(m => ({ default: m.InventorySummary }))
)

const InventoryChart = lazy(() =>
	import('@/widgets/InventoryChart').then(m => ({ default: m.InventoryChart }))
)
const InventoryDistribution = lazy(() =>
	import('@/widgets/InventoryDistribution').then(m => ({ default: m.InventoryDistribution }))
)
const InventoryStatus = lazy(() =>
	import('@/widgets/InventoryStatus').then(m => ({ default: m.InventoryStatus }))
)
const RecentActivities = lazy(() =>
	import('@/widgets/RecentActivities').then(m => ({ default: m.RecentActivities }))
)

export default function Home() {
	return (
		<div className="mb-6 space-y-6">
			{/* Secccion del Hero */}
			<WelcomeHero />
			{/* Seccion de los cuadros del balance del inventario */}
			<section className="fade-in">
				<Typography variant="h2" weight="semibold" className="mb-4">
					Resumen de inventario
				</Typography>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar el resumen del inventario."
							onReset={onReset}
						/>
					)}
				>
					<Suspense fallback={<InventorySummarySkeleton />}>
						<InventorySummary />
					</Suspense>
				</ErrorBoundary>
			</section>
			{/* Seccion de los Acciones rápidas */}
			<QuickActions />
			<section className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Seccion Cuadro de modificaciones por mes */}
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar el gráfico de inventario."
							onReset={onReset}
						/>
					)}
				>
					<Suspense
						fallback={
							<div className="animate-pulse-medium min-h-140 w-full bg-gray-200" />
						}
					>
						<InventoryChart />
					</Suspense>
				</ErrorBoundary>
				{/* Actividad reciente */}
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar las actividades recientes."
							onReset={onReset}
						/>
					)}
				>
					<Suspense
						fallback={
							<div className="animate-pulse-medium min-h-140 w-full bg-gray-200" />
						}
					>
						<RecentActivities />
					</Suspense>
				</ErrorBoundary>
			</section>

			<section className="fade-in grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Seccion de Estado de inventario */}
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar el estado del inventario."
							onReset={onReset}
						/>
					)}
				>
					<Suspense
						fallback={
							<div className="animate-pulse-medium min-h-140 w-full bg-gray-200" />
						}
					>
						<InventoryStatus />
					</Suspense>
				</ErrorBoundary>
				{/* Seccion de Distribución de inventario */}
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="Error al cargar la distribución del inventario."
							onReset={onReset}
						/>
					)}
				>
					<Suspense
						fallback={
							<div className="animate-pulse-medium min-h-140 w-full bg-gray-200" />
						}
					>
						<InventoryDistribution />
					</Suspense>
				</ErrorBoundary>
			</section>
		</div>
	)
}
