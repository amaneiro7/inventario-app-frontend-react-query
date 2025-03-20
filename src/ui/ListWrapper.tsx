import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { PageTitle } from './PageTitle'

const ListWrapper = memo(() => {
	return (
		<>
			<PageTitle title="por definir" />
			<DetailsBoxWrapper>
				<Outlet />
			</DetailsBoxWrapper>
		</>
	)
})

export default ListWrapper
