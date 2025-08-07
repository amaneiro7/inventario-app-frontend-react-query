import { useNavigate } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import Button from '@/shared/ui/Button'
import Typography from '@/shared/ui/Typography'

export const NotFoundState = () => {
	const navigate = useNavigate()
	return (
		<DetailsBoxWrapper className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-white p-12 text-center">
			<Typography variant="h3" weight="semibold" className="text-gray-800">
				Recurso no encontrado
			</Typography>
			<Typography variant="p" className="mt-2 text-gray-500">
				El recurso que intentas editar no existe. Es posible que haya sido eliminado.
			</Typography>
			<Button
				className="mt-6"
				text="Regresar"
				onClick={() => navigate(-1)}
				buttonSize="large"
				color="gray"
				size="content"
			/>
		</DetailsBoxWrapper>
	)
}
