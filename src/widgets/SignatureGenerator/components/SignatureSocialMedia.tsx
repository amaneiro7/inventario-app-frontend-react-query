import { SocialContainer } from './SocialContainer'
import { IconContainer } from './IconContainer'
import { GlobeIcon } from '@/shared/ui/icon/GlobeIcon'
import { InstagramIcon } from '@/shared/ui/icon/InstagramIcon'
import { FacebookIcon } from '@/shared/ui/icon/FacebookIcon'
import { XImage } from '@/shared/ui/Images/LazyXImage'
import { YoutubeImage } from '@/shared/ui/Images/LazyYoutubeImage'
import { LinkedInIcon } from '@/shared/ui/icon/LinkedInIcon'
import { memo } from 'react'

export const SignatureSocialMedia = memo(() => {
	return (
		<div className="text-azul flex flex-row space-x-1">
			{/* Website */}
			<SocialContainer>
				<IconContainer>
					<GlobeIcon className="h-full w-full stroke-1 text-white" />
				</IconContainer>
				bncenlinea
			</SocialContainer>
			{/* Redes sociales */}
			<SocialContainer>
				{
					<>
						<IconContainer>
							<InstagramIcon className="h-3 w-3 text-white" />
						</IconContainer>
						<IconContainer className="p-1.5 pr-0.5 pb-0">
							<FacebookIcon className="h-4 w-4 fill-white stroke-1 text-white" />
						</IconContainer>
						<IconContainer>
							<XImage className="h-3 w-3 text-white" />
						</IconContainer>
						<IconContainer>
							<YoutubeImage className="h-3 w-3 text-white" />
						</IconContainer>
						<IconContainer>
							<LinkedInIcon className="h-3 w-3 fill-white stroke-white stroke-1" />
						</IconContainer>
					</>
				}
				@bncbanco
			</SocialContainer>
		</div>
	)
})

SignatureSocialMedia.displayName = 'SignatureSocialMedia'
