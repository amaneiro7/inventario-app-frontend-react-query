import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { Icon } from '@/shared/ui/icon/Icon'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const MFPInformation = ({ device }: { device: DeviceDto }) => {
	const { mfp, model } = device
	return (
		<CardDetail title="Especificaciones del MFP" icon={<Icon name="printer" />}>
			{mfp?.ipAddress && (
				<DetailItem classNameText="font-mono" label="Dirección IP" value={mfp?.ipAddress} />
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
