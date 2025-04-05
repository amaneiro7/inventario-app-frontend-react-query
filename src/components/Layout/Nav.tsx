import { Link } from 'react-router-dom'
import { navigation } from '@/routes/navigation'
import { HomeIcon } from '@/icon/HomeIcon'
import Typography from '../Typography'
import { ArrowRightBadgeIcon } from '@/icon/ArrowRightBadge'

export function Nav() {
	return (
		<nav
			style={{
				height: 'calc(100vh - 64px)'
			}}
			className="nav-content -right-96 fixed top-16 px-8 py-4 max-w-2/3 w-96 z-40 text-white bg-azul-950/95 transition-transform transform-gpu will-change-transform duration-300 ease-in-out overflow-auto"
		>
			<ul>
				<li className="list-item">
					<Link
						to="/"
						className="group/navli font-body text-base text-center tracking-wide font-semibold flex items-center hover:text-naranja transition-colors"
					>
						<HomeIcon className="group-hover/navli:fill-naranja mr-4 transition-colors w-4 h-4 fill-white" />
						Inicio
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
										className="font-body text-sm text-center tracking-wide h-8 px-4 py-2 font-semibold flex items-center hover:text-naranja transition-colors"
										aria-label={item.title}
										aria-description={item.desc}
									>
										<ArrowRightBadgeIcon className="text-naranja w-4 aspect-square" />
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
