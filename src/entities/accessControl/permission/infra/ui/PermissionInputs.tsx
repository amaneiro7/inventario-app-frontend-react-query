import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type PermissionErrors,
	type Action,
	type DefaultPermission
} from '@/entities/accessControl/permission/infra/reducers/permissionFormReducer'

interface PermissionInputsProps {
	formData: DefaultPermission
	errors?: PermissionErrors
	isLoading: boolean
	handleChange: (name: Action['type'], value: string) => void
}

/**
 * `PermissionInputs`
 * @component
 * @description Componente que renderiza los campos de entrada para la entidad `Permission`.
 * Incluye el nombre de la marca y la lista de categorías asociadas.
 * @param {object} props - Las propiedades del componente.
 * @param {DefaultPermission} props.formData - Los datos del formulario de la marca.
 * @param {PermissionErrors} [props.errors] - Los errores de validación para los campos del formulario.
 * @param {(name: Action['type'], value: string) => void} props.handleChange - Función de callback para manejar los cambios en los campos de entrada.
 */
export const PermissionInputs = memo(
	({ errors, isLoading, formData, handleChange }: PermissionInputsProps) => {
		return (
			<>
				<Input
					id="permission-name"
					value={formData.name}
					name="name"
					label="Nombre del permiso"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required
				/>
				<Input
					id="permission-description"
					value={formData.description}
					name="description"
					label="Descripción del permiso"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('description', e.target.value)
					}
					error={!!errors?.description}
					errorMessage={errors?.description}
					required
				/>
			</>
		)
	}
)

PermissionInputs.displayName = 'PermissionInputs'
