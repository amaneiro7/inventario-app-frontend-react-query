import React, { memo } from 'react'
import { useExpendedRows } from '@/shared/lib/hooks/useExpendedRows'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { ComputerDescription } from './ComputerDescription'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface TableDeviceProps {
	devices?: DeviceDto[]
	isError: boolean
	colSpan: number
	visibleColumns: string[]
}

export const TableDevice = memo(
	({ devices, isError, colSpan, visibleColumns }: TableDeviceProps) => {
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
								<TableCell size="small" value={device.employee?.userName ?? ''} />
							) : null}
							{visibleColumns.includes('locationId') ? (
								<TableCell size="large" value={device.location?.name} />
							) : null}
							{visibleColumns.includes('ipAddress') ? (
								<TableCell size="small" value={device.computer?.ipAddress ?? ''} />
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
							{visibleColumns.includes('computerName') ? (
								<TableCell
									size="small"
									value={device.computer?.computerName ?? ''}
								/>
							) : null}
							{visibleColumns.includes('observation') ? (
								<TableCell size="small" value={device.observation ?? ''} />
							) : null}
							<TableCellOpenIcon open={expandedRows.includes(device.id)} />
						</TableRow>
						<ComputerDescription
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
