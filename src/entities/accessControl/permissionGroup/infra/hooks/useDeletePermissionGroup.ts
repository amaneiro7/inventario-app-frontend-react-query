import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { PermissionGroupRemover } from '../../application/PermissionGroupRemover'
import { PermissionGroupDeleteService } from '../service/permissionGroupDelete.service'
import { queryClient } from '@/shared/lib/queryCliente'

const repository = new PermissionGroupDeleteService()
const permissionGroupRemover = new PermissionGroupRemover(
	repository,
	useAuthStore.getState().events
)
export const useDeletePermissionGroup = () => {
	const handleRemove = async (id: string) => {
		await permissionGroupRemover.execute({ id })
		queryClient.invalidateQueries({ queryKey: ['permissionGroups'] })
	}

	return { handleRemove }
}
