import { memo, useMemo } from 'react'
import { Download, FileImage } from 'lucide-react'
import { useDownloadSignature } from '../model/useDownloadSignature'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import Typography from '@/shared/ui/Typography'
import Button from '@/shared/ui/Button'

export const DownloadButtonUI = memo(
	({
		userName = '',
		isFormValid,
		ref
	}: {
		userName?: string
		isFormValid: boolean
		ref: React.RefObject<HTMLDivElement | null>
	}) => {
		const { handleDownload, isGenerating } = useDownloadSignature()

		const buttonPros: {
			text: string
			Icon: React.ReactElement
		} = useMemo(
			() =>
				isGenerating
					? {
							text: 'Generando imagen...',
							Icon: <CircleSpinningIcon aria-hidden="true" width={20} />
						}
					: {
							text: 'Descargar como JPG',
							Icon: <Download aria-hidden="true" className="mr-2 h-5 w-5" />
						},
			[isGenerating]
		)

		return (
			<DetailsBoxWrapper>
				<Typography color="gray-600" variant="h3">
					Descargar Firma
				</Typography>

				<Button
					buttonSize="large"
					color="blue"
					size="full"
					disabled={!isFormValid || isGenerating}
					text={buttonPros.text}
					icon={buttonPros.Icon}
					onClick={() => handleDownload({ ref, userName })}
				/>

				<div className="mt-4 rounded-lg bg-blue-50 p-3">
					<div className="flex items-start">
						<FileImage
							aria-hidden="true"
							className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-blue-600"
						/>
						<div>
							<Typography variant="p" weight="medium" color="azul" className="mb-1">
								Características de la descarga:
							</Typography>
							<ul className="space-y-1 text-xs text-blue-800">
								<li>• Formato: JPG de alta calidad</li>
								<li>• Resolución: 3x para impresión</li>
								<li>• Tamaño: 600x280 píxeles (optimizado para email)</li>
								<li>• Fondo: Blanco sólido</li>
							</ul>
						</div>
					</div>
				</div>
			</DetailsBoxWrapper>
		)
	}
)

DownloadButtonUI.displayName = 'DownloadButtonUI'
