type Props = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>

export function Image({ ...props }): Props {
	return (
		<img loading="lazy" fetchPriority="low" decoding="async" {...props} />
	)
}
