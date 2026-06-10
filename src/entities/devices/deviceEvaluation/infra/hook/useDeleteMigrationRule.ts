import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { queryClient } from '@/shared/lib/queryClient'
import { MigrationRuleRemover } from '../../application/MigrationRuleRemover'
import { MigrationRuleDeleteService } from '../service/migrationRuleDelete.service'

const repository = new MigrationRuleDeleteService()
const migrationRuleRemover = new MigrationRuleRemover(repository, useAuthStore.getState().events)
export const useDeleteMigrationRule = () => {
	const handleRemove = async (id: string) => {
		await migrationRuleRemover.execute({ id })
		queryClient.invalidateQueries({ queryKey: ['migrationRules'] })
	}

	return { handleRemove }
}
