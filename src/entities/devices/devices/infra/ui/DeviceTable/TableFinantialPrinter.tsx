import React, { lazy, memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCellOpenIcon = lazy(() =>
	import('@/shared/ui/Table/TableCellOpenIcon').then(m => ({ default: m.TableCellOpenIcon }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)
const FinantialPrinterDescription = lazy(() =>
	import('./FinantialPrinterDescription').then(m => ({ default: m.FinantialPrinterDescription }))
)

interface TableFinantialPrinterProps {
	devices?: DeviceDto[]
	isError: boolean
	colSpan: number
}

export const TableFinantialPrinter = memo(
	({ devices, colSpan, isError }: TableFinantialPrinterProps) => {
		const { expandedRows, handleRowClick } = useExpendedRows()

		if (isError) {
			return <TableCellError colSpan={colSpan} />
		}
		if (devices && devices.length === 0) {
			return <TableCellEmpty colSpan={colSpan} />
		}
		return (
			<>
				{devices?.map(device => (
					<React.Fragment key={device.id}>
						<TableRow
							className={`[&>td]:cursor-pointer ${
								expandedRows.includes(device.id) &&
								'[&>td]:border-b-slate-200 [&>td]:bg-slate-200'
							}`}
							onClick={() => handleRowClick(device.id)}
						>
							{visibleColumns.includes('employeeId') ? (
								<TableCell size="small" value={device.employee?.userName} />
							) : null}
							{visibleColumns.includes('locationId') ? (
								<TableCell size="large" value={device.location?.name} />
							) : null}
							{visibleColumns.includes('serial') ? (
								<TableCell size="small" value={device.serial ?? ''} />
							) : null}
							{visibleColumns.includes('categoryId') ? (
								<TableCell size="small" value={device.category?.name} />
							) : null}
							{visibleColumns.includes('brandId') ? (
								<TableCell size="small" value={device.brand?.name} />
							) : null}
							{visibleColumns.includes('modelId') ? (
								<TableCell size="xLarge" value={device.model?.name} />
							) : null}
							{visibleColumns.includes('observation') ? (
								<TableCell size="small" value={device.observation ?? ''} />
							) : null}
							<TableCellOpenIcon open={expandedRows.includes(device.id)} />
						</TableRow>

						<FinantialPrinterDescription
							open={expandedRows.includes(device.id)}
							device={device}
							colSpan={colSpan}
							visibleColumns={visibleColumns}
						/>
					</React.Fragment>
				))}
			</>
		)
	}
)

TableFinantialPrinter.displayName = 'TableFinantialPrinter'
