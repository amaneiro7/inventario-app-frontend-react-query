import { memo, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { ActionMenu } from '@/widgets/ActionMenu'
import { Badge } from '@/shared/ui/Badge'
import { PermissionGroupDto } from '../../domain/dto/PermissionGroup.dto'
import { useNavigate } from 'react-router-dom'
import { useDeletePermissionGroup } from '../hooks/useDeletePermissionGroup'

interface PermissionGroupCardProps {
	permissionGroup: PermissionGroupDto
}

export const PermissionGroupCard = memo(({ permissionGroup }: PermissionGroupCardProps) => {
	const navigate = useNavigate()
	const { handleRemove } = useDeletePermissionGroup()

	const handleEdit = useCallback(() => {
		navigate(`/form/permission-groups/edit/${permissionGroup.id}`)
	}, [navigate, permissionGroup.id])

	const displayedPermissions = useMemo(
		() => permissionGroup.permissions.slice(0, 3),
		[permissionGroup.permissions]
	)

	return (
		<Card
			key={permissionGroup.id}
			className="border-t-azul w-fit max-w-lg rounded-lg border-t-2 bg-white shadow-lg"
		>
			<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
				<CardTitle className="text-azul mb-2 text-left text-lg font-bold">
					{permissionGroup.name}
				</CardTitle>
				<ActionMenu
					handleDelete={() => handleRemove(permissionGroup.id)}
					handleEdit={handleEdit}
				/>
			</CardHeader>
			<CardContent>
				<div className="mb-4 line-clamp-3 min-h-10 text-xs overflow-ellipsis text-zinc-400">
					{permissionGroup.description}
				</div>
				<div className="flex flex-col gap-2">
					<div className="text-xs font-medium tracking-wider text-zinc-500 uppercase">
						Permisos
					</div>
					<div className="flex flex-wrap gap-1">
						{displayedPermissions.map(perm => {
							return (
								<Badge
									key={perm.id}
									variant="secondary"
									className="bg-verde border-0 text-[10px] overflow-ellipsis text-white"
								>
									{perm?.name}
								</Badge>
							)
						})}
						{permissionGroup.permissions.length > 3 && (
							<Badge
								variant="secondary"
								className="border-0 bg-gray-200 text-[10px] text-gray-700"
							>
								+{permissionGroup.permissions.length - 3} más
							</Badge>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
})
