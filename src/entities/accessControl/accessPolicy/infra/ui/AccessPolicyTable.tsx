import { lazy, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { ActionMenu } from '@/widgets/ActionMenu'
import { AccessPolicyRemover } from '../../application/AccessPolicyRemover'
import { AccessPolicyDeleteService } from '../service/accessPolicyDelete.service'
import { type AccessPolicyDto } from '../../domain/dto/AccessPolicy.dto'

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
	const { events } = useAuthStore.getState()
	const remove = new AccessPolicyRemover(new AccessPolicyDeleteService(), events)
	const navigate = useNavigate()

	const handleEdit = (id: string) => {
		navigate(`/form/access-policy/edit/${id}`)
	}

	const handleRemove = async (id: string) => {
		await remove.execute({ id })
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
				return (
					<TableRow key={accessPolicy.id}>
						<TableCell aria-colindex={1} size="small" value={accessPolicy.name}>
							{accessPolicy.name}
						</TableCell>
						<TableCell aria-colindex={2} size="small" value={accessPolicy.priority}>
							{accessPolicy.priority}
						</TableCell>
						<TableCell
							aria-colindex={3}
							size="small"
							value={accessPolicy.departamento?.name}
						>
							{accessPolicy.departamento?.name}
						</TableCell>
						<TableCell aria-colindex={4} size="small" value={accessPolicy.cargo?.name}>
							{accessPolicy.cargo?.name}
						</TableCell>
						<TableCell
							aria-colindex={5}
							size="small"
							value={accessPolicy.permissionGroup?.name}
						>
							{accessPolicy.permissionGroup?.name}
						</TableCell>
						<TableCell aria-colindex={6} size="xSmall">
							<ActionMenu
								handleEdit={() => handleEdit(accessPolicy.id)}
								handleDelete={() => handleRemove(accessPolicy.id)}
							/>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
})

AccessPolicyTable.displayName = 'AccessPolicyTable'
