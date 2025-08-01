import { cn } from '@/shared/lib/utils'

export function InfoBox({
	children,
	className,
	...props
}: React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
	return (
		<div
			className={cn(
				'border-t-azul w-fit max-w-lg rounded-lg border-t-2 bg-white p-4 shadow-lg',
				className
			)}
			{...props}
		>
			<div className="flex flex-col gap-1">{children}</div>
		</div>
	)
}
