import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const AccessPolicyTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="small" className="xs:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="large" className="hidden 2xl:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="large" className="1xl:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="large" className="2md:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={6} size="xSmall" className="hidden lg:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
	</TableRow>
)
