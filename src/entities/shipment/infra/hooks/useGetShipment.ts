import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShipmentGetService } from '../service/shipmentGet.service'
import { ShipmentGetter } from '../../application/ShipmentGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ShipmentId } from '../../domain/value-object/ShipmentId'

/**
 * `useGetShipment`
 * @function
 * @description Hook personalizado para obtener una marca específica por su ID.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {{ id: Primitives<ShipmentId> }} props - Las propiedades del hook.
 * @param {Primitives<ShipmentId>} props.id - El ID de la marca a obtener.
 * @returns {object} Un objeto con el estado de la consulta (`data`, `isLoading`, `isError`).
 * @property {import('../domain/dto/Shipment.dto').ShipmentDto | undefined} data - Los datos de la marca obtenidos de la consulta.
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 */
export function useGetShipment({ id }: { id: Primitives<ShipmentId> }) {
	const repository = useMemo(() => new ShipmentGetService(), [])
	const get = useMemo(() => new ShipmentGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['shipment', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
