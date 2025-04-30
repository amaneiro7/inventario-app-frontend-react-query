import React, { useImperativeHandle, forwardRef, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCloseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { CloseIcon } from '@/icon/CloseIcon'
import './filterContainerStyle.css'

/**
 * @interface Props
 * @description Props for the {@link Component} (inner component of {@link FilterAside}).
 * Extends React's PropsWithChildren and includes standard HTML div attributes.
 */
type Props = React.PropsWithChildren<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>
/**
 * @interface FilterAsideRef
 * @description Interface for the ref object exposed by the {@link FilterAside} component.
 * @property {function(event: React.MouseEvent): void} handleOpen - A function to programmatically open the filter aside panel.
 */
export interface FilterAsideRef {
	handleOpen: (event: React.MouseEvent) => void
}
/**
 * @component
 * @private
 * @param {Props} props - The component's props.
 * @param {React.Ref<FilterAsideRef>} ref - The ref forwarded to this component.
 * @returns {React.ReactPortal} A React portal rendering the filter aside in the document body.
 * @description Inner component of {@link FilterAside} responsible for rendering the filter aside panel.
 * It uses a React portal to render the aside directly within the document body, outside of the normal DOM hierarchy.
 * It handles the open/close state and uses a custom hook for closing on outside click or escape key.
 */
const Component = (
	{ children, ...props }: Props,
	ref: React.Ref<FilterAsideRef>
): React.ReactPortal => {
	const filterAsideRef = useRef<HTMLElement>(null)
	const [open, setOpen] = useState(false)
	/**
	 * @function handleOpen
	 * @param {React.MouseEvent} event - The mouse event that triggered the opening of the panel.
	 * @description Opens the filter aside panel by setting the `open` state to true.
	 * It also prevents event propagation and default behavior of the triggering element.
	 */
	const handleOpen = useCallback((event: React.MouseEvent) => {
		event.stopPropagation()
		event.preventDefault()
		setOpen(true)
	}, [])
	/**
	 * @function handleClose
	 * @description Closes the filter aside panel by setting the `open` state to false.
	 */
	const handleClose = useCallback(() => {
		setOpen(false)
	}, [])
	/**
	 * @hook useImperativeHandle
	 * @description Exposes the `handleOpen` function through the ref object.
	 * This allows parent components to programmatically control the opening of the filter aside.
	 */
	useImperativeHandle(ref, () => ({
		handleOpen
	}))
	/**
	 * @hook useCloseClickOrEscape
	 * @description Custom hook that handles closing the filter aside when a click occurs outside the panel
	 * or when the Escape key is pressed.
	 * @param {object} - An object containing the `open` state, the `onClose` handler, and the `ref` to the filter aside element.
	 */
	useCloseClickOrEscape({ open, onClose: handleClose, ref: filterAsideRef })

	return createPortal(
		<aside
			id="aside-filters"
			ref={filterAsideRef}
			data-open={open}
			className={`filterAside shadow-lg drop-shadow-md ${open ? 'open' : 'close'}`}
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
/**
 * @component
 * @forwardRef
 * @param {Props} props - The component's props (passed to the inner {@link Component}).
 * @param {React.Ref<FilterAsideRef>} ref - A ref that can be attached to this component to access its imperative handle.
 * @returns {React.ReactPortal | null} A React portal rendering the filter aside, or null if not mounted.
 * @description A component that renders a filter aside panel using a React portal.
 * The panel is rendered directly within the document body and can be opened programmatically
 * using a ref and the `handleOpen` function. It also handles closing via a close button,
 * clicks outside the panel, and the Escape key.
 */
export const FilterAside = forwardRef(Component)
