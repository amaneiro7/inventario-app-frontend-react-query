import { Location } from '../domain/entity/Location'
import { LocationId } from '../domain/value-object/LocationId'
import { type EventManager } from '@/core/shared/domain/Observer/EventManager'
import { type LocationSaveRepository } from '../domain/repository/LocationSaveRepository'
import { type Location as LocationParams } from '../domain/dto/Location.dto'

export class LocationCreator {
  constructor(
    readonly repository: LocationSaveRepository,
    private readonly events: EventManager
  ) {}

  async create(params: LocationParams) {
    try {
      const payload = Location.create(params).toPrimitives()
      if (!params.id) {
        return await this.repository.save({ payload }).then((res) => {
          this.events.notify({ type: 'success', message: res.message })
          return res
        })
      } else {
        const locationId = new LocationId(params.id).value
        return await this.repository
          .update({ id: locationId, payload })
          .then((res) => {
            this.events.notify({ type: 'success', message: res.message })
            return res
          })
      }
    } catch (error) {
      this.events.notify({ type: 'error', message: `${error}` })
    }
  }
}
