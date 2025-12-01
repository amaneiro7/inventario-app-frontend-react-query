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
import { cn } from '@/shared/lib/utils'

interface ActionMenuProps {
	className?: string
	handleEdit?: () => void
	handleDelete?: () => Promise<void>
}

export const ActionMenu = memo(({ handleDelete, handleEdit, className }: ActionMenuProps) => {
	if (!handleDelete && !handleEdit) {
		return null
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<AuxiliarButton
					variant="ghost"
					size="icon"
					className={cn(
						'hover:bg-azul data-[state=open]:bg-azul h-4 w-4 cursor-pointer rounded-full p-3 text-gray-500 transition-colors hover:text-white data-[state=open]:text-white',
						className
					)}
				>
					<span className="sr-only">Open menu</span>
					<Icon name="moreVertical" className="h-3 w-3" />
				</AuxiliarButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40 border-gray-200 bg-white shadow-lg">
				<DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-gray-700">
					Acciones
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="bg-gray-200" />
				{handleEdit && (
					<DropdownMenuItem
						onClick={handleEdit}
						className="flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm focus:bg-gray-100 focus:text-gray-900"
					>
						<Icon name="edit" className="h-4 w-4" />
						Editar
					</DropdownMenuItem>
				)}
				{handleDelete && (
					<>
						{handleEdit && <DropdownMenuSeparator className="bg-gray-200" />}
						<DropdownMenuItem
							onClick={handleDelete}
							className="flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm text-red-600 focus:bg-red-50 focus:text-red-700"
						>
							<Icon name="trash" className="h-4 w-4" />
							Eliminar
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
})

ActionMenu.displayName = 'ActionMenu'
