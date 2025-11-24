import { useCallback, useMemo, useState } from 'react'
import { useGetAllPermissions } from '@/entities/accessControl/permission/infra/hooks/useGetAllPermission'
import { type PermissionDto } from '@/entities/accessControl/permission/domain/dto/Permission.dto'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { groupBy } from '@/shared/lib/utils/groupBy'

interface UsePermissionTransferListProps {
	permissions: PermissionDto['id'][]
	onAddPermission: (name: 'addPermission', value: string) => void
	onRemovePermission: (name: 'removePermission', value: string) => void
}

export const usePermissionTransferList = ({
	permissions,
	onAddPermission,
	onRemovePermission
}: UsePermissionTransferListProps) => {
	const [inputValue, setInputValue] = useState('')
	const { data: allPermissions, isLoading: loading } = useGetAllPermissions({})

	const availableOptions = useMemo(
		() =>
			allPermissions?.data?.filter(Permission => !permissions.includes(Permission.id)) ?? [],
		[allPermissions, permissions]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddPermission = useCallback(
		(permissionId: string) => {
			onAddPermission('addPermission', permissionId)
		},
		[onAddPermission]
	)

	const handleRemovePermission = useCallback(
		(permissionId: string) => {
			onRemovePermission('removePermission', permissionId)
		},
		[onRemovePermission]
	)

	const groupedPermissions = useMemo(() => {
		if (!allPermissions?.data || permissions.length === 0) {
			return {}
		}

		const getGroupName = (perissionName: string): string => {
			const parts = perissionName.split(':')
			if (parts.length > 1) {
				return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
			}
			return 'Sin Grupo'
		}
		const selectedPermissions = allPermissions.data.filter(permission =>
			permissions.includes(permission.id)
		)
		return groupBy(selectedPermissions, permission => getGroupName(permission.name))
	}, [allPermissions?.data, permissions])

	return {
		loading,
		inputValue,
		filteredOptions,
		allPermissions,
		groupedPermissions,
		setInputValue,
		handleAddPermission,
		handleRemovePermission
	}
}
