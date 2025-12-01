import { lazy, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteAccessPolicy } from '../hooks/useDeleteAccessPolicy'
import { ActionMenu } from '@/widgets/ActionMenu'
import { type AccessPolicyDto } from '../../domain/dto/AccessPolicy.dto'
import { Badge } from '@/shared/ui/Badge'

const TableCell = lazy(() =>
	import('@/shared/ui/Table/TableCell').then(m => ({ default: m.TableCell }))
)
const TableRow = lazy(() =>
	import('@/shared/ui/Table/TableRow').then(m => ({ default: m.TableRow }))
)
const TableCellError = lazy(() =>
	import('@/shared/ui/Table/TableCellError').then(m => ({ default: m.TableCellError }))
)
const TableCellEmpty = lazy(() =>
	import('@/shared/ui/Table/TableCellEmpty').then(m => ({ default: m.TableCellEmpty }))
)

interface AccessPolicyTableProps {
	accessPolicies?: AccessPolicyDto[]
	isError: boolean
}

export const AccessPolicyTable = memo(({ isError, accessPolicies }: AccessPolicyTableProps) => {
	const { handleRemove } = useDeleteAccessPolicy()
	const navigate = useNavigate()

	const handleEdit = (id: string) => {
		navigate(`/form/access-policy/edit/${id}`)
	}

	if (isError) {
		return <TableCellError />
	}
	if (accessPolicies && accessPolicies.length === 0) {
		return <TableCellEmpty />
	}
	return (
		<>
			{accessPolicies?.map(accessPolicy => {
				const MAX_DISPLAYED_GROUPS = 2
				const displayedGroups = accessPolicy.permissionsGroups.slice(
					0,
					MAX_DISPLAYED_GROUPS
				)
				const remainingGroupsCount =
					accessPolicy.permissionsGroups.length - MAX_DISPLAYED_GROUPS
				return (
					<TableRow key={accessPolicy.id}>
						<TableCell aria-colindex={1} size="medium" value={accessPolicy.name}>
							{accessPolicy.name}
						</TableCell>
						<TableCell aria-colindex={2} size="small" value={accessPolicy.priority}>
							{accessPolicy.priority}
						</TableCell>
						<TableCell
							aria-colindex={3}
							size="auto"
							value={accessPolicy.departamento?.name}
						>
							{accessPolicy.departamento?.name}
						</TableCell>
						<TableCell aria-colindex={4} size="large" value={accessPolicy.cargo?.name}>
							{accessPolicy.cargo?.name}
						</TableCell>
						<TableCell
							aria-colindex={5}
							size="xxLarge"
							value={accessPolicy.permissionsGroups.map(pg => pg.name).join(', ')}
						>
							<div className="flex flex-wrap gap-1 py-1">
								{displayedGroups.map(permissionGroup => (
									<Badge key={permissionGroup.id} variant="verde">
										{permissionGroup.name}
									</Badge>
								))}
								{remainingGroupsCount > 0 && (
									<Badge
										variant="secondary"
										className="cursor-default border-0 bg-gray-200 text-[10px] text-gray-700"
										title={accessPolicy.permissionsGroups
											.slice(MAX_DISPLAYED_GROUPS)
											.map(p => p.name)
											.join(', ')}
									>
										+{remainingGroupsCount} más
									</Badge>
								)}
							</div>
						</TableCell>
						<TableCell aria-colindex={6} size="xSmall">
							<div className="flex justify-end pt-1 pr-2">
								<ActionMenu
									handleEdit={() => handleEdit(accessPolicy.id)}
									handleDelete={() => handleRemove(accessPolicy.id)}
								/>
							</div>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
})

AccessPolicyTable.displayName = 'AccessPolicyTable'
