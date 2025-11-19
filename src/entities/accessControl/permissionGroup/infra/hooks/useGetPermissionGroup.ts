import { useQuery } from '@tanstack/react-query'
import { PermissionGroupGetService } from '../service/permissionGroupGet.service'
import { PermissionGroupGetter } from '../../application/PermissionGroupGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupId } from '../../domain/value-object/PermissionGroupId'

const get = new PermissionGroupGetter(new PermissionGroupGetService())

export function useGetPermissionGroup({ id }: { id: Primitives<PermissionGroupId> }) {
	const { data, isLoading, isError, ...results } = useQuery({
		queryKey: ['permissionGroup', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError,
		...results
	}
}
