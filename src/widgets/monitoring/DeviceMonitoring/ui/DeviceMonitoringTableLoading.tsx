import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const DeviceMonitoringTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="xLarge">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="small" className="hidden sm:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="xxLarge" className="2md:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="small" className="hidden lg:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={6} size="small" className="hidden xl:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={7} size="small" className="1xl:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCellOpenIcon index={8} />
	</TableRow>
)
