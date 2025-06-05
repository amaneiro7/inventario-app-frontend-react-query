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
				size: 'xLarge',
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
				key: 'locationId',
				label: 'Ubicación',
				hasOrder: true,
				size: 'xxLarge',
				isTab: true,
				visible: true
			},
			{
				key: 'lastSuccess',
				label: 'Última Conexión',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'lastFailed',
				label: 'Última Desconexión',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'lastScan',
				label: 'Último escaneo',
				hasOrder: true,
				size: 'small',
				isTab: true,
				visible: true
			},
			{
				key: 'actions',
				label: '',
				hasOrder: false,
				size: 'xxSmall',
				isTab: false,
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
		? 6
		: isBreakpointUltraSmall
			? 7
			: isBreakpointExtraSmall
				? 8
				: isBreakpointSmall
					? 9
					: isBreakpointMedium
						? 10
						: isBreakpointLarg
							? 11
							: 11 // Ajusta el colSpan dinámicamente

	const visibleColumns = useMemo(() => {
		return headers.filter(header => header.visible).map(h => h.key)
	}, [headers])
	return {
		headers,
		colSpan,
		visibleColumns
	}
}
