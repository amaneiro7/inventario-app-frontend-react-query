import { memo } from 'react'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'
import { EditIcon } from '@/shared/ui/icon/EditIcon'

export const EditUserButton = memo(({ id }: { id: string }) => {
	return (
		<LinkAsButton
			color="blue"
			text="Editar"
			to={`/user-management/edit/${id}`}
			buttonSize="medium"
			icon={<EditIcon width={16} className="aspect-square" />}
		/>
	)
})
EditUserButton.displayName = 'EditUserButton'
