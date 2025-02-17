import { useCallback, useContext, useState } from 'react'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'
import { type Source } from '@/types/type'
import { EventContext } from '@/context/EventManager/EventContext'
import { DeviceDownload } from '@/core/devices/devices/application/DeviceDownload'
import { DeviceDownloadService } from '@/core/devices/devices/infra/service/deviceDownload.service'

export function useDownloadExcelService({
	query,
	source
}: {
	query: DeviceComputerFilters
	source: Source
}) {
	const { events } = useContext(EventContext)
	const [isDownloading, setIsDownloading] = useState(false)
	const download = useCallback(async () => {
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
	}, [])

	return { isDownloading, download }
}
