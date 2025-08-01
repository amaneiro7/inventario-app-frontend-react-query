import { memo } from 'react'

export const TablePageWrapper = memo(({ children }: React.PropsWithChildren) => {
	return <div className="w-full flex flex-col justify-center">{children}</div>
})
