import { MapPin } from 'lucide-react'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const LocationInformation = ({ location }: { location: DeviceDto['location'] }) => {
	return (
		<CardDetail title="Ubicación" icon={<MapPin className="h-5 w-5" />}>
			<DetailItem label="Tipo de Sitio" value={location?.typeOfSite?.name} />
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				<DetailItem
					label="Zona"
					value={location?.site?.city?.state?.region?.administratveRegion?.name}
				/>
				<DetailItem label="Región" value={location?.site?.city?.state?.region.name} />
			</div>
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				<DetailItem label="Estado" value={location?.site?.city?.state?.name} />
				<DetailItem label="Ciudad" value={location?.site?.city?.name} />
			</div>

			<DetailItem label="Sitio" value={location?.site?.name} />
			<DetailItem label="Ubicación" value={location?.name} />
		</CardDetail>
	)
}
