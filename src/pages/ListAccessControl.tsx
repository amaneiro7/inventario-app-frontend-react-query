import { AccessPolicyList } from '@/entities/accessControl/accessPolicy/infra/ui/AccessPolicyList'
import { PermissionList } from '@/entities/accessControl/permission/infra/ui/PermissionList'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { useState } from 'react'

export default function ListAccessControl() {
	const [activeTab, setActiveTab] = useState('policies')
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
					defaultValue="policies"
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full space-y-6"
				>
					<TabsList className="border border-zinc-800 bg-zinc-900 p-1">
						<TabsTrigger
							value="policies"
							className="text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
						>
							Politicas de accesso
						</TabsTrigger>
						<TabsTrigger
							value="groups"
							className="text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
						>
							Grupo de permisos
						</TabsTrigger>
						<TabsTrigger
							value="permissions"
							className="text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"
						>
							Permisos
						</TabsTrigger>
					</TabsList>
					<TabsContent value="policies">
						<AccessPolicyList />
					</TabsContent>
					<TabsContent value="groups">
						<DetailsBoxWrapper></DetailsBoxWrapper>
					</TabsContent>
					<TabsContent value="permissions">
						<PermissionList />
					</TabsContent>
				</Tabs>
			</ErrorBoundary>
		</>
	)
}
