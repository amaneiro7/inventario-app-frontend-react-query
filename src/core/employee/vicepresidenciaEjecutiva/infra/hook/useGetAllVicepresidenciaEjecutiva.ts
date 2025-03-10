import { useQuery } from '@tanstack/react-query'
import { type VicepresidenciaEjecutivaFilters } from '../../application/createVicepresidenciaEjecutivaQueryParams'
import { VicepresidenciaEjecutivaGetAllService } from '../service/vicepresidenciaEjecutivaGetAll.service'
import { VicepresidenciaEjecutivaGetByCriteria } from '../../application/VicepresidenciaEjecutivaGetByCriteria'

const repository = new VicepresidenciaEjecutivaGetAllService()
const getAll = new VicepresidenciaEjecutivaGetByCriteria(repository)

export const useGetAllVicepresidenciaEjecutivas = (query: VicepresidenciaEjecutivaFilters) => {
	const {
		isLoading,
		refetch,
		isError,
		data: vicepresidenciaEjecutivas
	} = useQuery({
		queryKey: ['vicepresidenciaEjecutivas', query],
		queryFn: () => getAll.search(query),
		staleTime: Infinity
	})

	return {
		isLoading,
		refetch,
		isError,
		vicepresidenciaEjecutivas
	}
}
