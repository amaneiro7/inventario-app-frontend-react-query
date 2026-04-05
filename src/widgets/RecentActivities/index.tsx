import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { useGetAllHistorys } from '@/entities/history/infra/hook/useGetAllHistory'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import Typography from '@/shared/ui/Typography'
import { getHistoryActionClassName } from '@/entities/history/infra/ui/getHistoryActionClassName'
import { GetDeviceIcon } from '@/entities/category/infra/ui/GetDeviceIcon'

export const RecentActivities = memo(() => {
	const { data: histories, isLoading } = useGetAllHistorys({ pageSize: 5 })
	if (!histories || isLoading) {
		return <div className="animate-pulse-medium min-h-140 w-full bg-gray-200" />
	}
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Actividades recientes</CardTitle>
				<CardDescription>Últimas actualizaciones en el sistema</CardDescription>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="divide-y">
					{histories.data.map(history => {
						const action =
							history.action === 'CREATE'
								? 'Agregado'
								: history.action === 'DELETE'
									? 'Eliminado'
									: 'Actualizado'
						return (
							<li
								key={history.id}
								className="px-6 py-4 transition-colors hover:bg-slate-50"
							>
								<div className="flex items-start gap-4">
									<div
										className={`rounded-full p-2 ${getHistoryActionClassName(history.action)}`}
									>
										{
											<GetDeviceIcon
												categoryId={history.device?.categoryId}
												width={20}
												height={20}
											/>
										}
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium text-slate-900">
											{`${history.device?.category?.name} ${history.device?.brand?.name} ${history.device?.model?.name} - Serial: ${history.device.serial}`}
										</p>
										<p className="truncate text-sm text-slate-500">
											{`${action} por ${history.user?.employee?.name} ${history.user?.employee?.lastName}`}
										</p>
									</div>
									<Typography variant="span" option="tiny" color="gris">
										{getRelativeTime(history.updatedAt)}
									</Typography>
								</div>
							</li>
						)
					})}
				</ul>
			</CardContent>
		</Card>
	)
})
