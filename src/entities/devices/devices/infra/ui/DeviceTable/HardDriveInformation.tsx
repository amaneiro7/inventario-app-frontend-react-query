import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { Icon } from '@/shared/ui/icon/Icon'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const HardDriveInformation = ({ hardDrive }: { hardDrive: DeviceDto['hardDrive'] }) => {
	return (
		<CardDetail title="Especificaciones del MFP" icon={<Icon name="hardDrive" />}>
			<DetailItem
				label="Disco Duro"
				value={
					hardDrive?.hardDriveCapacity
						? `${hardDrive?.hardDriveCapacity?.name} GB`
						: 'Sin Disco'
				}
			/>
			<DetailItem label="Tipo de Disco" value={hardDrive?.hardDriveType?.name} />
			<DetailItem label="Estado del Disco" value={`${hardDrive?.health}%`} />
		</CardDetail>
	)
}
