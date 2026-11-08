import { lazy, memo, Suspense, type PropsWithChildren } from 'react'

const Header = lazy(() => import('./Header').then(m => ({ default: m.Header })))
const Main = lazy(() => import('./Main').then(m => ({ default: m.Main })))
const Footer = lazy(() => import('./Footer').then(m => ({ default: m.Footer })))

export const PrivateLayout = memo(({ children }: PropsWithChildren) => {
	return (
		<>
			<Suspense
				fallback={
					<header>
						<section className="border-naranja min-h-10 bg-gray-200" />
						<section className="bg-azul min-h-16" />
					</header>
				}
			>
				<Header />
			</Suspense>
			<Suspense fallback={<main className="flex flex-1 bg-gray-100" />}>
				<Main>{children}</Main>
			</Suspense>
			<Suspense fallback={<footer className="h-8 min-h-8 bg-slate-700" />}>
				<Footer />
			</Suspense>
		</>
	)
})
