import { Server } from 'lucide-react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { lastHistoryUpdated } from '@/shared/lib/utils/lastHistoryUpdated'
import { type DeviceDto } from '../../../domain/dto/Device.dto'

export const BasicInformation = ({ device }: { device: DeviceDto }) => {
	const lastUpdater = lastHistoryUpdated(device?.history ?? [])

	// A utility function to create a clean full name
	const formatUserName = () => {
		// If there's no history, no user, or no name, fall back to 'root'
		if (!lastUpdater?.user) {
			return 'root'
		}

		const { employee } = lastUpdater.user
		const { name, lastName, email } = employee

		// Combine name and last name if available
		const fullName = [name, lastName].filter(Boolean).join(' ')

		// If a full name exists, return it. Otherwise, fall back to email.
		return fullName || email
	}
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
			{device.history && device.history.length > 0 && (
				<DetailItem label="Actualizado por" value={formatUserName()} />
			)}
		</CardDetail>
	)
}
