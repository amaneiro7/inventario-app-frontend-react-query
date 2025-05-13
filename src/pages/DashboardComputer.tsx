import { lazy, Suspense } from 'react'
import { useGetComputerDashboard } from '@/core/devices/dashboard/infra/hooks/useGetComputerDashboard'
import { Seo } from '@/components/Seo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { InventorySummary } from '@/ui/Home/InventorySummary'
import { Loading } from '@/components/Loading'

const InventoryOverview = lazy(() =>
	import('@/ui/dashboard/InventoryBrandOverview').then(m => ({ default: m.InventoryOverview }))
)

const BrandDistribution = lazy(() =>
	import('@/ui/dashboard/Brands/BrandDistribution').then(m => ({ default: m.BrandDistribution }))
)
const ModelBreakdown = lazy(() =>
	import('@/ui/dashboard/ModelBreakdown/ModelBreakdown').then(m => ({
		default: m.ModelBreakdown
	}))
)
const GeographicalDistribution = lazy(() =>
	import('@/ui/dashboard/GeographicalDistribution/GeographicalDistribution').then(m => ({
		default: m.GeographicalDistribution
	}))
)
const HardDriveAnalysis = lazy(() =>
	import('@/ui/dashboard/HardDrive/HardDriveAnalysis').then(m => ({
		default: m.HardDriveAnalysis
	}))
)
const InventoryBrandTable = lazy(() =>
	import('@/ui/dashboard/InventoryBrandTable/InventoryBrandTable').then(m => ({
		default: m.InventoryBrandTable
	}))
)
const OSAnalysis = lazy(() =>
	import('@/ui/dashboard/OSAnalysis/OSAnalysis').then(m => ({ default: m.OSAnalysis }))
)
const OSDIstributionByRegion = lazy(() =>
	import('@/ui/dashboard/OSDistributionByRegion/OSDistributionByRegion').then(m => ({
		default: m.OSDIstributionByRegion
	}))
)
const MemoryRamAnalysis = lazy(() =>
	import('@/ui/dashboard/MemoryRamAnalysis/MemoryRamAnalysis').then(m => ({
		default: m.MemoryRamAnalysis
	}))
)

export default function DashboardComputer() {
	const { computerDashboard, isLoading } = useGetComputerDashboard()

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
				<InventorySummary />
			</section>
			<Tabs defaultValue="overview" className="space-y-4">
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
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<InventoryOverview
							categoryData={computerDashboard.category}
							statusData={computerDashboard.status}
						/>
					</Suspense>
				</TabsContent>

				<TabsContent value="brands" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<BrandDistribution brandData={computerDashboard.brand} />
					</Suspense>
				</TabsContent>

				<TabsContent value="models" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<ModelBreakdown data={computerDashboard.brand} />
					</Suspense>
				</TabsContent>

				<TabsContent value="geographical" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<GeographicalDistribution data={computerDashboard.region} />
					</Suspense>
				</TabsContent>
				<TabsContent value="harddrive" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<HardDriveAnalysis data={computerDashboard.hardDrive} />
					</Suspense>
				</TabsContent>
				<TabsContent value="operatingSystem" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<OSAnalysis data={computerDashboard.operatingSystem} />
					</Suspense>
				</TabsContent>
				<TabsContent value="operatingSystemByRegion" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<OSDIstributionByRegion data={computerDashboard.operatingSystemByRegion} />
					</Suspense>
				</TabsContent>
				<TabsContent value="memoryRam" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<MemoryRamAnalysis data={computerDashboard} />
					</Suspense>
				</TabsContent>
				<TabsContent value="inventory" className="space-y-4">
					<Suspense
						fallback={<div className="min-h-80 w-full animate-pulse bg-gray-200" />}
					>
						<InventoryBrandTable data={computerDashboard.brand} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</>
	)
}
