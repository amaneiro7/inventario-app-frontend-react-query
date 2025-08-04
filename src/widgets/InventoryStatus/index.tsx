import { memo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { useGetStatusDashboard } from '@/entities/status/dashboard/infra/hooks/useGetStatusDashboard'
import { StatusList } from './StatusList'

export const InventoryStatus = memo(() => {
	const { statusDashboard, isLoading } = useGetStatusDashboard()
	const [activeTab, setActiveTab] = useState('overall')

	if (!statusDashboard || isLoading) {
		return <div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
	}
	const currentData = statusDashboard.status[activeTab as keyof typeof statusDashboard.status]

	return (
		<Card className="h-full md:min-h-[560px]">
			<CardHeader>
				<CardTitle>Estado de Equipos</CardTitle>
				<CardDescription>Condición actual del inventario</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="overall" onValueChange={setActiveTab}>
					<TabsList className="mb-6 grid grid-cols-5">
						<TabsTrigger value="overall">General</TabsTrigger>
						<TabsTrigger value="Computadoras">Computadoras</TabsTrigger>
						<TabsTrigger value="Laptops">Laptops</TabsTrigger>
						<TabsTrigger value="All in One">All in One</TabsTrigger>
						<TabsTrigger value="Monitores">Monitores</TabsTrigger>
					</TabsList>

					<TabsContent value="overall" className="mt-0">
						<StatusList statusData={currentData} total={statusDashboard.total} />
					</TabsContent>

					<TabsContent value="Computadoras" className="mt-0">
						<StatusList
							statusData={currentData}
							total={statusDashboard.total}
							useProgress
						/>
					</TabsContent>

					<TabsContent value="Laptops" className="mt-0">
						<StatusList
							statusData={currentData}
							total={statusDashboard.total}
							useProgress
						/>
					</TabsContent>
					<TabsContent value="All in One" className="mt-0">
						<StatusList
							statusData={currentData}
							total={statusDashboard.total}
							useProgress
						/>
					</TabsContent>
					<TabsContent value="Monitores" className="mt-0">
						<StatusList
							statusData={currentData}
							total={statusDashboard.total}
							useProgress
						/>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
})

InventoryStatus.displayName = 'InventoryStatus'
