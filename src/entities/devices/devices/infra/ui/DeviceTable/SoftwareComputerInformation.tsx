import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { type DeviceDto } from '../../../domain/dto/Device.dto'
import { Settings } from 'lucide-react'

export const SoftwareComputerInformation = ({ device }: { device: DeviceDto }) => {
	const { computer } = device
	let osName = computer?.operatingSystem?.name
	if (osName?.startsWith('Windows 10')) {
		osName = 'Windows 10'
	} else if (osName?.startsWith('Windows 11')) {
		osName = 'Windows 11'
	}
	return (
		<CardDetail title="Software" icon={<Settings className="h-5 w-5" />}>
			{computer?.operatingSystem && (
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<DetailItem label="Sistema Operativo" value={osName} />
					<DetailItem label="Arquitectura" value={computer?.operatingSystemArq?.name} />
					<DetailItem
						label="Build Number"
						value={computer?.operatingSystem?.buildNumber}
					/>
					<DetailItem label="Version" value={computer?.operatingSystem?.version} />
				</div>
			)}
		</CardDetail>
	)
}
