import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { type DeviceDto } from '../../../domain/dto/Device.dto'
import { Cpu } from 'lucide-react'

export const ComputerInformation = ({ device }: { device: DeviceDto }) => {
	const { computer, model } = device
	const processor = computer?.processor
		? `${computer.processor.productCollection} ${computer.processor.numberModel}`
		: ''
	return (
		<CardDetail title="Hardware" icon={<Cpu className="h-5 w-5" />}>
			{computer?.processor && (
				<>
					<DetailItem label="Procesador" value={processor} />
					<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
						<DetailItem
							label="Núcleos"
							value={computer?.processor?.cores?.toString()}
						/>
						<DetailItem label="Frecuencia" value={computer?.processor?.frequency} />
					</div>
				</>
			)}
			<div className="grid grid-cols-1 items-start justify-start gap-2 md:grid-cols-2">
				<DetailItem label="Memoria RAM" value={`${computer?.memoryRamCapacity ?? ''} GB`} />
				<DetailItem
					label="Módulos de RAM"
					value={computer ? computer?.memoryRam?.map(mem => mem).join(' / ') : ''}
				/>
				<DetailItem
					label="Tipo de RAM"
					value={
						model?.modelComputer
							? model?.modelComputer?.memoryRamType?.name
							: model?.modelLaptop
								? model?.modelLaptop?.memoryRamType?.name
								: ''
					}
				/>
			</div>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				<DetailItem
					label="Disco Duro"
					value={
						computer?.hardDriveCapacity
							? `${computer?.hardDriveCapacity?.name} GB`
							: 'Sin Disco'
					}
				/>
				{computer?.hardDriveCapacity && (
					<DetailItem label="Tipo de Disco" value={computer?.hardDriveType?.name} />
				)}
			</div>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{computer?.ipAddress && (
					<DetailItem
						classNameText="font-mono"
						label="Dirección IP"
						value={computer?.ipAddress}
					/>
				)}
				{computer?.macAddress && (
					<DetailItem
						classNameText="font-mono"
						label="Dirección MAC"
						value={computer.macAddress}
					/>
				)}
			</div>
		</CardDetail>
	)
}
