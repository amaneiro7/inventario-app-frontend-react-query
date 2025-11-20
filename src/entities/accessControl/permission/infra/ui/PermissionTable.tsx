import { lazy, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { ActionMenu } from '@/widgets/ActionMenu'
import { PermissionRemover } from '../../application/PermissionRemover'
import { PermissionDeleteService } from '../service/permissionDelete.service'
import { type PermissionDto } from '../../domain/dto/Permission.dto'

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

interface PermissionTableProps {
	permissions?: PermissionDto[]
	isError: boolean
}

export const PermissionTable = memo(({ isError, permissions }: PermissionTableProps) => {
	const { events } = useAuthStore.getState()
	const remove = new PermissionRemover(new PermissionDeleteService(), events)
	const navigate = useNavigate()

	const handleEdit = (id: string) => {
		navigate(`/form/permission/edit/${id}`)
	}

	const handleRemove = async (id: string) => {
		await remove.execute({ id })
	}

	if (isError) {
		return <TableCellError />
	}
	if (permissions && permissions.length === 0) {
		return <TableCellEmpty />
	}
	return (
		<>
			{permissions?.map(permission => {
				return (
					<TableRow key={permission.id}>
						<TableCell aria-colindex={1} size="small" value={permission.name}>
							{permission.name}
						</TableCell>
						<TableCell aria-colindex={2} size="xLarge" value={permission.description}>
							{permission.description}
						</TableCell>
						<TableCell aria-colindex={6} size="xSmall">
							<ActionMenu
								handleEdit={() => handleEdit(permission.id)}
								handleDelete={() => handleRemove(permission.id)}
							/>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
})

PermissionTable.displayName = 'PermissionTable'
