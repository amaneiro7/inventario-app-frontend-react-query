import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { LazyLogoImage } from '@/shared/ui/Images/LazyLogoImage'
import Typography from '@/shared/ui/Typography'

export const PublicHeader = memo(({ title, subtitle }: { title: string; subtitle: string }) => {
	return (
		<header className="border-b border-gray-200 bg-white shadow-xs">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<div className="flex items-center gap-3">
					<LazyLogoImage className="h-10 w-auto" width="40" height="40" />
					<div>
						<Typography
							variant="h4"
							weight="bold"
							color="azul"
							className="leading-tight"
						>
							{title}
						</Typography>
						<Typography variant="p" className="text-gray-500">
							{subtitle}
						</Typography>
					</div>
				</div>

				<Link
					to="/login"
					className="hover:text-azul-700 flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
				>
					<ArrowLeft className="h-4 w-4" />
					<span>Volver al Login</span>
				</Link>
			</div>
		</header>
	)
})

PublicHeader.displayName = 'PublicHeader'
