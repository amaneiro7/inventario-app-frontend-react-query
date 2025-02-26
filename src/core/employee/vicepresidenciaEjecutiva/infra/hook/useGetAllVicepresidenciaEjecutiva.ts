import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { type VicepresidenciaEjecutivaFilters } from '../../application/createVicepresidenciaEjecutivaQueryParams'
import { VicepresidenciaEjecutivaGetAllService } from '../service/vicepresidenciaEjecutivaGetAll.service'
import { VicepresidenciaEjecutivaGetByCriteria } from '../../application/VicepresidenciaEjecutivaGetByCriteria'

export const useGetAllVicepresidenciaEjecutivas = (query: VicepresidenciaEjecutivaFilters) => {
	const repository = useMemo(() => new VicepresidenciaEjecutivaGetAllService(), [])
	const getAll = useMemo(
		() => new VicepresidenciaEjecutivaGetByCriteria(repository),
		[repository]
	)

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
