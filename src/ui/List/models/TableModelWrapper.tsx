import { lazy } from 'react'

const Table = lazy(async () =>
	import('@/components/Table/Table').then(m => ({
		default: m.Table
	}))
)
const TableHeader = lazy(async () =>
	import('@/components/Table/TableHeader').then(m => ({
		default: m.TableHeader
	}))
)
const TableRow = lazy(async () =>
	import('@/components/Table/TableRow').then(m => ({
		default: m.TableRow
	}))
)
const TableBody = lazy(async () =>
	import('@/components/Table/TableBody').then(m => ({
		default: m.TableBody
	}))
)
const TableHead = lazy(async () =>
	import('@/components/Table/TableHead').then(m => ({
		default: m.TableHead
	}))
)

interface Props<T> {
	children?: React.ReactElement<T>
}

export function TableModelWrapper<T>({ children }: Props<T>) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead size="small" name="Category" />
					<TableHead size="small" name="SubCategoria" />
					<TableHead size="small" name="Marca" />
					<TableHead size="large" name="Modelo" />
					<TableHead size="small" name="Genérico" />
					<TableHead size="xxSmall" name="" />
				</TableRow>
			</TableHeader>
			<TableBody>{children}</TableBody>
		</Table>
	)
}
