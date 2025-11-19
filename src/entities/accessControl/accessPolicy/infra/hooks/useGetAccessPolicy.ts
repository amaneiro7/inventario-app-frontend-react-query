import { useQuery } from '@tanstack/react-query'
import { AccessPolicyGetService } from '../service/accessPolicyGet.service'
import { AccessPolicyGetter } from '../../application/AccessPolicyGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../../domain/value-object/AccessPolicyId'

const get = new AccessPolicyGetter(new AccessPolicyGetService())

export function useGetAccessPolicy({ id }: { id: Primitives<AccessPolicyId> }) {
	const { data, isLoading, isError, ...results } = useQuery({
		queryKey: ['accessPolicy', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError,
		...results
	}
}
