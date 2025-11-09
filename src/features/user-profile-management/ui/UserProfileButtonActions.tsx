import { memo } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import Button from '@/shared/ui/Button'

interface UserProfileButtonActionsProps {
	isSaving: boolean
	hasChanges: boolean
	isLoading: boolean
	isEditing: boolean
	openSaveConfirmation: () => void
	handleCancel: () => void
}

export const UserProfileButtonActions = memo(
	({
		handleCancel,
		openSaveConfirmation,
		hasChanges,
		isEditing,
		isLoading,
		isSaving
	}: UserProfileButtonActionsProps) => {
		return (
			<div className="mt-8 flex justify-end gap-3 p-6">
				<Button
					color="green"
					buttonSize="medium"
					size="content"
					hoverTranslation
					type="button"
					onClick={openSaveConfirmation}
					disabled={isSaving || !hasChanges || isLoading || !isEditing}
					text={isSaving ? 'Guardando...' : 'Guardar Cambios'}
					icon={<Icon name="save" className="h-4 w-4" />}
				/>
				<Button
					color="red"
					type="button"
					buttonSize="medium"
					size="content"
					onClick={handleCancel}
					disabled={isSaving || isLoading}
					text="Cancelar"
					icon={<Icon name="xCircle" className="h-4 w-4" />}
				/>
			</div>
		)
	}
)

UserProfileButtonActions.displayName = 'UserProfileButtonActions'
