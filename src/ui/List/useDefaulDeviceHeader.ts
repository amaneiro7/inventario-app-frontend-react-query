import { useMemo } from 'react'
import { type Headers } from '@/components/Table/TableHeader'
import { useMediaQuery } from '@/icon/useMediaQuery'

export function useDefaulDeviceHeader() {
	const isBreakpointSmall = useMediaQuery('(max-width: 1120px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 970px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 855px)')
	const colSpan = isBreakpointUltraSmall
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
				visible: true
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
		[isBreakpointSmall, isBreakpointExtraSmall, isBreakpointUltraSmall]
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
