import { useQuery } from '@tanstack/react-query'
import { type VicepresidenciaFilters } from '../../application/createVicepresidenciaQueryParams'
import { VicepresidenciaGetAllService } from '../service/vicepresidenciaGetAll.service'
import { VicepresidenciaGetByCriteria } from '../../application/VicepresidenciaGetByCriteria'

const repository = new VicepresidenciaGetAllService()
const getAll = new VicepresidenciaGetByCriteria(repository)

export const useGetAllVicepresidencias = (query: VicepresidenciaFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: vicepresidencias
	} = useQuery({
		queryKey: ['vicepresidencias', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		vicepresidencias
	}
}
