import { useNavigate } from 'react-router-dom'
import Button from '@/shared/ui/Button'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import Typography from '@/shared/ui/Typography'

export const FormErrorState = ({ onRetry }: { onRetry?: () => void }) => {
	const navigate = useNavigate()
	return (
		<DetailsBoxWrapper className="flex flex-col items-center justify-center rounded-lg border-2 border-red-300 bg-red-50 p-12 text-center">
			<Typography variant="h3" color="rojo" weight="semibold">
				¡Ups! Algo salió mal
			</Typography>
			<Typography variant="p" className="mt-2 text-red-600">
				Hubo un problema al cargar los datos. Por favor, intenta de nuevo.
			</Typography>
			<div className="mt-6 flex gap-4">
				{onRetry !== undefined && (
					<Button
						buttonSize="large"
						size="content"
						text="Reintentar"
						color="blue"
						onClick={onRetry}
					/>
				)}
				<Button
					buttonSize="large"
					size="content"
					text="Regresar"
					color="gray"
					onClick={() => navigate(-1)}
				/>
			</div>
		</DetailsBoxWrapper>
	)
}
