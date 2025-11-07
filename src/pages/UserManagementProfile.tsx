import { cn } from '@/shared/lib/utils'
import { UserStatusEnum } from '@/entities/user/domain/value-objects/UserStatus'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem
} from '@/shared/ui/DropdownMenu'
import Button from '@/shared/ui/Button'
import { RoleCombobox } from '@/entities/role/infra/ui/RoleComboBox'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { Switch } from '@/shared/ui/Switch'

const STATUS_MAP = {
	[UserStatusEnum.ACTIVE]: {
		label: 'Activo',
		className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
	},
	[UserStatusEnum.LOCKED]: {
		label: 'Bloqueado',
		className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
	},
	[UserStatusEnum.SUSPENDED]: {
		label: 'Suspendido',
		className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
	},
	UNKNOWN: {
		label: 'Desconocido',
		className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
	}
}

export default function ManagementProfile() {
	const {
		formData,
		isLoading,
		isSaving,
		isEditing,
		handleCancel,
		handleActionClick,
		handleChange,
		handleSubmit,
		handleEditToggle
	} = useCreateUser()

	const currentStatus = STATUS_MAP[formData.status] || STATUS_MAP.UNKNOWN

	return (
		<DetailsBoxWrapper position="center">
			<Card>
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-4">
							<Icon
								name="userCircle"
								className="h-16 w-16 text-gray-300 dark:text-gray-600"
							/>
							<div>
								<CardTitle className="text-xl">Perfil del Usuario</CardTitle>
								<CardDescription>
									Visualiza y edita los detalles de la cuenta.
								</CardDescription>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<AuxiliarButton variant="ghost" size="icon">
									<Icon name="moreVertical" className="h-4 w-4" />
								</AuxiliarButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem
									className="hover:bg-accent"
									onClick={() => handleActionClick('reset')}
									disabled={
										isSaving || formData.status === UserStatusEnum.SUSPENDED
									}
								>
									Restablecer contraseña
								</DropdownMenuItem>
								{formData.status === UserStatusEnum.LOCKED && (
									<DropdownMenuItem
										className="hover:bg-accent"
										onClick={() => handleActionClick('unlock')}
										disabled={isSaving}
									>
										Desbloquear
									</DropdownMenuItem>
								)}
								<DropdownMenuSeparator />

								{formData.status !== UserStatusEnum.SUSPENDED ? (
									<DropdownMenuItem
										onClick={() => handleActionClick('disable')}
										className="text-rojo-600 hover:text-rojo-700 hover:bg-accent"
										disabled={isSaving}
									>
										Deshabilitar
									</DropdownMenuItem>
								) : (
									<DropdownMenuItem
										onClick={() => handleActionClick('reactivate')}
										className="text-azul-600 hover:text-azul-700 hover:bg-accent"
										disabled={isSaving}
									>
										Reactivar
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Nombre y Apellido
						</Typography>
						<Typography variant="span" option="small" weight="semibold">
							{formData?.name} {formData?.lastName}
						</Typography>
					</CardUserProfile>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Usuario
						</Typography>
						<Typography variant="span" option="small" weight="semibold">
							{formData?.userName}
						</Typography>
					</CardUserProfile>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Correo electrónico
						</Typography>
						<Typography variant="span" option="small" weight="semibold">
							{formData?.email}
						</Typography>
					</CardUserProfile>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Estado
						</Typography>
						<Typography
							variant="span"
							option="small"
							weight="semibold"
							className={`inline-flex items-center rounded-md px-2.5 py-0.5 ${currentStatus.className}`}
						>
							{currentStatus.label}
						</Typography>
					</CardUserProfile>

					{/* Asignar Permisos */}
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6" className="mb-5">
							Rol
						</Typography>
						<div className="flex items-center gap-2">
							<RoleCombobox
								value={formData.roleId}
								handleChange={(_name, value) => handleChange('roleId', value)}
								name="roleId"
								label=""
								readonly={
									!isEditing || formData.status === UserStatusEnum.SUSPENDED
								}
								required
							/>
							{formData.status !== UserStatusEnum.SUSPENDED && !isEditing && (
								<div className="mb-5 flex items-center gap-2">
									<Switch
										checked={isEditing}
										onCheckedChange={handleEditToggle}
									/>
									<Typography
										variant="span"
										color="gray-600"
										option="small"
										weight="semibold"
									>
										Habilitar Edición
									</Typography>
								</div>
							)}
						</div>
					</CardUserProfile>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Último inicio de sesión
						</Typography>
						<Typography variant="span" option="small" weight="semibold">
							{formData?.lastLoginAt}
						</Typography>
					</CardUserProfile>
					<CardUserProfile>
						<Typography weight="medium" color="gray-600" variant="h6">
							Última dirección IP de inicio de sesión
						</Typography>
						<Typography variant="span" option="small" weight="semibold">
							{formData?.lastLoginIp}
						</Typography>
					</CardUserProfile>

					{/* Botones de acción */}
					{isEditing && (
						<div className="mt-8 flex justify-end gap-3 p-6">
							<Button
								color="green"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={handleSubmit}
								disabled={isSaving || isLoading}
								text={isSaving ? 'Guardando...' : 'Guardar Cambios'}
								icon={<Icon name="save" className="h-4 w-4" />}
							/>
							<Button
								color="red"
								buttonSize="medium"
								size="content"
								onClick={handleCancel}
								disabled={isSaving || isLoading}
								text="Cancelar"
								icon={<Icon name="xCircle" className="h-4 w-4" />}
							/>
						</div>
					)}
				</CardContent>
			</Card>
		</DetailsBoxWrapper>
	)
}

export const CardUserProfile = ({
	children,
	className,
	...props
}: React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => (
	<div className={cn('mt-6 flex items-center gap-4', className)} {...props}>
		{children}
	</div>
)
