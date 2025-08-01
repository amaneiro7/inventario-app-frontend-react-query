import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'
import { EditIcon } from '@/shared/ui/icon/EditIcon'

export function EditHandle({ id }: { id: string }) {
	return (
		<LinkAsButton
			color="blue"
			text="Editar"
			to={`/user-management/edit/${id}`}
			buttonSize="medium"
			icon={<EditIcon width={16} className="aspect-square" />}
		/>
	)
}
