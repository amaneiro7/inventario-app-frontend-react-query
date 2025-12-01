import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { AccessPolicyRemover } from '../../application/AccessPolicyRemover'
import { AccessPolicyDeleteService } from '../service/accessPolicyDelete.service'
import { queryClient } from '@/shared/lib/queryCliente'

const repository = new AccessPolicyDeleteService()
const accessPolicyRemover = new AccessPolicyRemover(repository, useAuthStore.getState().events)
export const useDeleteAccessPolicy = () => {
	const handleRemove = async (id: string) => {
		await accessPolicyRemover.execute({ id })
		queryClient.invalidateQueries({ queryKey: ['accessPolicies'] })
	}

	return { handleRemove }
}
