import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLElement>

export const Main = memo(({ children, className, ...props }: React.PropsWithChildren<Props>) => {
	const classes = twMerge('overflow-y-auto flex flex-col px-8 pt-4 pb-0 md:flex-1', className)

	return (
		<main className={classes} style={{ width: 'calc(100vw - 1rem)' }} {...props}>
			{children}
		</main>
	)
})
