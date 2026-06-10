import { useQuery } from '@tanstack/react-query'
import { MigrationRuleGetter } from '../../application/MigrationRuleGetter'
import { MigrationRuleGetService } from '../service/migrationRuleGet.service'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { MigrationRuleId } from '../../domain/value-object/MigrationRuleId'

const get = new MigrationRuleGetter(new MigrationRuleGetService())

export function useGetMigrationRule({ id }: { id: Primitives<MigrationRuleId> }) {
	const { data, isLoading, isError, ...results } = useQuery({
		queryKey: ['migrationRule', id],
		queryFn: () => get.execute({ id })
	})

	return {
		data,
		isLoading,
		isError,
		...results
	}
}
