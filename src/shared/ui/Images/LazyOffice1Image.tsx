import Img from '@/shared/assets/office1.webp'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyOfficeImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Imagen de oficina Mac Apple" />
}
