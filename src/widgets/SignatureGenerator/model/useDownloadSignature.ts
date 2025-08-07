import { useState } from 'react'
import { downloadSignature } from './downloadSignature'

export const useDownloadSignature = () => {
	const [isGenerating, setIsGenerating] = useState<boolean>(false)

	const handleDownload = async ({
		ref,
		userName
	}: {
		userName: string
		ref: React.RefObject<HTMLDivElement | null>
	}) => {
		setIsGenerating(true)
		try {
			await downloadSignature({
				ref,
				fileName: `firma-${userName.toLocaleLowerCase()}`
			})
		} finally {
			setIsGenerating(false)
		}
	}

	return {
		isGenerating,
		handleDownload
	}
}
