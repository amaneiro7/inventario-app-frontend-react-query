import { toJpeg } from 'html-to-image'

interface DownloadSignatureProps {
	ref: React.RefObject<HTMLDivElement | null>
	fileName?: string
}
export const downloadSignature = async ({
	ref,
	fileName = 'firma-corporativa'
}: DownloadSignatureProps) => {
	try {
		if (ref.current === null) {
			throw new Error('Elemento no encontrado para generar la imagen.')
		}

		// Generar la imagen como un data URL en formato JPEG
		const dataUrl = await toJpeg(ref.current, {
			quality: 0.98, // Calidad alta para el JPEG
			// Clona el nodo con los estilos computados, lo que mejora la fidelidad
			filter: (node: Node) => {
				if (node.nodeType === Node.COMMENT_NODE) {
					return false
				}
				return true
			},
			style: {
				margin: '0'
			},
			cacheBust: true
		})

		// Crear un enlace temporal para iniciar la descarga
		const link = document.createElement('a')
		link.download = `${fileName}.jpg`
		link.href = dataUrl
		document.body.appendChild(link)
		link.click()

		// Limpiar el enlace del DOM
		document.body.removeChild(link)
	} catch (error) {
		console.error('Error al descargar la firma:', error)
		alert(
			'Hubo un error al generar la imagen de la firma. Por favor, revisa la consola para más detalles.'
		)
	}
}
