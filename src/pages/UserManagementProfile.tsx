import { lazy, Suspense, useState } from 'react'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/DropdownMenu'
import { MoreVertical, UserCircle } from 'lucide-react'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import Button from '@/shared/ui/Button'
import { UserStatusEnum } from '@/entities/user/domain/value-objects/UserStatus'
import { RoleCombobox } from '@/entities/role/infra/ui/RoleComboBox'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
// import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
// import { ManagementProfileLoading } from '@/shared/ui/Loading/ProfileLoading'
// import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
// import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
// import { DetailsInfo } from '@/shared/ui/DetailsWrapper/DetailsInfo'
// import { DescriptionListElement } from '@/shared/ui/DetailsWrapper/DescriptionListElement'
// import { DescriptionDesc } from '@/shared/ui/DetailsWrapper/DescriptionDesc'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'
// import { Skeleton } from '@/shared/ui/skeletons/Skeleton'

// import { EditUserButton } from '@/features/user-edit/ui/EditUserButton'

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
	// Añade aquí cualquier otro estado (ej: 'INACTIVE', 'PENDING', etc.)
}
const Actions_MAP = {
	update: 'Actualizar rol',
	reset: 'Restablecer contraseña',
	disabled: 'Deshabilitar usuario',
	reactivate: 'Reactivar Usuario',
	unlock: 'Desbloquear usuario'
}

// const ActionHandle = ({ action, id }: { action: keyof typeof Actions_MAP; id: string }) => {
// 	switch (action) {
// 		case 'update':
// 			return <EditUserButton id={id} />
// 		case 'reset':
// 			return <ResetPasswordButton  id={id} />
// 		case 'disabled':
// 			return <DisableUserButton id={id} />
// 		case 'reactivate':
// 			return <ReactivateUserButton id={id} />
// 		case 'unlock':
// 			return <UnlockUserButton id={id} />
// 		default:
// 			return null
// 	}
// }

// export default function ManagementProfile() {
// 	const { formData, isLoading, isNotFound, handleChange, handleActionClick } = useCreateUser()
// 	const [action, setAction] = useState<keyof typeof Actions_MAP>('update')

// 	const title = Actions_MAP[action] || Actions_MAP.update

// 	const currentStatus = STATUS_MAP[formData.status] || STATUS_MAP.UNKNOWN

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
// 					<DescriptionListElement title="Nombre y Apellido">
// 						<DescriptionDesc desc={`${formData.name} ${formData.lastName}`} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Correo">
// 						<DescriptionDesc desc={formData.email} />
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Role">
// 						<RoleCombobox
// 							value={formData.roleId}
// 							handleChange={(_name, value) => handleChange('roleId', value)}
// 							name=""
// 							required
// 						/>
// 					</DescriptionListElement>
// 					<DescriptionListElement title="Acciones">
// 						<Select
// 							value={action}
// 							onValueChange={value => setAction(value as keyof typeof Actions_MAP)}
// 						>
// 							<SelectTrigger className="w-[180px]">
// 								<SelectValue placeholder="Acciones" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectItem value="update">Editar</SelectItem>
// 								<SelectItem value="reset">Restablecer contraseña</SelectItem>
// 								<SelectItem value="disable">Deshabilitar usuario</SelectItem>
// 							</SelectContent>
// 						</Select>
// 					</DescriptionListElement>
// 					<DescriptionListElement title={title}>
// 						<Suspense fallback={<Skeleton width={180} height={32} />}>
// 							{/* <ActionHandle action={action} id={formData?.id} /> */}
// 						</Suspense>
// 					</DescriptionListElement>
// 				</DetailsInfo>
// 			</ErrorBoundary>
// 		</DetailsBoxWrapper>
// 	)
// }

export default function ManagementProfile() {
	const { formData, isLoading, isSaving, handleActionClick, handleChange, handleSubmit } =
		useCreateUser()

	const currentStatus = STATUS_MAP[formData.status] || STATUS_MAP.UNKNOWN

	return (
		<DetailsBoxWrapper position="center">
			<Card>
				<CardHeader>
					<div className="flex items-center gap-4">
						<UserCircle className="h-16 w-16 text-gray-300 dark:text-gray-600" />
						<div>
							<CardTitle className="text-xl">
								{formData.name} {formData.lastName}
							</CardTitle>
							<CardDescription>{formData.email}</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="mt-6 flex items-center gap-4">
						<h3 className="text-muted-foreground text-sm font-medium">Estado</h3>
						<span
							className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-semibold ${currentStatus.className}`}
						>
							{currentStatus.label}
						</span>
					</div>

					{/* Asignar Permisos */}
					<div className="mt-6 flex items-center justify-center gap-4">
						<h3 className="text-muted-foreground text-sm font-medium">Estado</h3>
						<RoleCombobox
							value={formData.roleId}
							handleChange={(_name, value) => handleChange('roleId', value)}
							name="roleId"
							label=""
							readonly
							required
						/>
					</div>

					{/* Botones de acción */}
					<div className="mt-6 flex gap-3 p-6">
						{formData.status !== UserStatusEnum.SUSPENDED ? (
							<Button
								color="blancoRed"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={() => handleActionClick('disable')}
								disabled={isSaving}
								text="Deshabilitar"
							/>
						) : (
							<Button
								color="blue"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={() => handleActionClick('reactivate')}
								disabled={isSaving}
								text="Reactivar"
							/>
						)}

						{formData.status === UserStatusEnum.LOCKED && (
							<Button
								color="blancoRed"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={() => handleActionClick('unlock')}
								disabled={isSaving}
								text="Desbloquear"
							/>
						)}

						{formData.status !== UserStatusEnum.SUSPENDED && (
							<Button
								color="blanco"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={() => handleActionClick('reset')}
								disabled={isSaving}
								text={isSaving ? 'Restableciendo...' : 'Restablecer contraseña'}
							/>
						)}
						{formData.status !== UserStatusEnum.SUSPENDED && (
							<Button
								color="green"
								buttonSize="medium"
								size="content"
								hoverTranslation={false}
								onClick={handleSubmit}
								disabled={isSaving}
								text={isSaving ? 'Guardando...' : 'Guardar Cambios'}
							/>
						)}
					</div>
				</CardContent>
			</Card>
		</DetailsBoxWrapper>
	)
}
