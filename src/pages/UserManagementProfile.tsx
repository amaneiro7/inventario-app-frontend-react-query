import { lazy, Suspense, useState } from 'react'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'

import { Card } from '@/shared/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/DropdownMenu'
import { MoreVertical } from 'lucide-react'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import { Switch } from '@/shared/ui/Switch'
import { Input } from '@/shared/ui/Input/Input'
import { UserStatusEnum } from '@/entities/user/domain/value-objects/UserStatus'

// export default function ManagementProfile() {
// 	const { formData, isLoading, isNotFound } = useCreateUser()
// 	const [action, setAction] = useState<Actions>('editar')

// 	const title = `${
// 		action === 'editar'
// 			? 'Editar'
// 			: action === 'reset'
// 				? 'Restablecer contraseña'
// 				: action === 'delete'
// 					? 'Eliminar Usuario'
// 					: 'Seleccione'
// 	}`
// 	if (isLoading) {
// 		return (
// 			<DetailsBoxWrapper position="center">
// 				<ManagementProfileLoading />
// 			</DetailsBoxWrapper>
// 		)
// 	}

// 	if (isNotFound || !formData?.id) {
// 		return (
// 			<DetailsBoxWrapper position="center">
// 				<div className="bg-rojo-50 rounded-md p-4">
// 					<div className="flex">
// 						<div className="flex-shrink-0">
// 							<svg
// 								className="text-rojo-400 h-5 w-5"
// 								viewBox="0 0 20 20"
// 								fill="currentColor"
// 								aria-hidden="true"
// 							>
// 								<path
// 									fillRule="evenodd"
// 									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94l-1.72-1.72z"
// 									clipRule="evenodd"
// 								/>
// 							</svg>
// 						</div>
// 						<div className="ml-3">
// 							<h3 className="text-rojo-800 text-sm font-medium">
// 								Usuario no encontrado
// 							</h3>
// 							<div className="text-rojo-700 mt-2 text-sm">
// 								<p>
// 									No se pudieron cargar los detalles del usuario. Por favor,
// 									verifica la información o intenta nuevamente.
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</DetailsBoxWrapper>
// 		)
// 	}

// 	return (
// 		<DetailsBoxWrapper position="center">
// 			<ErrorBoundary
// 				fallback={({ onReset }) => (
// 					<WidgetErrorFallback
// 						onReset={onReset}
// 						message="No se pudieron mostrar los detalles de este usuario."
// 					/>
// 				)}
// 			>
// 				<DetailsInfo title="Información del usuario">
// 					<DescriptionListElement title="Nombre">
// 						<DescriptionDesc desc={formData.name} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Apellido">
// 						<DescriptionDesc desc={formData.lastName} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Correo">
// 						<DescriptionDesc desc={formData.email} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Role">
// 						<DescriptionDesc desc={formData?.role?.name ?? ''} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Acciones">
// 						<Select value={action} onValueChange={value => setAction(value as Actions)}>
// 							<SelectTrigger className="w-[180px]">
// 								<SelectValue placeholder="Acciones" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value="editar">Editar</SelectItem>
// 								<SelectItem value="reset">Restablecer contraseña</SelectItem>
// 								<SelectItem value="delete">Eliminar Usuario</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</DescriptionListElement>
// 					<DescriptionListElement title={title}>
// 						<Suspense fallback={<Skeleton width={180} height={32} />}>
// 							<ActionHandle action={action} id={formData?.id} />
// 						</Suspense>
// 					</DescriptionListElement>
// 				</DetailsInfo>
// 			</ErrorBoundary>
// 		</DetailsBoxWrapper>
// 	)
// }

export default function ManagementProfile() {
	const { formData, isLoading, handleResetPassword, handleUnlockAccount, handleDisableAccount } =
		useCreateUser()
	return (
		<div className="space-y-4">
			{/* Información del empleado */}
			<Card className="p-6">
				<div className="mb-6 flex items-start justify-between">
					<div>
						<h2 className="text-foreground text-2xl font-bold">
							{formData.name} {formData.lastName}
						</h2>
						<p className="text-muted-foreground">{formData.email}</p>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<AuxiliarButton variant="ghost" size="icon">
								<MoreVertical className="h-4 w-4" />
							</AuxiliarButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuItem onClick={() => handleResetPassword(formData?.id)}>
								Reset Password
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleUnlockAccount(formData?.id)}>
								Desbloquear
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => handleDisableAccount(formData?.id)}
								className="text-red-600"
							>
								Deshabilitar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Estado Actual */}
				<div className="bg-muted/50 mb-6 rounded-lg p-4">
					<h3 className="text-foreground mb-3 font-semibold">Estado Actual</h3>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground text-sm">Estado:</span>
							<span
								className={`text-sm font-medium ${formData.status === UserStatusEnum.ACTIVE ? 'text-green-600' : 'text-red-600'}`}
							>
								{formData.status === UserStatusEnum.ACTIVE
									? '✓ Activo'
									: '✗ Deshabilitado'}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground text-sm">Bloqueado:</span>
							<span
								className={`text-sm font-medium ${formData.status === UserStatusEnum.LOCKED ? 'text-red-600' : 'text-green-600'}`}
							>
								{formData.status === UserStatusEnum.LOCKED ? 'Sí' : 'No'}
							</span>
						</div>
					</div>
				</div>

				{/* Asignar Permisos */}
				<div className="border-border border-t pt-6">
					<h3 className="text-foreground mb-4 font-semibold">
						Asignar Permisos de Servicio
					</h3>

					<div className="space-y-4">
						{/* <div className="bg-muted/30 flex items-center justify-between rounded-lg p-4">
							<div>
								<p className="text-foreground font-medium">
									Habilitar acceso de servicio
								</p>
								<p className="text-muted-foreground text-sm">
									Permitir que este empleado acceda al sistema
								</p>
							</div>
							<Switch
								color="green"
								checked={userStatus.hasServiceRole}
								onCheckedChange={checked =>
									setUserStatus({ ...userStatus, hasServiceRole: checked })
								}
							/>
						</div> */}

						{/* {userStatus.hasServiceRole && (
							<div className="space-y-3">
								<div>
									<label className="text-foreground mb-2 block text-sm font-medium">
										Rol de Servicio
									</label>
									<Select
										value={userStatus.serviceRole}
										onValueChange={value =>
											setUserStatus({ ...userStatus, serviceRole: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="user">Usuario Estándar</SelectItem>
											<SelectItem value="admin">Administrador</SelectItem>
											<SelectItem value="moderator">Moderador</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						)} */}
					</div>
				</div>

				{/* Gestión de Contraseña */}
				{/* <div className="border-border mt-6 border-t pt-6">
					<h3 className="text-foreground mb-4 font-semibold">Gestión de Contraseña</h3>

					{!isChangingPassword ? (
						<AuxiliarButton
							variant="outline"
							onClick={() => setIsChangingPassword(true)}
							className="w-full"
						>
							Establecer Nueva Contraseña
						</AuxiliarButton>
					) : (
						<div className="space-y-3">
							<Input
								type="password"
								placeholder="Nueva contraseña"
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
							/>
							<div className="flex gap-2">
								<AuxiliarButton
									onClick={handleSetPassword}
									disabled={isSaving || !newPassword}
									className="flex-1"
								>
									Guardar
								</AuxiliarButton>
								<AuxiliarButton
									variant="outline"
									onClick={() => {
										setIsChangingPassword(false)
										setNewPassword('')
									}}
									className="flex-1"
								>
									Cancelar
								</AuxiliarButton>
							</div>
						</div>
					)}
				</div> */}

				{/* Botones de acción */}
				{/* <div className="border-border mt-6 flex gap-3 border-t pt-6">
					{userStatus.isActive ? (
						<Button
							variant="outline"
							onClick={() => handleActionClick('deshabilitar')}
							disabled={isSaving}
							className="flex-1 text-red-600 hover:text-red-700"
						>
							Deshabilitar
						</Button>
					) : (
						<Button
							variant="outline"
							onClick={() => handleActionClick('reactivar')}
							disabled={isSaving}
							className="flex-1"
						>
							Reactivar
						</Button>
					)}

					<Button
						variant="outline"
						onClick={() => handleActionClick('desbloquear')}
						disabled={isSaving || !userStatus.isBlocked}
						className="flex-1"
					>
						Desbloquear
					</Button>

					<Button onClick={handleSaveChanges} disabled={isSaving} className="flex-1">
						{isSaving ? 'Guardando...' : 'Guardar Cambios'}
					</Button>
				</div> */}
			</Card>
		</div>
	)
}
