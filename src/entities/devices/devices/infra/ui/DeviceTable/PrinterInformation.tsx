import { ExternalLink } from 'lucide-react'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { Icon } from '@/shared/ui/icon/Icon'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const PrinterInformation = ({ device }: { device: DeviceDto }) => {
	const { printer, model } = device
	return (
		<CardDetail
			title="Especificaciones de la Impresora"
			icon={<Icon name="printer" />}
			headerAction={
				printer?.ipAddress && (
					<a
						className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-200"
						href={`http://${printer?.ipAddress}`}
						rel="noreferrer"
						target="_blank"
					>
						<ExternalLink className="h-3 w-3" />
						Abrir Panel
					</a>
				)
			}
		>
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
