import { memo } from 'react'
import Img from '@/shared/assets/bnc-logo-white.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function WhiteLogoImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Logo del Banco Nacional de Crédito" />
}

export const LazyWhiteLogoImage = memo(WhiteLogoImage)
