import { useQuery } from '@tanstack/react-query'
import { ISPLinkGetService } from '../service/ispLinkGet.service'
import { ISPLinkGetter } from '../../application/ISPLinkGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ISPLinkId } from '../../domain/value-object/ISPLinkId'

const repository = new ISPLinkGetService()
const get = new ISPLinkGetter(repository)

export function useGetISPLink({ id }: { id: Primitives<ISPLinkId> }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['isp-link', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
