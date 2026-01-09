import { memo } from 'react'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { SignatureSocialMedia } from './SignatureSocialMedia'
import { LazyLogoImage } from '@/shared/ui/Images/LazyLogoImage'
import Typography from '@/shared/ui/Typography'
import { type SignaturePlaceHolders, type SignatureData } from '../model/useSignatureData'

interface SignaturePreviewProps {
	data: SignatureData
	placeHolder: SignaturePlaceHolders
	ref: React.RefObject<HTMLDivElement | null>
}

export const SignaturePreview = memo(({ data, placeHolder, ref }: SignaturePreviewProps) => {
	return (
		<DetailsBoxWrapper>
			<div className="flex flex-col items-center justify-center bg-white">
				<Typography className="self-start" color="azul" variant="h3">
					Vista Previa
				</Typography>
				<div ref={ref} className="bg-white p-2">
					<div
						id="signature-preview"
						className="border-azul/15 mx-0 flex h-fit min-h-48 w-lg rounded-full border px-12 py-4 shadow"
					>
						<div className="flex items-center">
							<LazyLogoImage alt="Logo del BNC" className="h-auto w-40" />
						</div>
						<span
							aria-label="rif"
							style={{
								fontSize: '3px',
								writingMode: 'sideways-lr'
							}}
							className="text-azul border-azul ml-1 border-r-4 text-left leading-1"
						>
							J-30984132-7
						</span>
						<div className="text-muted-foreground ml-2 flex h-full min-h-40 flex-col font-sans text-xs">
							{/* Contenedor para toda la información que ocupará el espacio superior */}
							<div className="flex-1 space-y-0.5">
								<p
									className={`text-sm uppercase ${!data?.name && !data?.lastName ? 'text-gray-400 italic' : ''}`}
								>
									{data?.name || placeHolder.name}{' '}
									<strong>{data?.lastName || placeHolder.lastName}</strong>
								</p>
								<p className={!data?.cargo ? 'text-gray-400 italic' : ''}>
									{data?.cargo || placeHolder.cargo}
								</p>

								{TypeOfSiteOptions.AGENCY === data?.typeOfSite ? (
									<>
										<p
											className={
												!data?.vicepresidenciaEjecutiva
													? 'text-gray-400 italic'
													: ''
											}
										>
											{data?.vicepresidenciaEjecutiva ||
												placeHolder.vicepresidenciaEjecutiva}
										</p>
										<p
											className={
												!data?.siteName ? 'text-gray-400 italic' : ''
											}
										>
											{data?.siteName || placeHolder.siteName}
										</p>
									</>
								) : (
									<>
										<p
											className={
												!data?.vicepresidencia ? 'text-gray-400 italic' : ''
											}
										>
											{data?.vicepresidencia || placeHolder.vicepresidencia}
										</p>
										<p
											className={
												!data?.siteName ? 'text-gray-400 italic' : ''
											}
										>
											{data?.vicepresidenciaEjecutiva ||
												placeHolder.vicepresidenciaEjecutiva}
										</p>
									</>
								)}
								{data.isHasPhoneNumber && (
									<p className={!data?.numbers ? 'text-gray-400 italic' : ''}>
										{data?.numbers || placeHolder.numbers}
									</p>
								)}
								{data.isHasPhoneNumber && (
									<p
										className={`underline underline-offset-1 ${!data?.email ? 'text-gray-400 italic' : ''}`}
									>
										{data?.email || placeHolder.email}
									</p>
								)}
								<p className={!data?.address ? 'text-gray-400 italic' : ''}>
									{data?.address || placeHolder.address}
								</p>
							</div>

							{/* El componente de redes sociales es el segundo hijo, se irá al final */}
							<SignatureSocialMedia />
						</div>
					</div>
				</div>
			</div>
		</DetailsBoxWrapper>
	)
})

SignaturePreview.displayName = 'SignaturePreview'
