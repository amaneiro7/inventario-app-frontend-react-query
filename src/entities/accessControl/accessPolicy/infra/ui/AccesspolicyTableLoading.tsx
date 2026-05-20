import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const AccessPolicyTableLoading = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="medium">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell className="1md:table-cell hidden" aria-colindex={2} size="xxSmall">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell className="hidden md:table-cell" aria-colindex={3} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell className="hidden sm:table-cell" aria-colindex={4} size="large">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} className="1sm:table-cell hidden" size="medium">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell className="1xl:table-cell hidden" aria-colindex={6} size="xxLarge">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={7} size="xSmall">
			<Skeleton className="h-4 w-full" />
		</TableCell>
	</TableRow>
)
