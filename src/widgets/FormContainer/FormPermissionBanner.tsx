import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'
import { Icon } from '@/shared/ui/icon/Icon'
import { memo } from 'react'

export const FormPermissionBanner = memo(({ readOnlyMessage }: { readOnlyMessage?: string }) => {
	return (
		<Alert className="border-amber-500/50 bg-amber-500/10">
			<Icon name="alertCircle" className="h-4 w-4 text-amber-500" />
			<AlertTitle>Solo Lectura</AlertTitle>
			<AlertDescription>
				{readOnlyMessage ||
					'Tienes acceso para ver la información de este recurso, pero no puedes realizar cambios. Los campos están deshabilitados. Si necesitas hacer cambios, contacta a un administrador.'}
			</AlertDescription>
		</Alert>
	)
})

FormPermissionBanner.displayName = 'FormPermissionBanner'
