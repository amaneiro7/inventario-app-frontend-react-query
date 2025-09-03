import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetComputerDashboard } from '@/entities/devices/dashboard/infra/hooks/useGetComputerDashboard'
import { Seo } from '@/shared/ui/Seo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { Loading } from '@/shared/ui/Loading'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InventorySummarySkeleton } from '@/widgets/InventorySummary/InventorySummarySkeleton'

const InventorySummary = lazy(() =>
	import('@/widgets/InventorySummary').then(m => ({ default: m.InventorySummary }))
)
const InventoryOverview = lazy(() =>
	import('@/widgets/dashboard/InventoryOverview/ui/InventoryOverview').then(m => ({
		default: m.InventoryOverview
	}))
)

const BrandDistribution = lazy(() =>
	import('@/widgets/dashboard/BrandDistribution/ui/BrandDistribution').then(m => ({
		default: m.BrandDistribution
	}))
)
const ModelBreakdown = lazy(() =>
	import('@/widgets/dashboard/ModelBreakdown/ui/ModelBreakdown').then(m => ({
		default: m.ModelBreakdown
	}))
)
const GeographicalDistribution = lazy(() =>
	import('@/widgets/dashboard/GeographicalDistribution/ui/GeographicalDistribution').then(m => ({
		default: m.GeographicalDistribution
	}))
)
const HardDriveAnalysis = lazy(() =>
	import('@/widgets/dashboard/HardDriveAnalysis/ui/HardDriveAnalysis').then(m => ({
		default: m.HardDriveAnalysis
	}))
)
const InventoryBrandTable = lazy(() =>
	import('@/widgets/dashboard/InventoryBrandTable/ui/InventoryBrandTable').then(m => ({
		default: m.InventoryBrandTable
	}))
)
const OSAnalysis = lazy(() =>
	import('@/widgets/dashboard/OSAnalysis/ui/OSAnalysis').then(m => ({ default: m.OSAnalysis }))
)
const OSDIstributionByRegion = lazy(() =>
	import('@/widgets/dashboard/OSDistributionByRegion/ui/OSDistributionByRegion').then(m => ({
		default: m.OSDIstributionByRegion
	}))
)
const MemoryRamAnalysis = lazy(() =>
	import('@/widgets/dashboard/MemoryRamAnalysis/ui/MemoryRamAnalysis').then(m => ({
		default: m.MemoryRamAnalysis
	}))
)

export default function DashboardComputer() {
	const { computerDashboard, isLoading } = useGetComputerDashboard()
	const [searchParams, setSearchParams] = useSearchParams()

	const tabValues = [
		'overview',
		'brands',
		'models',
		'geographical',
		'harddrive',
		'operatingSystem',
		'operatingSystemByRegion',
		'memoryRam',
		'inventory'
	]
	const currentTab = searchParams.get('tab')
	const activeTab = currentTab && tabValues.includes(currentTab) ? currentTab : 'overview'

	const handleTabChange = (value: string) => {
		setSearchParams({ tab: value })
	}

	if (isLoading || !computerDashboard) {
		return <Loading />
	}

	const title = 'Dashboard de Computadoras | Resumen y Análisis'
	const description =
		'Visualización del estado general de las computadoras, incluyendo inventario por marca, distribución geográfica, análisis de disco duro, sistemas operativos, memoria RAM y más.'

	return (
		<>
			<Seo title={title} description={description} />
			<section className="fade-in mb-6">
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							message="No se pudo cargar el resumen del inventario."
							onReset={onReset}
						/>
					)}
				>
					<Suspense fallback={<InventorySummarySkeleton />}>
						<InventorySummary />
					</Suspense>
				</ErrorBoundary>
			</section>
			<Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="brands">Marcas</TabsTrigger>
					<TabsTrigger value="models">Modelos</TabsTrigger>
					<TabsTrigger value="geographical">Geográfico</TabsTrigger>
					<TabsTrigger value="harddrive">Disco Duros</TabsTrigger>
					<TabsTrigger value="operatingSystem">Sistemas Operativos</TabsTrigger>
					<TabsTrigger value="operatingSystemByRegion">
						Sistemas Operativos por Región
					</TabsTrigger>
					<TabsTrigger value="memoryRam">Memoria Ram</TabsTrigger>
					<TabsTrigger value="inventory">Inventario</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar la vista general."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<InventoryOverview
								categoryData={computerDashboard.category}
								statusData={computerDashboard.status}
							/>
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="brands" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar la distribución por marcas."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<BrandDistribution brandData={computerDashboard.brand} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="models" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar el desglose por modelos."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<ModelBreakdown data={computerDashboard.brand} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="geographical" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar la distribución geográfica."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<GeographicalDistribution data={computerDashboard.region} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="harddrive" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar el análisis de discos duros."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<HardDriveAnalysis data={computerDashboard.hardDrive} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="operatingSystem" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar el análisis de sistemas operativos."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<OSAnalysis data={computerDashboard.operatingSystem} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="operatingSystemByRegion" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar la distribución de S.O. por región."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<OSDIstributionByRegion
								data={computerDashboard.operatingSystemByRegion}
							/>
						</Suspense>
					</ErrorBoundary>
				</TabsContent>

				<TabsContent value="memoryRam" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar el análisis de memoria RAM."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<MemoryRamAnalysis data={computerDashboard} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
				<TabsContent value="inventory" className="space-y-4">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								message="No se pudo cargar la tabla de inventario."
								onReset={onReset}
							/>
						)}
					>
						<Suspense
							fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
						>
							<InventoryBrandTable data={computerDashboard.brand} />
						</Suspense>
					</ErrorBoundary>
				</TabsContent>
			</Tabs>
		</>
	)
}
