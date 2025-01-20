import { Brand } from '../domain/entity/Brand'
import { BrandId } from '../domain/value-object/BrandId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type BrandPrimitives } from '../domain/dto/BrandPrimitives.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandSaveRepository } from '../domain/repository/BrandSaveRepository'

export class BrandCreator {
    constructor(
        readonly repository: BrandSaveRepository,
        private readonly events: EventManager
    ) { }

    async create(params: BrandPrimitives & { id: Primitives<BrandId> }) {
        try {
            const payload = Brand.create(params).toPrimitives()
            if (!params.id) {
                return await this.repository.save({ payload })
                    .then(res => {
                        this.events.notify({ type: 'success', message: res.message })
                        return res
                    })
            } else {
                const brandId = new BrandId(params.id).value
                return await this.repository.update({ id: brandId, payload })
                    .then(res => {
                        this.events.notify({ type: 'success', message: res.message })
                        return res
                    })
            }
        } catch (error) {
            this.events.notify({ type: 'error', message: `${error}` })
        }

    }
}
