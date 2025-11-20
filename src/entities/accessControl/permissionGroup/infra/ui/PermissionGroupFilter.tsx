import { lazy, memo, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'

const PermissionCombobox = lazy(() =>
	import('@/entities/accessControl/permission/infra/ui/PermissionComboBox').then(m => ({
		default: m.PermissionCombobox
	}))
)

interface PermissionGroupFilterProps {
	name?: string
	description?: string
	permissionId?: string
	handleChange: (name: string, value: string | number) => void
}

export const PermissionGroupFilter = memo(
	({ handleChange, name, description, permissionId }: PermissionGroupFilterProps) => {
		const [localNameDate, setLocalNameDate] = useState(name ?? '')
		const [localDescriptionDate, setLocalDescriptionDate] = useState(description ?? '')

		useEffectAfterMount(() => {
			handleChange('name', localNameDate)
		}, [localNameDate])
		useEffectAfterMount(() => {
			handleChange('priority', localDescriptionDate)
		}, [localDescriptionDate])

		useEffectAfterMount(() => {
			if (!name) {
				setLocalNameDate('')
			}
		}, [name])
		useEffectAfterMount(() => {
			if (!description) {
				setLocalDescriptionDate('')
			}
		}, [description])

		return (
			<>
				<Input
					id="permissiom-name-search"
					value={localNameDate}
					label="Nombre"
					name="name"
					type="search"
					transform
					placeholder="Buscar por nombre"
					onChange={e => setLocalNameDate(e.target.value)}
				/>
				<Input
					id="permissionGroup-description-search"
					value={localDescriptionDate}
					label="Descripción"
					name="description"
					type="search"
					transform
					placeholder="Buscar por descripción"
					onChange={e => setLocalDescriptionDate(e.target.value)}
				/>
				<PermissionCombobox
					value={permissionId ?? ''}
					handleChange={(_name, value) => handleChange('permissionId', value)}
					name="permissionId"
				/>
			</>
		)
	}
)

PermissionGroupFilter.displayName = 'PermissionGroupFilter'
