import { useComputerFilter } from '@/hooks/filters/useComputerFilters'
import { ListWrapper } from '@/ui/List/ListWrapper'
import { lazy } from 'react'

const DeviceTable = lazy(() =>
	import('@/ui/List/TableDevice').then(m => ({ default: m.TableWrapper }))
)

export default function ListComputer() {
	const filters = useComputerFilter()

	return (
		<ListWrapper
			title="Lista de equipos de computación"
			total={5}
			loading={false}
			table={<DeviceTable />}
		/>
	)
}
