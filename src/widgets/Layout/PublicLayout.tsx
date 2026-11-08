import { memo } from 'react'
import { Footer } from './Footer'
import { PublicHeader } from './PublicHeader'

export const PublicLayout = memo(
	({
		title,
		subtitle,
		children
	}: React.PropsWithChildren<{
		title: string
		subtitle: string
	}>) => {
		return (
			<>
				<PublicHeader title={title} subtitle={subtitle} />
				<main className="formLogin">
					<div className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
						{children}
					</div>
				</main>
				<Footer />
			</>
		)
	}
)

PublicLayout.displayName = 'PublicLayout'
