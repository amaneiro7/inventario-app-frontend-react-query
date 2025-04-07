import { useMemo } from 'react'
import { useMediaQuery } from '@/icon/useMediaQuery'
import { type Headers } from '@/components/Table/TableHeader'

export function useTableModelWrapper() {
	const isBreakpointUltraSmall = useMediaQuery('(max-width: 770px)')
	const isBreakpointUltraTinySmall = useMediaQuery('(max-width: 700px)')

	const headers: Headers[] = useMemo(
		() => [
			{
				key: 'mainCategoryId',
				label: 'Categoria',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'categoryId',
				label: 'SubCategoria',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'brandId',
				label: 'Marca',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: true
			},
			{
				key: 'name',
				label: 'Modelo',
				hasOrder: true,
				size: 'large',
				isTab: false,
				visible: true
			},
			{
				key: 'generic',
				label: 'Genérico',
				hasOrder: true,
				size: 'small',
				isTab: false,
				visible: !isBreakpointUltraSmall
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
		[isBreakpointUltraSmall, isBreakpointUltraTinySmall]
	)
	const colSpan = isBreakpointUltraTinySmall ? 4 : isBreakpointUltraSmall ? 5 : 6 // Ajusta el colSpan dinámicamente

	const visibleColumns = useMemo(() => {
		return headers.filter(header => header.visible).map(h => h.key)
	}, [headers])

	console.log(visibleColumns)
	return {
		headers,
		colSpan,
		visibleColumns
	}
}
