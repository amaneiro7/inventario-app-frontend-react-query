import { lazy, useImperativeHandle, forwardRef, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './filterContainerStyle.css'
import { useCLoseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'

const CloseIcon = lazy(async () => import('@/icon/CloseIcon').then(m => ({ default: m.CloseIcon })))

type Props = React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export interface FilterAsideRef {
	handleOpen: () => void
}

const Component = ({ children, ...props }: Props, ref: React.Ref<FilterAsideRef>) => {
	const filterAsideRef = useRef<HTMLElement>(null)
	const [open, setOpen] = useState(false)

	const handleOpen = useCallback(
		(event?: React.MouseEvent) => {
			event?.stopPropagation()
			setOpen(!open)
		},
		[open]
	)

	useImperativeHandle(ref, () => ({
		handleOpen
	}))

	useCLoseClickOrEscape({ open, onClose: handleOpen, ref: filterAsideRef })

	return createPortal(
		<aside
			ref={filterAsideRef}
			className={`filterAside drop-shadow-md shadow-lg ${open ? 'open' : 'close'}`}
			{...props}
		>
			<button
				className="block top-0 left-0 z-30 self-start p-1"
				onClick={handleOpen}
				title="Cerrar panel de filtros"
				tabIndex={1}
				aria-label="Cerrar Filtros"
			>
				<CloseIcon className="w-8 h-8 p-1 text-gray-800/55 rounded-full hover:bg-gray-200 transition-colors" />
			</button>
			<div className="p-1 w-full flex flex-col gap-4 overflow-auto overscroll-contain pr-6">
				{children}
			</div>
		</aside>,
		document.body
	)
}

export const FilterAside = forwardRef(Component)
