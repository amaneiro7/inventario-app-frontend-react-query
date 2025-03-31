import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Loading } from '@/components/Loading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { useGetComputerDashboard } from '@/core/devices/dashboard/infra/hooks/useGetComputerDashboard'
import { BrandDistribution } from '@/ui/dashboard/BrandDistribution'
import { InventoryOerview } from '@/ui/dashboard/InventoryBrandOverview'
import { InventoryBrandTable } from '@/ui/dashboard/InventoryBrandTable'
import { ModelBreakdown } from '@/ui/dashboard/ModelBreakdown'
// import { PieCard } from '@/ui/dashboard/PieCard'
// import { Suspense } from 'react'

export default function DashboardComputer() {
	const { computerDashboard, isLoading } = useGetComputerDashboard()

	if (isLoading) {
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
			</div>
			{/* <div className="flex flex-wrap gap-4">
				<Suspense fallback={<Loading />}>
					<PieCard
						backgroundColor="orange"
						data={computerDashboard?.status}
						dataKey="count"
						total={computerDashboard?.total}
						title="Total equipos por estatus"
					/>
					<PieCard
						backgroundColor="blue"
						data={computerDashboard?.category}
						dataKey="count"
						total={computerDashboard?.total}
						title="Total equipos por categoria"
					/>
				</Suspense>
			</div> */}
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="brands">Marcas</TabsTrigger>
					<TabsTrigger value="models">Modelos</TabsTrigger>
					<TabsTrigger value="inventory">Inventario</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<InventoryOerview
						categoryData={computerDashboard.category}
						statusData={computerDashboard.status}
					/>
				</TabsContent>

				<TabsContent value="brands" className="space-y-4">
					<BrandDistribution brandData={computerDashboard.brand} />
				</TabsContent>

				<TabsContent value="models" className="space-y-4">
					<ModelBreakdown data={computerDashboard.brand} />
				</TabsContent>

				<TabsContent value="inventory" className="space-y-4">
					<InventoryBrandTable data={computerDashboard.brand} />
				</TabsContent>
			</Tabs>
		</>
	)
}
