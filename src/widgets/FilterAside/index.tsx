import React, {
	useImperativeHandle,
	forwardRef,
	useRef,
	useState,
	useCallback,
	useEffect
} from 'react'
import { createPortal } from 'react-dom'
import { useCloseClickOrEscape } from '@/shared/lib/hooks/useCloseClickOrEscape'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'

type Props = React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export interface FilterAsideRef {
	handleOpen: () => void
}

const Component = (
	{ children, ...props }: Props,
	ref: React.Ref<FilterAsideRef>
): React.ReactPortal | null => {
	const asideRef = useRef<HTMLElement>(null)
	const triggerRef = useRef<HTMLElement | null>(null)
	const [open, setOpen] = useState(false)

	const handleOpen = useCallback(() => {
		triggerRef.current = document.activeElement as HTMLElement
		setOpen(true)
	}, [])

	const handleClose = useCallback(() => {
		setOpen(false)
		triggerRef.current?.focus()
	}, [])

	useImperativeHandle(
		ref,
		() => ({
			handleOpen
		}),
		[handleOpen]
	)

	useEffect(() => {
		if (open) {
			asideRef.current?.focus()
		}
	}, [open])

	useCloseClickOrEscape({ open, onClose: handleClose, ref: asideRef })

	return createPortal(
		<aside
			id="aside-filters"
			ref={asideRef}
			data-open={open}
			className={`filterAsideTransition fixed top-20 right-0 z-50 mb-2 flex w-96 max-w-sm min-w-fit flex-col gap-4 rounded-lg border bg-white p-4 pl-6 shadow-xl transition-transform duration-300 ease-in-out will-change-transform ${open ? 'open' : 'close'}`}
			aria-modal
			aria-labelledby="filter-heading"
			role="dialog"
			tabIndex={-1}
			{...props}
		>
			<header className="flex items-center justify-between">
				<button
					onClick={handleClose}
					title="Cerrar panel de filtros"
					aria-label="Cerrar Filtros"
					className="top-0 left-0 z-30 block cursor-pointer self-start p-1"
				>
					<CloseIcon className="h-8 w-8 rounded-full p-1 text-gray-800/55 transition-colors hover:bg-gray-200" />
				</button>
			</header>
			<div
				className="flex h-full w-full flex-col gap-4 overflow-auto overscroll-auto p-1 pr-4"
				id="filter-content"
			>
				{children}
			</div>
		</aside>,
		document.body
	)
}

export const FilterAside = forwardRef(Component)
