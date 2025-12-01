import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const ModelTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="large">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="medium">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="medium">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="auto">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="small" className="hidden md:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCellOpenIcon index={6} />
	</TableRow>
)
