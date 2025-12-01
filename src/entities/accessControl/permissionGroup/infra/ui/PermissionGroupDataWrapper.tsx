import { lazy, memo } from 'react'
import { useGetAllPermissionGroups } from '../hooks/useGetAllPermissionGroup'
import { type PermissionGroupFilters } from '../../application/createPermissionGroupQueryParams'
import { PermissionGroupGetByCriteria } from '../../application/PermissionGroupGetByCriteria'
import { PermissionGroupCard } from './PermissionGroupCard'

const PaginationBar = lazy(() =>
	import('@/shared/ui/Pagination/PaginationBar').then(m => ({ default: m.PaginationBar }))
)
const TabsNav = lazy(() => import('@/shared/ui/Tabs/TabsNav').then(m => ({ default: m.TabsNav })))

interface PermissionGroupDataWrapperProps {
	query: PermissionGroupFilters
	handlePageSize: (pageSize: number) => void
	handlePageClick: ({ selected }: { selected: number }) => void
	handleSort: (field: string) => Promise<void>
	handleChange: (name: string, value: string | number) => void
}

export const PermissionGroupDataWrapper = memo(
	({ handlePageClick, handlePageSize, query }: PermissionGroupDataWrapperProps) => {
		const { data: permissionGroups, isError, isLoading } = useGetAllPermissionGroups(query)
		if (isError) {
			return (
				<div
					className="text-rojo-600 p-8 text-center font-medium"
					role="alert"
					aria-live="assertive"
				>
					<p>¡Ups! No se pudo cargar la información de las ubicaciones.</p>
					<p>Por favor, verifica tu conexión o intenta de nuevo más tarde.</p>
				</div>
			)
		}
		return (
			<>
				{/* Pagination Bar - show only when data is loaded and not empty */}

				{permissionGroups && !isLoading && !isError && permissionGroups.info?.total > 0 && (
					<PaginationBar
						registerOptions={PermissionGroupGetByCriteria.pageSizeOptions}
						totalPages={permissionGroups?.info?.totalPage}
						total={permissionGroups?.info?.total}
						currentPage={permissionGroups?.info?.page}
						pageSize={query.pageSize}
						handlePageClick={handlePageClick}
						handlePageSize={handlePageSize}
					/>
				)}

				{/* Tabs Navigation - assuming it's related to filtering/view options */}

				<TabsNav
					isLoading={isLoading}
					total={permissionGroups?.info?.total}
					pageSize={query.pageSize}
					pageNumber={query.pageNumber}
					defaultPageSize={PermissionGroupGetByCriteria.defaultPageSize}
				/>

				<section className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
					{permissionGroups?.data.map(group => (
						<PermissionGroupCard key={group.id} permissionGroup={group} />
					))}
				</section>
			</>
		)
	}
)

PermissionGroupDataWrapper.displayName = 'PermissionGroupDataWrapper'
