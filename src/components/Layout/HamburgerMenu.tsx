import { memo, useRef } from 'react'
import { useCloseNavOnRouteChangeOrEscpae } from '@/hooks/utils/useCloseNavOnRouteChangeOrEscape'
import './HamburgerMenu.css'

export const HamburgerMenu = memo(() => {
	const navToggleRef = useRef<HTMLInputElement>(null)
	useCloseNavOnRouteChangeOrEscpae(navToggleRef)

	return (
		<>
			<input type="checkbox" id="nav-toggle" aria-hidden hidden ref={navToggleRef} />
			<label
				className="hamburger hamburger--spin sr-only"
				htmlFor="nav-toggle"
				aria-haspopup
				aria-expanded={false}
				aria-label="Menú de navegación"
				aria-controls="main-navigation"
			>
				Menú de navegación
				<span className="hamburger-box">
					<span className="hamburger-inner bg-white before:bg-white after:bg-white" />
				</span>
			</label>
		</>
	)
})
HamburgerMenu.displayName = 'HamburgerMenu'
