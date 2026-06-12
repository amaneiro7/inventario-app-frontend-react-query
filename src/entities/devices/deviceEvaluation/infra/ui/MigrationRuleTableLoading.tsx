import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const MigrationRuleTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="auto">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="xSmall">
			<Skeleton className="h-4 w-full" />
		</TableCell>
	</TableRow>
)
