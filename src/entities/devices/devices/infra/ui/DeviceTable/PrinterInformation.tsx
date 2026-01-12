import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { Icon } from '@/shared/ui/icon/Icon'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const PrinterInformation = ({ device }: { device: DeviceDto }) => {
	const { printer, model } = device
	return (
		<CardDetail title="Especificaciones de la Impresora" icon={<Icon name="printer" />}>
			{printer?.ipAddress && (
				<DetailItem
					classNameText="font-mono"
					label="Dirección IP"
					value={printer?.ipAddress}
				/>
			)}
			{model?.modelPrinter && (
				<DetailItem
					label="Módelo del cartucho del tóner"
					value={model?.modelPrinter?.cartridgeModel}
				/>
			)}
		</CardDetail>
	)
}
