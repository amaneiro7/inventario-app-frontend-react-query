import { memo } from 'react'
import { PlusCircle, Download, BarChart2, UserPlus, History } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { CardLink } from './CardLink'
import { CardButton } from './CardButton'

export const QuickActions = memo(() => {
	const { download, isDownloading } = useDownloadExcelService()
	const handleDownloadToExcel = async () => {
		await download({
			source: 'computer',
			query: {
				defaultQuery: 'computer'
			}
		})
	}
	return (
		<Card>
			<CardHeader>
				<CardTitle>Acciones rápidas</CardTitle>
				<CardDescription>Operaciones comunes para gestionar inventario</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
				<CardLink url="/form/device/add">
					<PlusCircle className="mb-1 h-5 w-5" />
					<span className="text-xs">Nuevo equipo</span>
				</CardLink>
				<CardLink url="/form/employee/add">
					<UserPlus className="mb-1 h-5 w-5" />
					<span className="text-xs">Nuevo usuario</span>
				</CardLink>
				<CardLink url="/list/history">
					<History className="mb-1 h-5 w-5" />
					<span className="text-xs">Historial</span>
				</CardLink>
				<CardLink url="/dashboard/computer">
					<BarChart2 className="mb-1 h-5 w-5" />
					<span className="text-xs">Ver estadísticas</span>
				</CardLink>
				<CardButton onClick={handleDownloadToExcel} disabled={isDownloading}>
					<Download className="mb-1 h-5 w-5" />
					<span className="text-xs">Reporte general de computadoras</span>
				</CardButton>
			</CardContent>
		</Card>
	)
})
