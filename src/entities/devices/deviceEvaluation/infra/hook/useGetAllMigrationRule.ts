import { useQuery } from '@tanstack/react-query'
import { MigrationRuleGetByCriteria } from '../../application/MigrationRuleGetByCriteria'
import { MigrationRuleGetAllService } from '../service/migrationRuleGetAll.service'
import type { MigrationRuleFilters } from '../../application/createMigrationRuleQueryParams'

const getAll = new MigrationRuleGetByCriteria(new MigrationRuleGetAllService())

export const useGetAllMigrationRules = (query: MigrationRuleFilters) => {
	const { isLoading, refetch, isError, data, ...results } = useQuery({
		queryKey: ['migrationRules', query],
		queryFn: () => getAll.search(query)
	})

	return {
		isLoading,
		refetch,
		isError,
		data,
		...results
	}
}
