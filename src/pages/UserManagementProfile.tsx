import { lazy, Suspense } from 'react'

import { useUserProfile } from '@/features/user-profile-management/model/useUserProfile'
import { useUserActions } from '@/features/user-profile-management/model/useUserActions'

import { Card } from '@/shared/ui/Card'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { UserProfileHeader } from '@/features/user-profile-management/ui/UserProfileHeader'
import { UserProfileActions } from '@/features/user-profile-management/ui/UserProfileActions'
import { UserProfileDetails } from '@/features/user-profile-management/ui/UserProfileDetails'
import { UserProfileButtonActions } from '@/features/user-profile-management/ui/UserProfileButtonActions'
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

export default function ManagementProfile() {
	const {
		formData,
		isLoading,
		isSaving,
		isEditing,
		hasChanges,
		saveDialogRef,
		formId,
		resetState,
		handleCancel,
		handleChange,
		handleSubmit,
		handleEditToggle,
		closeSaveConfirmation,
		openSaveConfirmation
	} = useUserProfile()

	const {
		confirmAndExecuteAction, // se encarga de ejecutar la accion
		handleConfirmAction, // se encarga de abrir el dialog
		isActionLoading, // se encarga de los estado de carga de la accion
		handleCloseAction, // Se encarga de cerrar el dialog
		modalContent, //
		actionDialogRef // Se encarga de referencia el dialog
	} = useUserActions({
		userId: formData?.id,
		onSuccess: resetState
	})

	return (
		<div>
			<DetailsBoxWrapper position="center">
				<Card className="w-xl">
					<UserProfileHeader>
						<UserProfileActions
							confirmAndExecuteAction={confirmAndExecuteAction}
							formData={formData}
							isActionLoading={isActionLoading}
							isLoading={isLoading}
						/>
					</UserProfileHeader>
					<form
						id={formId}
						method="post"
						onSubmit={handleSubmit}
						className="space-y-4 p-6 pt-0"
					>
						<UserProfileDetails
							formData={formData}
							handleChange={handleChange}
							handleEditToggle={handleEditToggle}
							isEditing={isEditing}
							isLoading={isLoading}
						/>

						{/* Botones de acción */}
						{isEditing && (
							<UserProfileButtonActions
								openSaveConfirmation={openSaveConfirmation}
								isSaving={isSaving}
								hasChanges={hasChanges}
								isLoading={isLoading}
								isEditing={isEditing}
								handleCancel={handleCancel}
							/>
						)}
					</form>
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
					<Dialog ref={actionDialogRef}>
						<ConfirmationModal
							title={modalContent.title}
							description={modalContent.description}
							onCancel={handleCloseAction}
							onConfirm={handleConfirmAction}
						/>
					</Dialog>
					<Dialog ref={saveDialogRef}>
						<ConfirmationModal
							title="Confirmar Guardado"
							formId={formId}
							description={
								<>
									¿Estás seguro de que deseas guardar los cambios en el{' '}
									{<strong>rol del usuario</strong>}?
								</>
							}
							onCancel={closeSaveConfirmation}
						/>
					</Dialog>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
