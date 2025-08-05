import { useMemo } from 'react'
import { useMediaQuery } from '@/shared/ui/icon/useMediaQuery'
import { type Headers } from '@/shared/ui/Table/TableHeader'

/**
 * `useDefaultDeviceHeader`
 * @function
 * @description Hook personalizado para definir las cabeceras de tabla por defecto para dispositivos.
 * Ajusta la visibilidad de las columnas y el `colSpan` de forma responsiva según el tamaño de la pantalla.
 * @returns {object} Un objeto con las cabeceras (`headers`), el `colSpan` calculado y las columnas visibles (`visibleColumns`).
 * @property {Headers[]} headers - Array de objetos de cabecera de tabla.
 * @property {number} colSpan - El `colSpan` calculado para las celdas de la tabla.
 * @property {string[]} visibleColumns - Array de claves de las columnas que son visibles.
 */
export function useDefaultDeviceHeader() {
	const isBreakpointSmall = useMediaQuery('(max-width: 1120px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 970px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 855px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 750px)')
	const colSpan = isBreakpointUltraTinySmall
		? 4
		: isBreakpointUltraSmall
			? 5
			: isBreakpointExtraSmall
				? 6
				: isBreakpointSmall
					? 7
					: 8
	const headers: Headers[] = useMemo(
		() => [
			{
				key: 'employeeId',
				label: 'Usuario',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'locationId',
				label: 'Ubicación',
				hasOrder: true,
				size: 'large',
				isTab: true,
				visible: !isBreakpointUltraTinySmall
			},
			{
				key: 'serial',
				label: 'Serial',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'categoryId',
				label: 'Categoria',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointExtraSmall
			},
			{
				key: 'brandId',
				label: 'Marca',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointUltraSmall
			},
			{
				key: 'modelId',
				label: 'Modelo',
				hasOrder: true,
				size: 'xLarge',
				isTab: true,
				visible: true
			},
			{
				key: 'observation',
				label: 'Observaciones',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointSmall
			},
			{
				key: 'actions',
				label: '',
				hasOrder: false,
				size: 'xxSmall',
				isTab: true,
				visible: true
			}
		],
		[
			isBreakpointSmall,
			isBreakpointExtraSmall,
			isBreakpointUltraSmall,
			isBreakpointUltraTinySmall
		]
	)

	const visibleColumns = useMemo(() => {
		return headers.filter(header => header.visible).map(h => h.key)
	}, [headers])
	return {
		colSpan,
		headers,
		visibleColumns
	}
}
