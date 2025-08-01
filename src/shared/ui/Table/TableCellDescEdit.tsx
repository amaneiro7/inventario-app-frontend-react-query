import { lazy } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

const EditIcon = lazy(async () =>
	import('@/shared/ui/icon/EditIcon').then(m => ({ default: m.EditIcon }))
)

interface Props {
	state: LinkProps['state']
	url: string
	stateId?: string
}

export function TableCellDescEdit({ state, url, stateId }: Props) {
	return (
		<p className="text-azul flex w-min flex-row items-center justify-center gap-1 align-middle text-xs">
			<span className="font-extrabold">Editar:</span>
			<Link
				to={url}
				state={{ state }}
				className="h-full w-full"
				aria-label="icono de edición"
				aria-description="enlace para editar el elemento"
				title={`Editar el elemento con el id ${stateId ?? url}`}
			>
				<EditIcon className="bg-verde ml-2 aspect-square w-6 rounded p-1 text-white" />
			</Link>
		</p>
	)
}
