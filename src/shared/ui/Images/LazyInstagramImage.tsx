import { memo } from 'react'
import Img from '@/shared/assets/instagram.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function InstagramImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Logo en blanco y negro de un globo" />
}

export const LazyInstagramImage = memo(InstagramImage)
