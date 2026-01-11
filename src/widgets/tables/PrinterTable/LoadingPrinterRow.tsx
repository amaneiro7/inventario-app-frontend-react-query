import { Skeleton } from '@/shared/ui/skeletons/Skeleton'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'

export const LoadingPrinterRow = () => (
	<TableRow>
		<TableCell aria-colindex={1} size="small" className="2lg:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={2} size="xLarge">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={3} size="small">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={4} size="medium" className="1md:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={5} size="xLarge" className="1lg:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={6} size="small" className="hidden md:table-cell">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={7} size="medium" className="1sm:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCell aria-colindex={8} size="auto" className="1xl:table-cell hidden">
			<Skeleton className="h-4 w-full" />
		</TableCell>
		<TableCellOpenIcon index={9} />
	</TableRow>
)
