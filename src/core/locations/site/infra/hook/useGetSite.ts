import { useQuery } from '@tanstack/react-query'
import { SiteGetService } from '../service/siteGet.service'
import { SiteGetter } from '../../application/SiteGetter'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SiteId } from '../../domain/value-object/SiteId'

const siteGetService = new SiteGetService()
const siteGetter = new SiteGetter(siteGetService)

export function useGetSite({ id }: { id: Primitives<SiteId> }) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['site', id],
		queryFn: () => siteGetter.execute({ id }),
		enabled: !!id,
		retry: false
	})

	return {
		data,
		isLoading,
		isError,
		error
	}
}
