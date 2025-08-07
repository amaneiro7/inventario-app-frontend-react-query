import { memo } from 'react'
import Img from '@/shared/assets/img-facebook.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function FacebookImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Logo en blanco y negro de un globo" />
}

export const LazyFacebookImage = memo(FacebookImage)
