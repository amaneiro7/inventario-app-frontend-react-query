import { useMemo } from 'react'
import { useMediaQuery } from '@/icon/useMediaQuery'
import { type Headers } from '@/components/Table/TableHeader'

export function useTableDeviceMonitoringWrapper() {
	const isBreakpointLarg = useMediaQuery('(max-width: 1380px)')
	const isBreakpointMedium = useMediaQuery('(max-width: 1240px)')
	const isBreakpointSmall = useMediaQuery('(max-width: 1120px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 1010px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 855px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 650px)')

	const headers: Headers[] = useMemo(
		() => [
			{
				key: 'status',
				label: 'Estado',
				hasOrder: false,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'computerName',
				label: 'Nombre de Equipo',
				hasOrder: true,
				size: 'large',
				isTab: true,
				visible: true
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
				key: 'location',
				label: 'Ubicación',
				hasOrder: false,
				size: 'xLarge',
				isTab: true,
				visible: true
			},
			{
				key: 'lastSuccess',
				label: 'Última Conexión',
				hasOrder: false,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'lastFailed',
				label: 'Última Desconexión',
				hasOrder: false,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'lastScan',
				label: 'Último escaneo',
				hasOrder: false,
				size: 'small',
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
		? 5
		: isBreakpointUltraSmall
			? 6
			: isBreakpointExtraSmall
				? 7
				: isBreakpointSmall
					? 8
					: isBreakpointMedium
						? 9
						: isBreakpointLarg
							? 10
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
