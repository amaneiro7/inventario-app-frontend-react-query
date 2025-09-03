import { Link } from 'react-router-dom'

interface CardLinkProps {
	text?: string
	url: string
}

export const CardLink = ({ url, text, children }: React.PropsWithChildren<CardLinkProps>) => {
	return (
		<Link
			className="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-auto flex-col items-center justify-center gap-2 space-y-2 rounded-md border px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
			to={url}
		>
			{text}
			{children}
		</Link>
	)
}
