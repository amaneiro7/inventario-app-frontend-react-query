import { lazy, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteMigrationRule } from '../hook/useDeleteMigrationRule'
import { ActionMenu } from '@/widgets/ActionMenu'
import { Badge } from '@/shared/ui/Badge'
import { type MigrationRuleDto } from '../../domain/dto/MigrationRule.dto'

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

interface MigrationRuleTableProps {
	migrationRules?: MigrationRuleDto[]
	isError: boolean
}

export const MigrationRuleTable = memo(({ isError, migrationRules }: MigrationRuleTableProps) => {
	const { handleRemove } = useDeleteMigrationRule()
	const navigate = useNavigate()

	const handleEdit = (id: string) => {
		navigate(`/form/migration-rules/edit/${id}`)
	}

	if (isError) {
		return <TableCellError />
	}
	if (migrationRules && migrationRules.length === 0) {
		return <TableCellEmpty />
	}
	return (
		<>
			{migrationRules?.map(rule => {
				const MAX_DISPLAYED_GROUPS = 4
				const displayProcessors = rule.approvedProcessors.slice(0, MAX_DISPLAYED_GROUPS)
				const remainingProcessors = rule.approvedProcessors.length - MAX_DISPLAYED_GROUPS
				return (
					<TableRow key={rule.id}>
						<TableCell
							aria-colindex={1}
							size="small"
							value={rule.isActive ? 'Sí' : 'No'}
						>
							<Badge variant={rule.isActive ? 'verde' : 'rojo'}>
								{rule.isActive ? 'Sí' : 'No'}
							</Badge>
						</TableCell>
						<TableCell aria-colindex={2} size="small" value={rule.minRamGb}>
							{rule.minRamGb}
						</TableCell>
						<TableCell aria-colindex={3} size="small" value={rule.minDiskGb}>
							{rule.minDiskGb}
						</TableCell>
						<TableCell
							aria-colindex={4}
							size="auto"
							value={rule.approvedProcessors
								.slice(0, MAX_DISPLAYED_GROUPS)
								.map(pg => pg.name)
								.join(', ')}
						>
							<div className="flex flex-wrap gap-1 py-1">
								{displayProcessors.map(processors => (
									<Badge key={processors.id} variant="verde">
										{processors.name}
									</Badge>
								))}
								{remainingProcessors > 0 && (
									<Badge
										variant="secondary"
										className="cursor-default border-0 bg-gray-200 text-[10px] text-gray-700"
										title={rule.approvedProcessors
											.slice(MAX_DISPLAYED_GROUPS)
											.map(p => p.name)
											.join(', ')}
									>
										+{remainingProcessors} más
									</Badge>
								)}
							</div>
						</TableCell>
						<TableCell aria-colindex={5} size="xSmall">
							<div className="flex justify-end pt-1 pr-2">
								<ActionMenu
									handleEdit={() => handleEdit(rule.id)}
									handleDelete={() => handleRemove(rule.id)}
								/>
							</div>
						</TableCell>
					</TableRow>
				)
			})}
		</>
	)
})

MigrationRuleTable.displayName = 'MigrationRuleTable'
