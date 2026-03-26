import { memo } from 'react'
import Img from '@/shared/assets/bnc-logo-white.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export const LazyWhiteLogoImage = memo(({ ...props }: Props) => {
	return <img {...props} src={Img} alt="Logo del Banco Nacional de Crédito" />
})
