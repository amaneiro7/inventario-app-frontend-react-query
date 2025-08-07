import { memo } from 'react'
import Img from '@/shared/assets/img-linkedin.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LinkedInImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Logo en blanco y negro de un globo" />
}

export const LazyLinkedInImage = memo(LinkedInImage)
