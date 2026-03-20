type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function Image({ alt, ...props }: Props) {
	return <img loading="lazy" fetchPriority="low" decoding="async" alt={alt ?? ''} {...props} />
}
