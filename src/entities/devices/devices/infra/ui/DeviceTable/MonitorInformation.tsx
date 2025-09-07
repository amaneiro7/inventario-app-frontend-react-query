import { Monitor } from 'lucide-react'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const MonitorInformation = ({
	modelMonitor
}: {
	modelMonitor: DeviceDto['model']['modelMonitor']
}) => {
	return (
		<CardDetail title="Especificaciones del Monitor" icon={<Monitor />}>
			<DetailItem
				label="Tamaño de Pantalla"
				value={modelMonitor ? `${modelMonitor?.screenSize}'` : ''}
			/>
			<DetailItem label="Puerto VGA" value={modelMonitor?.hasVGA ? 'Si' : 'No'} />
			<DetailItem label="Puerto DVI" value={modelMonitor?.hasDVI ? 'Si' : 'No'} />
			<DetailItem label="Puerto HDMI" value={modelMonitor?.hasHDMI ? 'Si' : 'No'} />
		</CardDetail>
	)
}
