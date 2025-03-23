import { memo } from 'react'
import { StepsText } from './StepsTexto'
import { RightArrowIcon } from '@/icon/RightArrowIcon'
import { CancelIcon } from '@/icon/CancelIcon'

export const ChangePasswordStepsToFollow = memo(() => {
	return (
		<>
			<StepsText
				requisito="obligatorio"
				text="Ingrese su Clave Actual, su Nueva Clave y una Confirmación de la misma, si es correcto, oprima "
				iconText="Continuar"
				icon={<RightArrowIcon width={16} className="fill-white" />}
				backgroundColor="verde"
			/>
			<StepsText
				requisito="opcional"
				text="Si desea abortar la operación, oprima "
				iconText="Reset"
				icon={<CancelIcon width={16} />}
				backgroundColor="gris"
			/>
		</>
	)
})
