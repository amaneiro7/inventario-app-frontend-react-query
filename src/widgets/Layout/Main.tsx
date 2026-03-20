import { memo } from 'react'
import { cn } from '@/shared/lib/utils'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLElement>

export const Main = memo(({ children, className, ...props }: React.PropsWithChildren<Props>) => {
	return (
		<main
			className={cn('flex flex-col px-8 pt-4 pb-0 md:flex-1', className)}
			style={{ width: 'calc(100vw - 1rem)' }}
			{...props}
		>
			{children}
		</main>
	)
})
