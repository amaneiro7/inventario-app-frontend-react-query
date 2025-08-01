import Img from '@/shared/assets/codescreen.jpg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function LazyCodeScrenImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Laptop Code Screen" />
}
