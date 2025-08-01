import { memo } from 'react'
import { RightArrowIcon } from '@/shared/ui/icon/RightArrowIcon'
import { StepsText } from './StepsTexto'
import { CancelIcon } from '@/shared/ui/icon/CancelIcon'
import { ResetIcon } from '@/shared/ui/icon/ResetIcon'

export const RegisterNewDeviceToFollow = memo(({ isEdit = true }: { isEdit: boolean }) => {
	return (
		<>
			<StepsText
				requisito="obligatorio"
				text="Ingrese la informacón solicitada, si es correcto, oprima "
				iconText="Guardar"
				icon={<RightArrowIcon width={16} className="fill-white" />}
				backgroundColor="verde"
			/>
			<StepsText
				requisito="opcional"
				text="Si desea abortar la operación, oprima "
				iconText="Regresar"
				icon={<CancelIcon width={16} />}
				backgroundColor="gris"
			/>
			{isEdit ? (
				<StepsText
					requisito="opcional"
					text="Si desea restaurar los cambios sin guardar, oprima "
					iconText="Reset"
					icon={<ResetIcon width={16} />}
					backgroundColor="azul"
				/>
			) : null}
		</>
	)
})

RegisterNewDeviceToFollow.displayName = 'RegisterNewDeviceToFollow'
