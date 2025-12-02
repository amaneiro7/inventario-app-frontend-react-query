import { useQuery } from '@tanstack/react-query'
import { SiteGetService } from '../service/siteGet.service'
import { SiteGetter } from '../../application/SiteGetter'
import { type AxiosError } from 'axios'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type SiteId } from '../../domain/value-object/SiteId'

const siteGetService = new SiteGetService()
const siteGetter = new SiteGetter(siteGetService)

export function useGetSite({ id }: { id: Primitives<SiteId> }) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['site', id],
		queryFn: () => siteGetter.execute({ id }),
		enabled: !!id,
		retry: (failureCount, error: AxiosError) => {
			// No reintentar si es un error 404
			if (error.response?.status === 404) {
				return false
			}
			// No reintentar si es un error 401 (el interceptor ya lo maneja, pero un reintento de RQ no haría daño)
			// O si el interceptor falla, permitir que RQ lo intente de nuevo.
			if (error.response?.status === 401) {
				return failureCount < 2 // Intentar solo una vez más, por ejemplo
			}
			// Para otros errores, usar el comportamiento por defecto (hasta 3 reintentos)
			return failureCount < 3
		}
	})

	return {
		data,
		isLoading,
		isError,
		error
	}
}
