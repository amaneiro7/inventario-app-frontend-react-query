import { Uuid } from '@/entities/shared/domain/value-objects/Uuid'

/**
 * Represents the unique identifier for an employee as a Value Object.
 * It extends the Uuid Value Object, ensuring it's a valid UUID format.
 */
export class EmployeeId extends Uuid {}
