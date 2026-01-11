import { lazy } from 'react'
import { DetailModalWrapper } from '@/shared/ui/DescriptionList/DetailModalWrapper'
import { DetailModalHeader } from '@/shared/ui/DescriptionList/DetailModalHeader'
import { DetailModalContent } from '@/shared/ui/DescriptionList/DetailModalContent'
import { ModalTitle } from './ModalTitle'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

const LocationInformation = lazy(() =>
	import('./LocationInformation').then(m => ({ default: m.LocationInformation }))
)
const EmployeeInformation = lazy(() =>
	import('./EmployeeInformation').then(m => ({ default: m.EmployeeInformation }))
)
const BasicInformation = lazy(() =>
	import('./BasicInformation').then(m => ({ default: m.BasicInformation }))
)
const MonitorInformation = lazy(() =>
	import('./MonitorInformation').then(m => ({ default: m.MonitorInformation }))
)
const ComputerInformation = lazy(() =>
	import('./ComputerInformation').then(m => ({ default: m.ComputerInformation }))
)
const SoftwareComputerInformation = lazy(() =>
	import('./SoftwareComputerInformation').then(m => ({ default: m.SoftwareComputerInformation }))
)
const MFPInformation = lazy(() =>
	import('./MFPInformation').then(m => ({ default: m.MFPInformation }))
)
const HardDriveInformation = lazy(() =>
	import('./HardDriveInformation').then(m => ({ default: m.HardDriveInformation }))
)

interface DetailsModalProps {
	device: DeviceDto
	onCLose: () => void
}

export const DetailsModal = ({ device, onCLose }: DetailsModalProps) => {
	if (!device) return null

	const { computer, employee, location, model, mfp, hardDrive } = device

	return (
		<DetailModalWrapper>
			{/* --- HEADER --- */}
			<DetailModalHeader onClose={onCLose} url={`/form/device/edit/${device.id}`}>
				<ModalTitle
					activo={device.activo}
					category={device.category.name}
					computerName={computer?.computerName}
					serial={device.serial}
					statusId={device.statusId}
					statusName={device.status.name}
				/>
			</DetailModalHeader>

			{/* --- BODY --- */}
			<DetailModalContent>
				{/* --- INFORMACIÓN BÁSICA --- */}
				<BasicInformation device={device} />
				{/* --- Computer --- */}
				{computer && <ComputerInformation device={device} />}
				{/* --- Software --- */}
				{computer && computer.operatingSystem && (
					<SoftwareComputerInformation device={device} />
				)}
				{/* Monitor */}
				{model && model.modelMonitor && (
					<MonitorInformation modelMonitor={model.modelMonitor} />
				)}
				{/* --- UBICACIÓN --- */}
				<LocationInformation location={location} />
				{/* --- MFP --- */}
				{mfp && <MFPInformation device={device} />}
				{/* --- Disco Duro --- */}
				{hardDrive && <HardDriveInformation hardDrive={hardDrive} />}
				{/* --- Employee --- */}
				{employee && <EmployeeInformation employee={employee} />}
			</DetailModalContent>
		</DetailModalWrapper>
	)
}
