import { lazy, Suspense, memo } from 'react'
import Typography from '@/shared/ui/Typography'
import { UserCardProfile } from './UserCardProfile'
import { LoadingSkeleton } from './LoadingSkeleton'
import { UserStatusEnum } from '@/entities/user/domain/value-objects/UserStatus'
import { type DefaultUsers } from '@/entities/user/infra/reducers/usersFormReducer'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { Switch } from '@/shared/ui/Switch'

const RoleCombobox = lazy(() =>
	import('@/entities/role/infra/ui/RoleComboBox').then(m => ({
		default: m.RoleCombobox
	}))
)

const STATUS_MAP: Record<UserStatusEnum | 'UNKNOWN', { label: string; className: string }> = {
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

interface UserProfileDetailsProps {
	formData: DefaultUsers
	isLoading: boolean
	handleChange: (
		name: 'employeeId' | 'name' | 'lastName' | 'email' | 'init' | 'reset' | 'roleId',
		value: any
	) => void
	handleEditToggle: () => void
	isEditing: boolean
}

export const UserProfileDetails = memo(
	({
		formData,
		isLoading,
		handleChange,
		handleEditToggle,
		isEditing
	}: UserProfileDetailsProps) => {
		const currentStatus = STATUS_MAP[formData?.status] || STATUS_MAP.UNKNOWN
		return (
			<>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Nombre y Apellido
					</Typography>
					{isLoading ? (
						<LoadingSkeleton />
					) : (
						<Typography variant="span" option="small" weight="semibold">
							{formData?.name} {formData?.lastName}
						</Typography>
					)}
				</UserCardProfile>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Usuario
					</Typography>
					{isLoading ? (
						<LoadingSkeleton />
					) : (
						<Typography variant="span" option="small" weight="semibold">
							{formData?.userName}
						</Typography>
					)}
				</UserCardProfile>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Correo electrónico
					</Typography>
					{isLoading ? (
						<LoadingSkeleton />
					) : (
						<Typography variant="span" option="small" weight="semibold">
							{formData?.email}
						</Typography>
					)}
				</UserCardProfile>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Estado
					</Typography>
					{isLoading ? (
						<LoadingSkeleton />
					) : (
						<Typography
							variant="span"
							option="small"
							weight="semibold"
							className={`inline-flex items-center rounded-md px-2.5 py-0.5 ${currentStatus.className}`}
						>
							{currentStatus.label}
						</Typography>
					)}
				</UserCardProfile>

				{/* Asignar Permisos */}
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6" className="mb-5">
						Rol
					</Typography>
					<div className="flex flex-1 items-center gap-2">
						<div className="flex-1">
							<Suspense fallback={<InputFallback />}>
								<RoleCombobox
									value={formData.roleId ?? ''}
									handleChange={(_name, value) => handleChange('roleId', value)}
									name="roleId"
									label=""
									isLoading={isLoading}
									readonly={
										!isEditing || formData.status === UserStatusEnum.SUSPENDED
									}
									required
								/>
							</Suspense>
						</div>
						{formData.status !== UserStatusEnum.SUSPENDED && (
							<div className="mb-5 flex max-w-min items-center gap-2">
								<Switch
									checked={isEditing}
									className="data-[state=checked]:bg-naranja"
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
				</UserCardProfile>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Último inicio de sesión
					</Typography>
					<Typography variant="span" option="small" weight="semibold">
						{formData?.lastLoginAt
							? formatDateTime(formData?.lastLoginAt)
							: 'Nunca ha iniciado sesión'}
					</Typography>
				</UserCardProfile>
				<UserCardProfile>
					<Typography weight="medium" color="gray-600" variant="h6">
						Ip del último acceso
					</Typography>
					<Typography variant="span" option="small" weight="semibold">
						{formData?.lastLoginIp ?? 'No registrado'}
					</Typography>
				</UserCardProfile>
			</>
		)
	}
)

UserProfileDetails.displayName = 'UserProfileDetails'
