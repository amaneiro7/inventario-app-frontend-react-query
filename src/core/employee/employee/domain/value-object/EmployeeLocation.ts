import { AcceptedNullValueObject } from '@/core/shared/domain/value-objects/AcceptedNullValueObject'
import { type LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class EmployeeLocation extends AcceptedNullValueObject<Primitives<LocationId>> {}
