import { useMemo } from 'react'
import { useMediaQuery } from '@/icon/useMediaQuery'
import { type Headers } from '@/components/Table/TableHeader'

export function useTableDeviceWrapper() {
	const isBreakpointLarg = useMediaQuery('(max-width: 1380px)')
	const isBreakpointMedium = useMediaQuery('(max-width: 1240px)')
	const isBreakpointSmall = useMediaQuery('(max-width: 1120px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 1010px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 855px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 650px)')

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
				key: 'ipAddress',
				label: 'Dirección IP',
				hasOrder: true,
				size: 'small',
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
				visible: !isBreakpointMedium
			},
			{
				key: 'brandId',
				label: 'Marca',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointSmall
			},
			{
				key: 'modelId',
				label: 'Modelo',
				hasOrder: true,
				size: 'xLarge',
				isTab: true,
				visible: !isBreakpointUltraSmall
			},
			{
				key: 'computerName',
				label: 'Nombre de Equipo',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointExtraSmall
			},
			{
				key: 'observation',
				label: 'Observaciones',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: !isBreakpointLarg
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
			isBreakpointLarg,
			isBreakpointMedium,
			isBreakpointSmall,
			isBreakpointExtraSmall,
			isBreakpointUltraSmall,
			isBreakpointUltraTinySmall
		]
	)
	const colSpan = isBreakpointUltraTinySmall
		? 4
		: isBreakpointUltraSmall
		? 5
		: isBreakpointExtraSmall
		? 6
		: isBreakpointSmall
		? 7
		: isBreakpointMedium
		? 8
		: isBreakpointLarg
		? 9
		: 10 // Ajusta el colSpan dinámicamente

	const visibleColumns = useMemo(() => {
		return headers.filter(header => header.visible).map(h => h.key)
	}, [headers])
	return {
		headers,
		colSpan,
		visibleColumns
	}
}
