import { Server } from 'lucide-react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const BasicInformation = ({ device }: { device: DeviceDto }) => {
	return (
		<CardDetail title="Información General" icon={<Server className="h-5 w-5" />}>
			<DetailItem label="Categoría" value={device.category.name} />
			<DetailItem label="Marca" value={device.brand.name} />
			<DetailItem label="Modelo" value={device.model.name} />
			<DetailItem label="Observación" value={device.observation} />
			<DetailItem
				label="Última Actualización"
				value={device.updatedAt ? getRelativeTime(device.updatedAt) : ''}
			/>
		</CardDetail>
	)
}
