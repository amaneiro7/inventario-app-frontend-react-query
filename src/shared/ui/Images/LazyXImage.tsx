import { memo } from 'react'
import Img from '@/shared/assets/LogoTwitterX.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function XImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Logo en blanco y negro de un globo" />
}

export const LazyXImage = memo(XImage)
