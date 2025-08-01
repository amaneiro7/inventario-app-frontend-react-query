import { Link } from 'react-router-dom'
import { navigation } from '@/app/providers/routes/navigation'
import { HomeIcon } from '@/shared/ui/icon/HomeIcon'
import Typography from '../../shared/ui/Typography'
import { ArrowRightBadgeIcon } from '@/shared/ui/icon/ArrowRightBadge'
import { Calendar } from 'lucide-react'

export function Nav() {
	return (
		<nav
			id="main-navigation"
			aria-label="Main navigation"
			style={{
				height: 'calc(100vh - 64px)'
			}}
			className="nav-content bg-azul-950/95 fixed top-16 -right-96 z-40 w-96 max-w-2/3 transform-gpu overflow-auto px-8 py-4 text-white transition-transform duration-300 ease-in-out will-change-transform"
		>
			<ul className="space-y-2">
				{/* Home Link */}
				<li>
					<Link
						to="/"
						aria-current="page"
						className="group/navli font-body hover:text-naranja flex items-center text-center text-base font-semibold tracking-wide transition-colors"
					>
						<HomeIcon className="group-hover/navli:fill-naranja mr-4 h-4 w-4 fill-white transition-colors" />
						Inicio
					</Link>
				</li>
				{/* Payment Schedules Link */}
				<li>
					<Link
						to="/payment-schedules"
						className="group/navli font-body hover:text-naranja flex items-center text-center text-base font-semibold tracking-wide transition-colors"
					>
						<Calendar className="group-hover/navli:text-naranja mr-4 h-4 w-4 stroke-3 text-white transition-colors" />
						Calendarios de pagos
					</Link>
				</li>
			</ul>
			{/* Dynamic Navigation Sections */}
			{navigation.map((navGroup, groupIndex) => (
				<div key={navGroup.label} className="mt-4 first:mt-0">
					<Typography variant="p" weight="semibold" key={navGroup.label}>
						{navGroup.label}
					</Typography>
					<ul className="space-y-0" aria-labelledby={`nav-label-${groupIndex}`}>
						{navGroup.navs.map((item, itemindex) => (
							<li key={itemindex}>
								<Link
									to={item.path}
									className="font-body hover:text-naranja flex h-8 items-center px-4 py-2 text-center text-sm font-semibold tracking-wide transition-colors"
									aria-label={item.title}
									aria-description={item.desc}
									title={item.desc}
								>
									<ArrowRightBadgeIcon
										className="text-naranja group-hover/subnav:text-naranja mr-2 h-4 w-4 shrink-0 transition-colors"
										aria-hidden="true"
									/>
									{/* <ArrowRightBadgeIcon className="text-naranja aspect-square w-4" /> */}
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	)
}
