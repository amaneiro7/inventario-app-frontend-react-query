import { memo } from 'react'
import { Table } from '@/components/Table/Table'
import { TableBody } from '@/components/Table/TableBody'
import { TableHead } from '@/components/Table/TableHead'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'

interface TableEmployeeWrapperProps<T> {
	children?: React.ReactElement<T>
}

export const TableEmployeeWrapper = memo(function <T>({ children }: TableEmployeeWrapperProps<T>) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead size="xxSmall" name="Cod. Empleado" />
					<TableHead size="small" name="Usuario" />
					<TableHead size="small" name="Nombres" />
					<TableHead size="small" name="Apellidos" />
					<TableHead size="xxSmall" name="Centro Trabajo" />
					<TableHead size="xLarge" name="Departamento" />
					<TableHead size="xLarge" name="Cargo" />
					<TableHead size="small" name="Teléfono" />
					<TableHead size="small" name="Extensón" />
					<TableHead size="xxSmall" name="" />
				</TableRow>
			</TableHeader>
			<TableBody>{children}</TableBody>
		</Table>
	)
})
