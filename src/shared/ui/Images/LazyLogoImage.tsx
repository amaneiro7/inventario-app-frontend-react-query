import { memo } from 'react'
import Img from '@/shared/assets/bnclogo.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const LazyLogoImage = memo(({ ...props }: Props) => {
	return <img {...props} src={Img} alt="Logo del Banco Nacional de Crédito" />
})
