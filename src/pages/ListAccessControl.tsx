import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'

const AccessPolicyList = lazy(() =>
	import('@/entities/accessControl/accessPolicy/infra/ui/AccessPolicyList').then(m => ({
		default: m.AccessPolicyList
	}))
)
const PermissionList = lazy(() =>
	import('@/entities/accessControl/permission/infra/ui/PermissionList').then(m => ({
		default: m.PermissionList
	}))
)
const PermissionGroupList = lazy(() =>
	import('@/entities/accessControl/permissionGroup/infra/ui/PermissionGroupList').then(m => ({
		default: m.PermissionGroupList
	}))
)
export default function ListAccessControl() {
	const [searchParams, setSearchParams] = useSearchParams()
	const activeTab = searchParams.get('tab') || 'policies'

	const handleTabChange = (newTab: string) => {
		// Al cambiar de pestaña, solo conservamos el parámetro 'tab'
		// y eliminamos todos los demás (filtros, página, etc.).
		setSearchParams({ tab: newTab })
	}

	return (
		<>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="Error al cargar los filtros."
					/>
				)}
			>
				<Tabs
					value={activeTab}
					onValueChange={handleTabChange}
					className="w-full space-y-4"
				>
					<TabsList className="w-fit">
						<TabsTrigger value="policies">Politicas de accesso</TabsTrigger>
						<TabsTrigger value="groups">Grupo de permisos</TabsTrigger>
						<TabsTrigger value="permissions">Permisos</TabsTrigger>
					</TabsList>
					<TabsContent value="policies">
						<ErrorBoundary
							fallback={({ onReset }) => (
								<WidgetErrorFallback
									onReset={onReset}
									message="No se pudieron cargar las políticas de acceso."
								/>
							)}
						>
							<Suspense fallback={<TableSkeleton />}>
								<AccessPolicyList />
							</Suspense>
						</ErrorBoundary>
					</TabsContent>
					<TabsContent value="groups">
						<ErrorBoundary
							fallback={({ onReset }) => (
								<WidgetErrorFallback
									onReset={onReset}
									message="No se pudieron cargar los grupos de permisos."
								/>
							)}
						>
							<Suspense fallback={<TableSkeleton />}>
								<PermissionGroupList />
							</Suspense>
						</ErrorBoundary>
					</TabsContent>
					<TabsContent value="permissions">
						<ErrorBoundary
							fallback={({ onReset }) => (
								<WidgetErrorFallback
									onReset={onReset}
									message="No se pudieron cargar los permisos."
								/>
							)}
						>
							<Suspense fallback={<TableSkeleton />}>
								<PermissionList />
							</Suspense>
						</ErrorBoundary>
					</TabsContent>
				</Tabs>
			</ErrorBoundary>
		</>
	)
}
