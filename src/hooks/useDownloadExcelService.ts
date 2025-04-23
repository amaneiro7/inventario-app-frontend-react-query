import { useCallback, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { DeviceDownload } from '@/core/devices/devices/application/DeviceDownload'
import { DeviceDownloadService } from '@/core/devices/devices/infra/service/deviceDownload.service'
import { ModelDownload } from '@/core/model/models/application/ModelDownload'
import { ModelDownloadService } from '@/core/model/models/infra/service/modelDownload.service'
import { type Source } from '@/types/type'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

export function useDownloadExcelService() {
	const { events } = useAuthStore.getState()
	const [isDownloading, setIsDownloading] = useState(false)
	const download = useCallback(
		async ({ query, source }: { query: DeviceComputerFilters; source: Source }) => {
			setIsDownloading(true)
			try {
				if (source === 'model') {
					await new ModelDownload(new ModelDownloadService(), events).run({
						...query,
						source
					})
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
		},
		[]
	)

	return { isDownloading, download }
}
