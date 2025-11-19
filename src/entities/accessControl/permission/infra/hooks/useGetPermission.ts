import { useQuery } from '@tanstack/react-query'
import { PermissionGetService } from '../service/permissionGet.service'
import { PermissionGetter } from '../../application/PermissionGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../../domain/value-object/PermissionId'

const get = new PermissionGetter(new PermissionGetService())

export function useGetPermission({ id }: { id: Primitives<PermissionId> }) {
	const { data, isLoading, isError, ...results } = useQuery({
		queryKey: ['permission', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError,
		...results
	}
}
