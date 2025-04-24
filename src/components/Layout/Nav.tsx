import { Link } from 'react-router-dom'
import { navigation } from '@/routes/navigation'
import { HomeIcon } from '@/icon/HomeIcon'
import Typography from '../Typography'
import { ArrowRightBadgeIcon } from '@/icon/ArrowRightBadge'
import { Calendar } from 'lucide-react'

export function Nav() {
	return (
		<nav
			id="main-navigation"
			style={{
				height: 'calc(100vh - 64px)'
			}}
			className="nav-content bg-azul-950/95 fixed top-16 -right-96 z-40 w-96 max-w-2/3 transform-gpu overflow-auto px-8 py-4 text-white transition-transform duration-300 ease-in-out will-change-transform"
		>
			<ul>
				<li className="list-item">
					<Link
						to="/"
						className="group/navli font-body hover:text-naranja flex items-center text-center text-base font-semibold tracking-wide transition-colors"
					>
						<HomeIcon className="group-hover/navli:fill-naranja mr-4 h-4 w-4 fill-white transition-colors" />
						Inicio
					</Link>
				</li>
				<li className="list-item">
					<Link
						to="/payment-schedules"
						className="group/navli font-body hover:text-naranja flex items-center text-center text-base font-semibold tracking-wide transition-colors"
					>
						<Calendar className="group-hover/navli:fill-naranja mr-4 h-4 w-4 fill-white transition-colors" />
						Calendarios de pagos
					</Link>
				</li>
			</ul>
			{navigation.map(nav => (
				<ul key={nav.label}>
					<li>
						<Typography variant="p" weight="semibold" key={nav.label}>
							{nav.label}
						</Typography>
						<ul className="mt- mb-3">
							{nav.navs.map((item, index) => (
								<li key={index} className="list-item">
									<Link
										to={item.path}
										className="font-body hover:text-naranja flex h-8 items-center px-4 py-2 text-center text-sm font-semibold tracking-wide transition-colors"
										aria-label={item.title}
										aria-description={item.desc}
									>
										<ArrowRightBadgeIcon className="text-naranja aspect-square w-4" />
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</li>
				</ul>
			))}
		</nav>
	)
}
