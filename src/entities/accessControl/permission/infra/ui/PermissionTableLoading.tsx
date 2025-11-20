import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const PermissionTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="xxLarge">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="auto" className="xs:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="small" className="hidden 2xl:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
	</TableRow>
)
