import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const EmployeeTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="xxSmall" className="hidden xl:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="small" className="2md:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="small" className="2md:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="xLarge" className="hidden lg:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={6} size="xLarge" className="hidden xl:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={7} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={8} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCellOpenIcon index={9} />
	</TableRow>
)
