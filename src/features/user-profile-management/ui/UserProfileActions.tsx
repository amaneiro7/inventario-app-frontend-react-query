import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem
} from '@/shared/ui/DropdownMenu'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import { UserStatusEnum } from '@/entities/user/domain/value-objects/UserStatus'
import { Icon } from '@/shared/ui/icon/Icon'
import { type DefaultUsers } from '@/entities/user/infra/reducers/usersFormReducer'
import { type ActionType } from '../model/ActionType'
import { memo } from 'react'

interface UserProfileActionsProps {
	formData: DefaultUsers
	isLoading: boolean
	confirmAndExecuteAction: (action: ActionType) => void
	isActionLoading: (action: ActionType) => boolean
}

export const UserProfileActions = memo(
	({
		isLoading,
		formData,
		confirmAndExecuteAction,
		isActionLoading
	}: UserProfileActionsProps) => {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<AuxiliarButton
						className="cursor-pointer rounded-full"
						variant="ghost"
						size="icon"
						disabled={isLoading}
					>
						<Icon name="moreVertical" className="h-4 w-4" />
					</AuxiliarButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					<DropdownMenuItem
						className="hover:bg-accent"
						onClick={() => confirmAndExecuteAction('reset')}
						disabled={
							isLoading ||
							isActionLoading('reset') ||
							formData.status === UserStatusEnum.SUSPENDED
						}
					>
						Restablecer contraseña
					</DropdownMenuItem>
					{formData.status === UserStatusEnum.LOCKED && (
						<DropdownMenuItem
							className="hover:bg-accent"
							onClick={() => confirmAndExecuteAction('unlock')}
							disabled={isLoading || isActionLoading('unlock')}
						>
							Desbloquear
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />

					{formData.status !== UserStatusEnum.SUSPENDED ? (
						<DropdownMenuItem
							onClick={() => confirmAndExecuteAction('disable')}
							className="text-rojo-600 hover:text-rojo-700 hover:bg-accent"
							disabled={isLoading || isActionLoading('disable')}
						>
							Deshabilitar
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem
							onClick={() => confirmAndExecuteAction('reactivate')}
							className="text-azul-600 hover:text-azul-700 hover:bg-accent"
							disabled={isLoading || isActionLoading('reactivate')}
						>
							Reactivar
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}
)

UserProfileActions.displayName = 'UserProfileActions'
