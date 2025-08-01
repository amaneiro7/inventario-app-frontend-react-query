import { memo, useRef } from 'react'
import { useCloseNavOnRouteChangeOrEscpae } from '@/shared/lib/hooks/useCloseNavOnRouteChangeOrEscape'
import './HamburgerMenu.css'

export const HamburgerMenu = memo(() => {
	const navToggleRef = useRef<HTMLInputElement>(null)
	useCloseNavOnRouteChangeOrEscpae(navToggleRef)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isExpanded = event.currentTarget.checked
		const labelElement = event.currentTarget.nextElementSibling as HTMLLabelElement | null
		if (labelElement) {
			labelElement.setAttribute('aria-expanded', String(isExpanded))
		}
		// También podrías actualizar el aria-expanded del menú de navegación en sí aquí
		const mainNavigation = document.getElementById('button-toggle')
		if (mainNavigation) {
			mainNavigation.setAttribute('aria-expanded', String(isExpanded))
		}
	}

	return (
		<>
			<input
				type="checkbox"
				id="nav-toggle"
				aria-hidden
				hidden
				ref={navToggleRef}
				role="switch"
				aria-checked={false}
				aria-label="Alternar menú de navegación"
				aria-controls="main-navigation"
				onChange={handleInputChange}
			/>
			<label
				id="button-toggle"
				className="hamburger hamburger--spin"
				htmlFor="nav-toggle"
				aria-label="Menú de navegación"
				aria-controls="nav-toggle"
			>
				<span className="hamburger-box">
					<span className="hamburger-inner bg-white before:bg-white after:bg-white" />
				</span>
			</label>
		</>
	)
})
HamburgerMenu.displayName = 'HamburgerMenu'
