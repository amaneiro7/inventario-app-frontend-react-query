import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type PermissionGroupErrors,
	type Action,
	type DefaultPermissionGroup
} from '@/entities/accessControl/permissionGroup/infra/reducers/permissionGroupFormReducer'

const PermissionTransferList = lazy(() =>
	import('@/entities/accessControl/permission/infra/ui/PermissionTransferList').then(m => ({
		default: m.PermissionTransferList
	}))
)

interface PermissionGroupInputsProps {
	formData: DefaultPermissionGroup
	errors?: PermissionGroupErrors
	isLoading: boolean
	handleChange: (name: Action['type'], value: string) => void
}

/**
 * `PermissionGroupInputs`
 * @component
 * @description Componente que renderiza los campos de entrada para la entidad `PermissionGroup`.
 * Incluye el nombre de la marca y la lista de categorías asociadas.
 * @param {object} props - Las propiedades del componente.
 * @param {DefaultPermissionGroup} props.formData - Los datos del formulario de la marca.
 * @param {PermissionGroupErrors} [props.errors] - Los errores de validación para los campos del formulario.
 * @param {(name: Action['type'], value: string) => void} props.handleChange - Función de callback para manejar los cambios en los campos de entrada.
 */
export const PermissionGroupInputs = memo(
	({ errors, isLoading, formData, handleChange }: PermissionGroupInputsProps) => {
		return (
			<>
				<Input
					id="permission-group-name"
					value={formData.name}
					name="name"
					label="Nombre del grupo de permisos"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required
				/>
				<Input
					id="permission-group-description"
					value={formData.description}
					name="description"
					label="Descripción del grupo de permisos"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('description', e.target.value)
					}
					error={!!errors?.description}
					errorMessage={errors?.description}
					required
				/>
				<PermissionTransferList
					isLoading={isLoading}
					value={formData.permissions}
					name="permissions"
					onAddPermission={handleChange}
					onRemovePermission={handleChange}
				/>
			</>
		)
	}
)

PermissionGroupInputs.displayName = 'PermissionGroupInputs'
