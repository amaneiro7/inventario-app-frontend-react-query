import { useQuery } from '@tanstack/react-query'
import { DeviceGetter } from '../../application/DeviceGetter'
import { DeviceGetService } from '../service/deviceGet.service'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../../domain/value-object/DeviceId'

const repository = new DeviceGetService()
const get = new DeviceGetter(repository)

/**
 * `useGetDevice`
 * @function
 * @description Hook personalizado para obtener un dispositivo específico por su ID.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {object} props - Las propiedades del hook.
 * @param {Primitives<DeviceId>} props.id - El ID del dispositivo a obtener.
 * @returns {object} Un objeto con el estado de la consulta (`data`, `isLoading`, `isError`).
 * @property {import('../../domain/dto/Device.dto').DeviceDto | undefined} data - Los datos del dispositivo obtenidos de la consulta.
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 */
export function useGetDevice({ id }: { id: Primitives<DeviceId> }) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['device', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}