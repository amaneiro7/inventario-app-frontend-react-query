import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { PermissionRemover } from '../../application/PermissionRemover'
import { PermissionDeleteService } from '../service/permissionDelete.service'
import { queryClient } from '@/shared/lib/queryCliente'

const repository = new PermissionDeleteService()
const permissionRemover = new PermissionRemover(repository, useAuthStore.getState().events)
export const useDeletePermission = () => {
	const handleRemove = async (id: string) => {
		await permissionRemover.execute({ id })
		queryClient.invalidateQueries({ queryKey: ['permissions'] })
	}

	return { handleRemove }
}
