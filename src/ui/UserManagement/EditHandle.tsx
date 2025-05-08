import { LinkAsButton } from '@/components/Button/LinkAsButton'
import { EditIcon } from '@/icon/EditIcon'

export function EditHandle({ id }: { id: string }) {
	return (
		<LinkAsButton
			color="blue"
			text="Editar"
			url={`/user-management/edit/${id}`}
			buttonSize="medium"
			icon={<EditIcon width={16} className="aspect-square" />}
		/>
	)
}
