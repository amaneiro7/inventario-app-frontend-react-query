import { lazy, Suspense } from 'react'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

interface Props {
	open: boolean
	device: DeviceDto
}

const TableCellDescInfo = lazy(async () =>
	import('@/components/Table/TableCellDescInfo').then(m => ({
		default: m.TableCellDescInfo
	}))
)
const TableCellDescription = lazy(async () =>
	import('@/components/Table/TableCellDescription').then(m => ({
		default: m.TableCellDescription
	}))
)

export function ComputerDescription({ open, device }: Props) {
	return (
		<Suspense>
			<TableCellDescription
				open={open}
				state={device}
				stateId={device.id}
				url={`/device/edit/${device.id}`}
				colspan={10}
			>
				<div className="flex flex-col gap-2">
					<TableCellDescInfo title="Estatus" text={device.status?.name ?? ''} />
					<TableCellDescInfo title="Activo" text={device.activo ?? 'Sin Activo'} />
				</div>
				<div className="flex flex-col gap-2">
					<TableCellDescInfo
						title="Procesador"
						text={
							device.computer
								? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}`
								: ''
						}
					/>
					<div className="flex gap-4">
						<TableCellDescInfo
							title="Nucleos"
							text={device.computer ? `${device?.computer?.processor?.cores}` : ''}
						/>
						<TableCellDescInfo
							title="Frecuencia"
							text={
								device.computer ? `${device?.computer?.processor?.frequency}` : ''
							}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<TableCellDescInfo
						title="Memoria Ram"
						text={device.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''}
					/>
					<div className="flex gap-4">
						<TableCellDescInfo
							title="Tipo"
							text={
								device?.model?.modelComputer
									? device?.model?.modelComputer?.memoryRamType?.name
									: device?.model?.modelLaptop
									? device?.model?.modelLaptop?.memoryRamType?.name
									: ''
							}
						/>
						<TableCellDescInfo
							title="Modulos"
							text={
								device.computer
									? device?.computer?.memoryRam?.map(mem => mem).join(' / ')
									: ''
							}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<TableCellDescInfo
						title="Disco Duro"
						text={
							device?.computer?.hardDriveCapacity
								? `${device?.computer?.hardDriveCapacity?.name} Gb`
								: 'Sin Disco'
						}
					/>
					<TableCellDescInfo
						title="Tipo"
						text={device?.computer?.hardDriveType?.name ?? 'No Aplica'}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<TableCellDescInfo
						title="Sistema Operativo"
						text={device?.computer?.operatingSystem?.name ?? 'No Aplica'}
					/>
					<TableCellDescInfo
						title="Arquitectura del Sistema Operativo"
						text={device?.computer?.operatingSystemArq?.name ?? 'No Aplica'}
					/>
				</div>
				<TableCellDescInfo
					title="Última Actualización"
					text={device.updatedAt ? new Date(device.updatedAt).toLocaleDateString() : ''}
				/>
			</TableCellDescription>
		</Suspense>
	)
}
