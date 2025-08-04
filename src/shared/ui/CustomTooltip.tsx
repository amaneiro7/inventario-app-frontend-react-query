import { MapPin } from 'lucide-react'

export const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload
		return (
			<div className="bg-background rounded-lg border p-2 text-wrap shadow-md">
				<div className="flex items-center gap-2">
					<MapPin className="h-4 w-4" />
					<span className="font-medium">{data.name}</span>
				</div>
				<div className="mt-1 text-sm">
					<p className="flex gap-2">
						<span className="font-semibold">{data.value}</span>
						<span className="text-muted-foreground">Total equipos</span>
					</p>
					{data.Agencia !== undefined && (
						<p className="flex gap-2">
							<span className="text-naranja font-semibold">{data.Agencia}</span>
							<span className="text-muted-foreground">Agencias</span>
						</p>
					)}
					{data['Sede Administrativa'] !== undefined && (
						<p className="flex gap-2">
							<span className="text-verde font-semibold">
								{data['Sede Administrativa']}
							</span>
							<span className="text-muted-foreground">Sedes Administrativas</span>
						</p>
					)}
				</div>
			</div>
		)
	}
	return null
}
