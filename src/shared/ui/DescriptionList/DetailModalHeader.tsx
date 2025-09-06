import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'
import { LinkAsButton } from '../Button/LinkAsButton'
import { Pencil } from 'lucide-react'
import { CloseIcon } from '../icon/CloseIcon'

export const DetailModalHeader = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		onClose: () => void
		url: string
	}
>(({ className, children, url, onClose, ...props }, ref) => {
	return (
		<header
			ref={ref}
			className={cn('mb-4 flex items-start justify-between', className)}
			{...props}
		>
			{children}
			<div className="flex items-center gap-2">
				<LinkAsButton
					buttonSize="medium"
					color="blue"
					text="Editar"
					icon={<Pencil className="h-4 w-4" />}
					to={url}
				/>
				<button
					onClick={onClose}
					title="Cerrar"
					className="hover:bg-muted block cursor-pointer self-start rounded-full p-1 transition-colors"
				>
					<CloseIcon className="h-6 w-6" />
				</button>
			</div>
		</header>
	)
})

DetailModalHeader.displayName = 'DetailModalHeader'
