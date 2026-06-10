import { lazy, memo, Suspense } from 'react'
import { useTableGenericDeviceBody } from '@/entities/devices/devices/infra/ui/DeviceTable/useTableGenericDeviceBody'
import { evaluationHardwareStatusConfig } from '../model/evaluationHardwareConfig'
import { TableCellOpenIcon } from '@/shared/ui/Table/TableCellOpenIcon'
import { TableRow } from '@/shared/ui/Table/TableRow'
import { TableCell } from '@/shared/ui/Table/TableCell'
import { TableCellError } from '@/shared/ui/Table/TableCellError'
import { TableCellEmpty } from '@/shared/ui/Table/TableCellEmpty'
import { Icon } from '@/shared/ui/icon/Icon'
import { Dialog } from '@/shared/ui/Modal/Modal'
import type {
	EvaluationHardwareDashboardResponse,
	EvaluationHardwareDeviceDto
} from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'

const DetailsEvaluationHardwareModal = lazy(() =>
	import('./DetailsEvaluationHardwareModal').then(m => ({
		default: m.DetailsEvaluationHardwareModal
	}))
)

interface TableEvaluationHardwareProps {
	devices?: EvaluationHardwareDashboardResponse['devices']
	isError: boolean
}

export const TableEvaluationHardware = memo(
	({ devices, isError }: TableEvaluationHardwareProps) => {
		const { dialogRef, handleCloseModal, handleViewDetails, selectedDevice } =
			useTableGenericDeviceBody<EvaluationHardwareDeviceDto>()

		if (isError) {
			return <TableCellError />
		}
		if (devices && devices.length === 0) {
			return <TableCellEmpty />
		}

		return (
			<>
				{devices?.map(device => (
					<TableRow key={device.deviceId}>
						<TableCell aria-colindex={1} size="xSmall" value={device.status}>
							<Icon
								name={
									evaluationHardwareStatusConfig[device.status]?.icon ??
									'helpCircle'
								}
								className={
									evaluationHardwareStatusConfig[device.status]?.className ??
									'ml-4 h-4 w-4 text-gray-400'
								}
							/>
						</TableCell>

						<TableCell aria-colindex={2} size="small" value={device?.serial ?? ''}>
							{device?.serial ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={3}
							size="large"
							value={device?.location ?? ''}
							// className="hidden sm:table-cell"
						>
							{device?.location ?? ''}
						</TableCell>

						<TableCell
							aria-colindex={4}
							size="large"
							value={device.employee ?? ''}
							className="hidden 2xl:table-cell"
						>
							{device.employee ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={5}
							size="small"
							value={device.hardware.ram ?? ''}
							className="1md:table-cell hidden"
						>
							{device.hardware.ram ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={6}
							size="small"
							value={device.hardware.disk ?? ''}
							className="1md:table-cell hidden"
						>
							{device.hardware.disk ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={7}
							size="xLarge"
							value={device.hardware.processor ?? ''}
							className="hidden lg:table-cell"
						>
							{device.hardware.processor ?? ''}
						</TableCell>
						<TableCell
							aria-colindex={8}
							size="xLarge"
							value={device.reasons.map(reason => reason).join(', ') ?? ''}
							className="1xl:table-cell hidden"
						>
							{device.reasons ?? ''}
						</TableCell>

						<TableCellOpenIcon index={9} onClick={() => handleViewDetails(device)} />
					</TableRow>
				))}
				<Suspense>
					<Dialog ref={dialogRef}>
						{selectedDevice && (
							<DetailsEvaluationHardwareModal
								onClose={handleCloseModal}
								device={selectedDevice}
							/>
						)}
					</Dialog>
				</Suspense>
			</>
		)
	}
)
