import { useQuery } from '@tanstack/react-query'
import { ModelGetAllService } from '@/entities/model/models/infra/service/modelGetAll.service'
import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

// --- Dependencias (sin cambios) ---
const repository = new ModelGetAllService()
const getAll = new ModelGetByCriteria(repository)

// --- 1. Definimos una interfaz para las props del hook ---
// Esto mejora la legibilidad y la seguridad de tipos.
interface UseGetAllModelProps {
	/**
	 * @description Los filtros y parámetros para la consulta de modelos.
	 */
	query: ModelFilters
	/**
	 * @description El intervalo en milisegundos para refetchear los datos.
	 * Si se establece en `false` o no se define, el refetch automático se deshabilita.
	 * @default false
	 */
	refetchInterval?: number | false
}

/**
 * @description Custom hook para obtener una lista de modelos.
 * @param {UseGetAllModelProps} props - Las propiedades para la consulta.
 * @returns El estado de la consulta de React Query.
 */
export const useGetAllModel = ({ query, refetchInterval }: UseGetAllModelProps) => {
	const { isLoading, refetch, isError, data } = useQuery({
		queryKey: ['models', query],
		queryFn: () => getAll.search(query),
		staleTime: 60 * 1000,
		refetchOnMount: true,
		// --- 3. Usamos la prop en lugar del valor fijo ---
		// Si refetchInterval no se pasa en las props, será `undefined`,
		// y React Query lo interpretará como "no refetchear", lo cual es un comportamiento seguro.
		refetchInterval
	})

	return {
		isLoading,
		refetch,
		isError,
		data
	}
}
