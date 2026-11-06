import { memo } from 'react'
import { AlertCircle } from 'lucide-react'
import Typography from '@/shared/ui/Typography'

interface EmployeeSignatureErrorAlertProps {
	message: string
}

export const EmployeeSignatureErrorAlert = memo(({ message }: EmployeeSignatureErrorAlertProps) => {
	if (!message) return null

	return (
		<div
			role="alert"
			aria-live="assertive"
			className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 shadow-xs transition-all duration-200 md:max-w-lg"
		>
			<AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
			<div className="flex-1">
				<Typography variant="span" weight="semibold" className="block text-xs text-red-900">
					No se pudo encontrar el empleado
				</Typography>
				<Typography variant="p" option="small" className="text-xs text-red-700">
					{message}
				</Typography>
			</div>
		</div>
	)
})

EmployeeSignatureErrorAlert.displayName = 'EmployeeSignatureErrorAlert'
