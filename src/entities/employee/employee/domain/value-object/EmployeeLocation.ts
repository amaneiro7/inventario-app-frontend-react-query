import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type LocationId } from '@/entities/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class EmployeeLocation extends AcceptedNullValueObject<Primitives<LocationId>> {}
