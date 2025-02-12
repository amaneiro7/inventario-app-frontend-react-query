import { useRef } from 'react'
import { useCloseNavOnRouteChangeOrEscpae } from '@/hooks/utils/useCloseNavOnRouteChangeOrEscape'
import './HamburgerMenu.css'

export function HamburgerMenu() {
	const navToggleRef = useRef<HTMLInputElement>(null)
	useCloseNavOnRouteChangeOrEscpae(navToggleRef)

	return (
		<>
			<input type="checkbox" id="nav-toggle" aria-hidden hidden ref={navToggleRef} />
			<label
				className="hamburger hamburger--spin"
				htmlFor="nav-toggle"
				aria-haspopup
				aria-expanded={false}
			>
				<span className="hamburger-box">
					<span className="hamburger-inner bg-white before:bg-white after:bg-white" />
				</span>
			</label>
		</>
	)
}
