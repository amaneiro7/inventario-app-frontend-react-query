import { memo } from "react";
import Img from "@/assets/bnclogo.webp"

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LogoImage({ ...props }: Props) {
  return (<img {...props} src={Img} alt='Logo del Banco Nacional de Crédito' />)
}

export const LazyLogoImage = memo(LogoImage)