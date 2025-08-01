import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/Card'
import { PlusCircle, Download, BarChart2, UserPlus, History } from 'lucide-react'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'

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

function CardLink({
	url,
	text,
	children
}: React.PropsWithChildren<{ text?: string; url: string }>) {
	return (
		<Link
			className="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-auto flex-col items-center justify-center gap-2 space-y-2 rounded-md border px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
			to={url}
		>
			{text}
			{children}
		</Link>
	)
}
function CardButton({
	children,
	...props
}: React.PropsWithChildren<
	React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>) {
	return (
		<button
			className="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-auto cursor-pointer flex-col items-center justify-center gap-2 space-y-2 rounded-md border px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
			{...props}
		>
			{children}
		</button>
	)
}
