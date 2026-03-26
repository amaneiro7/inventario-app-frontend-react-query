import { memo } from 'react'
import Img from '@/shared/assets/img-youtube.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const LazyYoutubeImage = memo(({ ...props }: Props) => {
	return <img {...props} src={Img} alt="Logo en blanco y negro de un globo" />
})
