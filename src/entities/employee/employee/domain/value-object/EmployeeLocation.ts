import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type LocationId } from '@/entities/locations/locations/domain/value-object/LocationId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents the location of an employee as a Value Object.
 * It extends AcceptedNullValueObject and wraps a LocationId, meaning it can accept a null value.
 */
export class EmployeeLocation extends AcceptedNullValueObject<Primitives<LocationId>> {}