import { lazy, memo } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'

const StepsText = lazy(() => import('./StepsTexto').then(m => ({ default: m.StepsText })))

export const ChangePasswordProfileStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="Paso 1"
				text="En esta sección puedes visualizar tu información personal, de contacto y laboral."
				icon={<Icon name="user" className="h-4 w-4" />}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="Paso 2"
				text="También puedes consultar detalles de tu cuenta, como tu rol en el sistema y la fecha de tu último acceso."
				icon={<Icon name="shieldCheck" className="h-4 w-4" />}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="Paso 3"
				text="Utiliza el formulario para actualizar tu contraseña de acceso cuando lo necesites, siguiendo las indicaciones de seguridad."
				icon={<Icon name="keyRound" className="h-4 w-4" />}
				backgroundColor="verde"
			/>
		</>
	)
})
