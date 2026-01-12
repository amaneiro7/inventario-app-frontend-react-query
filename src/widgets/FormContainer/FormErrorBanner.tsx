import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'
import { Icon } from '@/shared/ui/icon/Icon'
import { memo } from 'react'

export const FormErrorBanner = memo(({ message }: { message?: string | null }) => {
	if (!message) return null
	return (
		<Alert className="border-red-500/50 bg-red-500/10">
			<Icon name="alertCircle" className="h-4 w-4 text-red-500" />
			<AlertTitle className="text-red-900">Error</AlertTitle>
			<AlertDescription className="text-red-800">{message}</AlertDescription>
		</Alert>
	)
})

FormErrorBanner.displayName = 'FormErrorBanner'
