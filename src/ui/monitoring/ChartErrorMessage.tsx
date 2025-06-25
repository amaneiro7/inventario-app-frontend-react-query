import Typography from '@/components/Typography'

interface ChartErrorMessageProps {
	error?: Error | null
}

export const ChartErrorMessage = ({ error }: ChartErrorMessageProps) => {
	return (
		<div className="flex h-full min-h-[300px] items-center justify-center">
			<Typography variant="p" color="rojo">
				No se pudo cargar el resumen del estado de las conexiones. Por favor, intenta
				recargar la página. Error al cargar los datos: {error?.message}
			</Typography>
		</div>
	)
}
