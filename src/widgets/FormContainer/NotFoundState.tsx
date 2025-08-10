import Typography from '@/shared/ui/Typography'
import { AlertCircle } from 'lucide-react'

export const NotFoundState = () => {
	return (
		<div className="flex flex-col items-center justify-center space-y-2 py-8">
			<div className="bg-amarillo rounded-full p-6">
				<AlertCircle className="h-12 w-12" />
			</div>
			<Typography variant="h3" color="black">
				No se encontró el elemento
			</Typography>
			<Typography variant="p" color="gris">
				El elemento que estás buscando no existe. Por favor, verifica la información e
				intenta de nuevo.
			</Typography>
		</div>
	)
}
