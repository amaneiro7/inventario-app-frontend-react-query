import { EventContext } from '@/context/EventManager/EventContext'
import { DeviceComputerFilters } from '@/core/devices/devices/application/CreateDeviceComputerParams'
import { DeviceDownload } from '@/core/devices/devices/application/DeviceDownload'
import { DeviceDownloadService } from '@/core/devices/devices/infra/deviceDownload.service'
import { Source } from '@/types/type'
import { useContext, useState } from 'react'

export function useDownloadExcelFromServer({
	query,
	source
}: {
	query: DeviceComputerFilters
	source: Source
}) {
	const { events } = useContext(EventContext)
	const [isDownloading, setIsDownloading] = useState(false)
	const download = async () => {
		setIsDownloading(true)
		try {
			if (source === 'model') {
				// await new ModelDownload(new ApiModelRepository()).exec(query, source)
				return
			} else {
				await new DeviceDownload(new DeviceDownloadService(), events).run({
					...query,
					source
				})
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsDownloading(false)
		}
	}

	return { isDownloading, download }
}
