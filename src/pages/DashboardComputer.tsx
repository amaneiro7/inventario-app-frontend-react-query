import { lazy, Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Loading } from '@/components/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { useGetComputerDashboard } from '@/core/devices/dashboard/infra/hooks/useGetComputerDashboard'

const InventoryOverview = lazy(() =>
	import('@/ui/dashboard/InventoryBrandOverview').then(m => ({ default: m.InventoryOverview }))
)

const BrandDistribution = lazy(() =>
	import('@/ui/dashboard/BrandDistribution').then(m => ({ default: m.BrandDistribution }))
)
const GeographicalDistribution = lazy(() =>
	import('@/ui/dashboard/GeographicalDistribution').then(m => ({
		default: m.GeographicalDistribution
	}))
)
const HardDriveAnalysis = lazy(() =>
	import('@/ui/dashboard/HardDriveAnalysis').then(m => ({ default: m.HardDriveAnalysis }))
)
const InventoryBrandTable = lazy(() =>
	import('@/ui/dashboard/InventoryBrandTable').then(m => ({ default: m.InventoryBrandTable }))
)
const ModelBreakdown = lazy(() =>
	import('@/ui/dashboard/ModelBreakdown').then(m => ({ default: m.ModelBreakdown }))
)
const OSAnalysis = lazy(() =>
	import('@/ui/dashboard/OSAnalysis').then(m => ({ default: m.OSAnalysis }))
)
const OSDIstributionByRegion = lazy(() =>
	import('@/ui/dashboard/OSDistributionByRegion').then(m => ({
		default: m.OSDIstributionByRegion
	}))
)
const MemoryRamAnalysis = lazy(() =>
	import('@/ui/dashboard/MemoryRamAnalysis').then(m => ({ default: m.MemoryRamAnalysis }))
)

export default function DashboardComputer() {
	const { computerDashboard, isLoading } = useGetComputerDashboard()

	if (isLoading || !computerDashboard) {
		return <Loading />
	}

	return (
		<>
			<div className="grid gap-4 md:grid-cols-4 mb-6">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base font-semibold text-muted-foreground">
							Total de equipos
						</CardTitle>
						<CardContent>
							<div className="text-3xl font-bold">{computerDashboard?.total}</div>
						</CardContent>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base font-semibold text-muted-foreground">
							Total de empleados activos
						</CardTitle>
						<CardContent>
							<div className="text-3xl font-bold">
								{computerDashboard?.activeEmployees}
							</div>
						</CardContent>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-base font-semibold text-muted-foreground">
							Total de agencias
						</CardTitle>
						<CardContent>
							<div className="text-3xl font-bold">
								{computerDashboard?.totalAgencies}
							</div>
						</CardContent>
					</CardHeader>
				</Card>
			</div>
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
					<Suspense>
						<InventoryOverview
							categoryData={computerDashboard.category}
							statusData={computerDashboard.status}
						/>
					</Suspense>
				</TabsContent>

				<TabsContent value="brands" className="space-y-4">
					<Suspense>
						<BrandDistribution brandData={computerDashboard.brand} />
					</Suspense>
				</TabsContent>

				<TabsContent value="models" className="space-y-4">
					<Suspense>
						<ModelBreakdown data={computerDashboard.brand} />
					</Suspense>
				</TabsContent>

				<TabsContent value="geographical" className="space-y-4">
					<Suspense>
						<GeographicalDistribution data={computerDashboard.region} />
					</Suspense>
				</TabsContent>
				<TabsContent value="harddrive" className="space-y-4">
					<Suspense>
						<HardDriveAnalysis data={computerDashboard.hardDrive} />
					</Suspense>
				</TabsContent>
				<TabsContent value="operatingSystem" className="space-y-4">
					<Suspense>
						<OSAnalysis data={computerDashboard.operatingSystem} />
					</Suspense>
				</TabsContent>
				<TabsContent value="operatingSystemByRegion" className="space-y-4">
					<Suspense>
						<OSDIstributionByRegion data={computerDashboard.operatingSystemByRegion} />
					</Suspense>
				</TabsContent>
				<TabsContent value="memoryRam" className="space-y-4">
					<Suspense>
						<MemoryRamAnalysis data={computerDashboard} />
					</Suspense>
				</TabsContent>
				<TabsContent value="inventory" className="space-y-4">
					<Suspense>
						<InventoryBrandTable data={computerDashboard.brand} />
					</Suspense>
				</TabsContent>
			</Tabs>
		</>
	)
}
