import { memo } from 'react'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/DropdownMenu'
import { Icon } from '@/shared/ui/icon/Icon'

interface ActionMenuProps {
	handleEdit?: () => void
	handleDelete?: () => void
}

export const ActionMenu = memo(({ handleDelete, handleEdit }: ActionMenuProps) => {
	if (!handleDelete && !handleEdit) {
		return null
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<AuxiliarButton
					variant="ghost"
					className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white data-[state=open]:bg-zinc-800"
				>
					<span className="sr-only">Open menu</span>
					<Icon name="moreVertical" className="h-4 w-4" />
				</AuxiliarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-zinc-300">
				<DropdownMenuLabel>Acciones</DropdownMenuLabel>
				{handleEdit && (
					<DropdownMenuItem
						onClick={handleEdit}
						className="cursor-pointer focus:bg-zinc-800 focus:text-white"
					>
						Editar
					</DropdownMenuItem>
				)}
				{handleEdit && handleDelete && <DropdownMenuSeparator className="bg-zinc-800" />}
				{handleDelete && (
					<DropdownMenuItem
						onClick={handleDelete}
						className="cursor-pointer text-red-500 focus:bg-red-950/50 focus:text-red-400"
					>
						Eliminar
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
})

ActionMenu.displayName = 'ActionMenu'
