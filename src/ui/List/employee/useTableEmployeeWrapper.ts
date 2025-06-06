import { useMemo } from 'react'
import { useMediaQuery } from '@/icon/useMediaQuery'
import { type Headers } from '@/components/Table/TableHeader'

export function useTableDeviceWrapper() {
	const isBreakpointLarg = useMediaQuery('(max-width: 1380px)')
	const isBreakpointMedium = useMediaQuery('(max-width: 1240px)')
	const isBreakpointSmall = useMediaQuery('(max-width: 1120px)')
	const isBreakpointExtraSmall = useMediaQuery('(max-width: 1010px)')
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 900px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 700px)')

	const headers: Headers[] = useMemo(
		() => [
			{
				key: 'employeeCode',
				label: 'Cod. Empleado',
				hasOrder: true,
				size: 'xxSmall',
				isTab: false,
				visible: !isBreakpointMedium
			},
			{
				key: 'userName',
				label: 'Usuario',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'name',
				label: 'Nombres',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: !isBreakpointUltraTinySmall
			},
			{
				key: 'lastName',
				label: 'Apellidos',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: !isBreakpointUltraTinySmall
			},
			{
				key: 'departamentoId',
				label: 'Departamento',
				hasOrder: true,
				size: 'xLarge',
				isTab: false,
				visible: !isBreakpointUltraSmall
			},
			{
				key: 'cargoId',
				label: 'Cargo',
				hasOrder: true,
				size: 'xLarge',
				isTab: false,
				visible: !isBreakpointSmall
			},
			{
				key: 'phone',
				label: 'Teléfono',
				hasOrder: false,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'extension',
				label: 'Extensión',
				hasOrder: false,
				size: 'small',
				isTab: false,
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
		? 3
		: isBreakpointUltraSmall
		? 4
		: isBreakpointExtraSmall
		? 5
		: isBreakpointSmall
		? 6
		: isBreakpointMedium
		? 7
		: isBreakpointLarg
		? 8
		: 9 // Ajusta el colSpan dinámicamente

	const visibleColumns = useMemo(() => {
		return headers.filter(header => header.visible).map(h => h.key)
	}, [headers])
	return {
		headers,
		colSpan,
		visibleColumns
	}
}
