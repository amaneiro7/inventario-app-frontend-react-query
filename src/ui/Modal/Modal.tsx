import { useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

export interface ModalRef {
	handleClose: () => void
	handleOpen: () => void
}

export function Dialog({ children, ref }: React.PropsWithChildren<{ ref: React.Ref<ModalRef> }>) {
	const modalRef = useRef<HTMLDialogElement>(null)

	useImperativeHandle(
		ref,
		() => {
			return {
				handleOpen() {
					modalRef.current?.showModal()
				},
				handleClose() {
					modalRef.current?.close()
				}
			}
		},
		[]
	)

	return (
		<>
			{createPortal(
				<dialog
					ref={modalRef}
					className="modalDialog w-1/2 shadow-lg shadow-slate-500 rounded backdrop:bg-black/35"
				>
					{children}
				</dialog>,
				document.body
			)}
		</>
	)
}
