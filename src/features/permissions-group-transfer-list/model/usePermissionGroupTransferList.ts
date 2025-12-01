import { useCallback, useMemo, useState } from 'react'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { PermissionGroupDto } from '@/entities/accessControl/permissionGroup/domain/dto/PermissionGroup.dto'
import { useGetAllPermissionGroups } from '@/entities/accessControl/permissionGroup/infra/hooks/useGetAllPermissionGroup'

interface UsePermissionsGroupsTransferListProps {
	permissionsGroups: PermissionGroupDto['id'][]
	onAddPermissionGroup: (name: 'addPermissionGroup', value: string) => void
	onRemovePermissionGroup: (name: 'removePermissionGroup', value: string) => void
}

export const usePermissionsGroupsTransferList = ({
	permissionsGroups,
	onAddPermissionGroup,
	onRemovePermissionGroup
}: UsePermissionsGroupsTransferListProps) => {
	const [inputValue, setInputValue] = useState('')
	const { data: allPermissionsGroups, isLoading: loading } = useGetAllPermissionGroups({})

	const availableOptions = useMemo(
		() =>
			allPermissionsGroups?.data?.filter(
				PermissionsGroups => !permissionsGroups.includes(PermissionsGroups.id)
			) ?? [],
		[allPermissionsGroups, permissionsGroups]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddPermissionsGroups = useCallback(
		(permissionsGroupsId: string) => {
			onAddPermissionGroup('addPermissionGroup', permissionsGroupsId)
		},
		[onAddPermissionGroup]
	)

	const handleRemovePermissionsGroups = useCallback(
		(permissionsGroupsId: string) => {
			onRemovePermissionGroup('removePermissionGroup', permissionsGroupsId)
		},
		[onRemovePermissionGroup]
	)

	return {
		loading,
		inputValue,
		filteredOptions,
		allPermissionsGroups,
		setInputValue,
		handleAddPermissionsGroups,
		handleRemovePermissionsGroups
	}
}
