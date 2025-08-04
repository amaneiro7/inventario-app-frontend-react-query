import { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { useGetAllHistorys } from '@/entities/history/infra/hook/useGetAllHistory'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import {
	Laptop,
	Monitor,
	ScreenShareIcon,
	Computer,
	Server,
	PrinterCheck,
	Keyboard,
	HardDrive,
	Mouse,
	Usb,
	ScanIcon,
	Phone,
	Mic,
	HdmiPort,
	Tablet,
	Camera,
	Webcam,
	Pencil,
	Dock,
	Speaker
} from 'lucide-react'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import Typography from '@/shared/ui/Typography'

const getActivityColor = (action: string) => {
	switch (action) {
		case 'CREATE':
			return 'text-naranja-500 bg-naranja-100'
		case 'UPDATE':
			return 'text-verde-500 bg-verde-100'
		case 'DELETE':
			return 'text-rojo-500 bg-rojo-100'
		default:
			return 'text-slate-500 bg-slate-100'
	}
}

export const RecentActivities = memo(() => {
	const { data: histories, isLoading } = useGetAllHistorys({ pageSize: 5 })
	if (!histories || isLoading) {
		return <div className="animate-pulse-medium min-h-[560px] w-full bg-gray-200" />
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
						const Icon = getCategoryIcon(history.device.categoryId)
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
										className={`rounded-full p-2 ${getActivityColor(history.action)}`}
									>
										{Icon && <Icon width={20} height={20} />}
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium text-slate-900">
											{`${history.device?.category?.name} ${history.device?.brand?.name} ${history.device?.model?.name} - Serial: ${history.device.serial}`}
										</p>
										<p className="truncate text-sm text-slate-500">
											{`${action} por ${history.user?.name} ${history.user?.lastName}`}
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

// Objeto que mapea categoryId a un componente de icono de Lucide React
export const categoryIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	[CategoryOptions.COMPUTER]: Computer,
	[CategoryOptions.SERVER]: Server,
	[CategoryOptions.LAPTOP]: Laptop,
	[CategoryOptions.ALLINONE]: ScreenShareIcon,
	[CategoryOptions.MONITOR]: Monitor,
	[CategoryOptions.FINANTIALPRINTER]: PrinterCheck,
	[CategoryOptions.LASERPRINTER]: PrinterCheck,
	[CategoryOptions.INKPRINTER]: PrinterCheck,
	[CategoryOptions.HARDDRIVE]: HardDrive,
	[CategoryOptions.KEYBOARD]: Keyboard,
	[CategoryOptions.MOUSE]: Mouse,
	[CategoryOptions.BAM]: Monitor,
	[CategoryOptions.MFP]: PrinterCheck,
	[CategoryOptions.PHONE]: Phone,
	[CategoryOptions.SCANNER]: ScanIcon,
	[CategoryOptions.ANTENAS]: Monitor,
	[CategoryOptions.CABLEUSB]: Usb,
	[CategoryOptions.CAMARAS]: Camera,
	[CategoryOptions.IPAD]: Tablet,
	[CategoryOptions.WEBCAM]: Webcam,
	[CategoryOptions.CORNETAS]: Speaker,
	[CategoryOptions.DOCKING]: Dock,
	[CategoryOptions.LAPIZOPTICO]: Pencil,
	[CategoryOptions.CONVERTIDORVGAHDMI]: HdmiPort,
	[CategoryOptions.MIC]: Mic
}

// Función para obtener el componente de icono basado en el categoryId
export const getCategoryIcon = (
	categoryId: string | undefined
): React.FC<React.SVGProps<SVGSVGElement>> | undefined => {
	if (!categoryId) {
		return undefined // O podrías devolver un icono por defecto
	}
	return categoryIconMap[categoryId]
}
