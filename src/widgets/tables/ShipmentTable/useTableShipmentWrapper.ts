import { useMemo } from 'react'
import { useMediaQuery } from '@/shared/ui/icon/useMediaQuery'
import { type Headers } from '@/shared/ui/Table/TableHeader'

export function useTableShipmentWrapper() {
	const isBreakpointLarg = useMediaQuery('(max-width: 1380px)')
	const isBreakpointMedium = useMediaQuery('(max-width: 1240px)')
	const isBreakpointSmall = useMediaQuery('(max-width: 1010px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 925px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 845px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 650px)')

	const headers: Headers[] = useMemo(
		() => [
			{
				key: 'shipmentCode',
				label: 'Código de envio',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'status',
				label: 'Estatus',
				hasOrder: true,
				size: 'xSmall',
				isTab: false,
				visible: true
			},
			{
				key: 'sentBy',
				label: 'Enviado por',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: !isBreakpointLarg
			},
			{
				key: 'origen',
				label: 'Origen',
				hasOrder: true,
				size: 'large',
				isTab: false,
				visible: !isBreakpointMedium
			},
			{
				key: 'destination',
				label: 'Destino',
				hasOrder: true,
				size: 'large',
				isTab: false,
				visible: !isBreakpointUltraSmall
			},
			{
				key: 'reason',
				label: 'Motivo',
				hasOrder: true,
				size: 'xSmall',
				isTab: false,
				visible: !isBreakpointExtraSmall
			},
			{
				key: 'shipmentDeviceLenght',
				label: 'N° de Equipos',
				hasOrder: false,
				size: 'xSmall',
				isTab: false,
				visible: !isBreakpointSmall
			},
			{
				key: 'shipmentDate',
				label: 'Fecha de Envio',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'deliveryDate',
				label: 'Fecha de Entrega',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: !isBreakpointUltraTinySmall
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
