import { EventContext } from '@/context/EventManager/EventContext'
import { BrandCreator } from '@/core/brand/application/BrandCreator'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'
import { BrandSaveService } from '@/core/brand/infra/brandSave.service'
import { queryClient } from '@/lib/queryCliente'
import { useMutation } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'

export function useCreateBrand(defaulState: BrandParams) {
	const { events } = useContext(EventContext)
	const repository = useMemo(() => new BrandSaveService(), [])
	const save = useMemo(() => new BrandCreator(repository, events), [repository])
	const { mutate } = useMutation({
		mutationFn: save.create,
		onError: error => {
			console.error(error)
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['brands']
			})
		}
	})
}
