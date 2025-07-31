import React, { useImperativeHandle, forwardRef, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCloseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { CloseIcon } from '@/icon/CloseIcon'

type Props = React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export interface FilterAsideRef {
	handleOpen: (event: React.MouseEvent) => void
}

const Component = (
	{ children, ...props }: Props,
	ref: React.Ref<FilterAsideRef>
): React.ReactPortal => {
	const filterAsideRef = useRef<HTMLElement>(null)
	const [open, setOpen] = useState(false)

	const handleOpen = useCallback((event: React.MouseEvent) => {
		event.stopPropagation()
		event.preventDefault()
		setOpen(true)
	}, [])

	const handleClose = useCallback(() => {
		setOpen(false)
	}, [])

	useImperativeHandle(ref, () => ({
		handleOpen
	}))

	useCloseClickOrEscape({ open, onClose: handleClose, ref: filterAsideRef })

	return createPortal(
		<aside
			id="aside-filters"
			ref={filterAsideRef}
			data-open={open}
			className={`filterAsideTransition absolute top-20 right-0 z-20 mb-2 hidden w-96 max-w-sm min-w-fit flex-col gap-4 rounded-lg border bg-white p-4 pl-8 shadow-lg drop-shadow-md will-change-transform ${open ? 'open' : 'close'}`}
			aria-modal
			aria-labelledby="filter-heading"
			role="dialog"
			{...props}
		>
			<button
				className="top-0 left-0 z-30 block self-start p-1"
				onClick={handleClose}
				title="Cerrar panel de filtros"
				tabIndex={1}
				aria-label="Cerrar Filtros"
			>
				<CloseIcon className="h-8 w-8 rounded-full p-1 text-gray-800/55 transition-colors hover:bg-gray-200" />
			</button>
			<div
				className="flex h-full w-full flex-col gap-4 overflow-auto overscroll-auto p-1 pr-6"
				id="filter-content"
			>
				{children}
			</div>
		</aside>,
		document.body
	)
}

export const FilterAside = forwardRef(Component)
