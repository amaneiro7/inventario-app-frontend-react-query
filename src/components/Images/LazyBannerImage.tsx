import Img from '@/assets/banner.webp'

type Props = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>

export function LazyBannerImage({ ...props }: Props) {
	return <img {...props} src={Img} alt="Banner Imag" />
}
