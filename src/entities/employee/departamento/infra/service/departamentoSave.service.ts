import { fetching } from '@/shared/api/api'
import { type DepartamentoSaveRepository } from '../../domain/repository/DepartamentoSaveRepository'
import { type DepartamentoPrimitives } from '../../domain/dto/Departamento.dto'
import { departamentoUrl } from '../../domain/entity/baseUrl'

export class DepartamentoSaveService implements DepartamentoSaveRepository {
	async save({ payload }: { payload: DepartamentoPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: departamentoUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: DepartamentoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${departamentoUrl}/${id}`,
			data: payload
		})
	}
}
