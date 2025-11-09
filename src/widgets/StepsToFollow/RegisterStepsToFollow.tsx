import { memo } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import { StepsText } from './StepsTexto'

export const RegisterStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="Paso 1"
				text="Busque y seleccione un empleado de la lista desplegable para asociarlo al nuevo usuario."
				icon={<Icon name="search" className="h-4 w-4" />}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="Paso 2"
				text="Una vez seleccionado el empleado, asigne un rol de servicio de la lista de roles disponibles."
				icon={<Icon name="userCog" className="h-4 w-4" />}
				backgroundColor="azul"
			/>
			<StepsText
				requisito="Paso 3"
				text="Con el empleado y el rol asignados, presione el botón 'Crear Usuario' para finalizar el registro."
				icon={<Icon name="userPlus" className="h-4 w-4" />}
				backgroundColor="verde"
			/>
		</>
	)
})
