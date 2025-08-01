import { memo } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	title: string
}
export const DescriptionTitle = memo(({ title, ...props }: Props) => {
	return (
		<dt className="text-sm leading-6 font-semibold text-gray-900" {...props}>
			{title}:
		</dt>
	)
})
