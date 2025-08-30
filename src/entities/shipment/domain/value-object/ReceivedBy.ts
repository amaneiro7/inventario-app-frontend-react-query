import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'
import { type EmployeeId } from '@/entities/employee/employee/domain/value-object/EmployeeId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class ReceivedBy extends AcceptedNullValueObject<Primitives<EmployeeId>> {}
