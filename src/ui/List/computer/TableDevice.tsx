import React, { lazy } from 'react'
import { useExpendedRows } from '@/hooks/utils/useExpendedRows'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

interface Props {
	devices?: DeviceDto[]
}

const TableCell = lazy(async () =>
	import('@/components/Table/TableCell').then(m => ({
		default: m.TableCell
	}))
)
const TableRow = lazy(async () =>
	import('@/components/Table/TableRow').then(m => ({
		default: m.TableRow
	}))
)
const TableCellOpenIcon = lazy(async () =>
	import('@/components/Table/TableCellOpenIcon').then(m => ({
		default: m.TableCellOpenIcon
	}))
)

const ComputerDescription = lazy(async () =>
	import('./ComputerDescription').then(m => ({
		default: m.ComputerDescription
	}))
)

export function TableDevice({ devices }: Props) {
	const { expandedRows, handleRowClick } = useExpendedRows()

	return (
		<>
			{devices?.map(device => (
				<React.Fragment key={device.id}>
					<TableRow
						className={`[&>td]:cursor-pointer ${
							expandedRows.includes(device.id) &&
							'[&>td]:bg-slate-200 [&>td]:border-b-slate-200'
						}`}
						onClick={() => handleRowClick(device.id)}
					>
						<TableCell size="small" value={device.employee?.userName ?? ''} />
						<TableCell size="large" value={device.location?.name} />
						<TableCell size="small" value={device.computer?.ipAddress ?? ''} />
						<TableCell size="small" value={device.serial ?? ''} />
						<TableCell size="small" value={device.category?.name} />
						<TableCell size="small" value={device.brand?.name} />
						<TableCell size="xLarge" value={device.model?.name} />
						<TableCell size="small" value={device.computer?.computerName ?? ''} />
						<TableCell size="small" value={device.observation ?? ''} />
						<TableCellOpenIcon open={expandedRows.includes(device.id)} />
					</TableRow>
					<ComputerDescription open={expandedRows.includes(device.id)} device={device} />
				</React.Fragment>
			))}
		</>
	)
}
