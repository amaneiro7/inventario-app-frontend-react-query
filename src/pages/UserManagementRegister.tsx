import { lazy, Suspense } from 'react'
import { useCreateUserForm } from '@/features/user-register-management/model/useCreateUserForm'
import { Card } from '@/shared/ui/Card'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { UserRegisterHeader } from '@/features/user-register-management/ui/UserRegisterHeader'
import { UserRegisterForm } from '@/features/user-register-management/ui/UserRegisterForm'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const Dialog = lazy(() =>
	import('@/shared/ui/Modal/Modal').then(m => ({
		default: m.Dialog
	}))
)
const ConfirmationModal = lazy(() =>
	import('@/shared/ui/Modal/ConfirmationModal').then(m => ({
		default: m.ConfirmationModal
	}))
)

export default function UserManagementRegister() {
	const {
		formData,
		isSaving,
		formId,
		createDialogRef,
		handleChange,
		handleSubmit,
		closeCreateConfirmation,
		openCreateConfirmation
	} = useCreateUserForm()
	return (
		<div>
			<DetailsBoxWrapper position="center">
				<Card className="w-xl">
					<UserRegisterHeader />
					<UserRegisterForm
						formData={formData}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						formId={formId}
						isSaving={isSaving}
						openCreateConfirmation={openCreateConfirmation}
					/>
				</Card>
			</DetailsBoxWrapper>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="No se pudo abrir el diálogo de confirmación."
						onReset={onReset}
					/>
				)}
			>
				<Suspense fallback={null}>
					<Dialog ref={createDialogRef}>
						<ConfirmationModal
							title="Confirmar Creación"
							formId={formId}
							description="¿Estás seguro de que deseas crear este nuevo usuario con el empleado y rol seleccionados?"
							onCancel={closeCreateConfirmation}
						/>
					</Dialog>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
