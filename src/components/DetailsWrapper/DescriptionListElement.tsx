import { lazy, memo } from 'react'
// import { type DescriptionDesc } from "./DescriptionDesc"
// import { type EditHandle } from "../../page/user-management/profile/EditHandle"
// import { type ResetHandle } from "../../page/user-management/profile/Resethandle"
// import { type DeleteHandle } from "../../page/user-management/profile/Deletehandle"

const DescriptionTitle = lazy(async () =>
	import('./DescriptionTitle').then(m => ({ default: m.DescriptionTitle }))
)

interface Props
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	children?: React.ReactElement | null
	// children?: React.ReactElement<typeof DescriptionDesc | typeof EditHandle | typeof ResetHandle | typeof DeleteHandle>
}
export const DescriptionListElement = memo(({ title, children }: Props) => {
	return (
		<div className="grid min-h-10 grid-cols-3 items-center justify-center gap-4 overflow-hidden px-4 py-2">
			<DescriptionTitle title={title} />
			{children}
		</div>
	)
})
