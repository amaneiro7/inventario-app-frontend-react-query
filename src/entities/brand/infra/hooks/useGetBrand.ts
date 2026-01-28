import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BrandGetService } from '../service/brandGet.service'
import { BrandGetter } from '../../application/BrandGetter'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandId } from '../../domain/value-object/BrandId'

/**
 * `useGetBrand`
 * @function
 * @description Hook personalizado para obtener una marca específica por su ID.
 * Utiliza `react-query` para la gestión de la caché y el estado de la petición.
 * @param {{ id: Primitives<BrandId> }} props - Las propiedades del hook.
 * @param {Primitives<BrandId>} props.id - El ID de la marca a obtener.
 * @returns {object} Un objeto con el estado de la consulta (`data`, `isLoading`, `isError`).
 * @property {import('../domain/dto/Brand.dto').BrandDto | undefined} data - Los datos de la marca obtenidos de la consulta.
 * @property {boolean} isLoading - Indica si la consulta está en curso.
 * @property {boolean} isError - Indica si la consulta ha resultado en un error.
 */
export function useGetBrand({ id }: { id: Primitives<BrandId> }) {
	const repository = useMemo(() => new BrandGetService(), [])
	const get = useMemo(() => new BrandGetter(repository), [repository])
	const { data, isLoading, isError } = useQuery({
		queryKey: ['brand', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError
	}
}
