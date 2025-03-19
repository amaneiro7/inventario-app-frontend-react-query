export function InfoBox({ children }: React.PropsWithChildren) {
	return (
		<div className="w-fit max-w-lg bg-white rounded-lg shadow-lg p-4 border-t-2 border-t-azul">
			<div className="flex flex-col">{children}</div>
			<div />
		</div>
	)
}
