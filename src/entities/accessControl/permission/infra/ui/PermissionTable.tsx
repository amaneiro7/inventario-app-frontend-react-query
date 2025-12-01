import { lazy, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionMenu } from '@/widgets/ActionMenu'
import { useDeletePermission } from '../hooks/useDeletePermission'
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
	const { handleRemove } = useDeletePermission()
	const navigate = useNavigate()

	const handleEdit = (id: string) => {
		navigate(`/form/permission/edit/${id}`)
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
						<TableCell aria-colindex={1} size="xxLarge" value={permission.name}>
							{permission.name}
						</TableCell>
						<TableCell aria-colindex={2} size="auto" value={permission.description}>
							{permission.description}
						</TableCell>
						<TableCell
							aria-colindex={6}
							size="xSmall"
							className="flex justify-end pt-1 pr-2"
						>
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
