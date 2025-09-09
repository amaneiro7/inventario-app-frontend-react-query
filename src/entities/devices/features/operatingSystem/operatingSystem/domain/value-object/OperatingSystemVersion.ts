import { AcceptedNullValueObject } from '@/entities/shared/domain/value-objects/AcceptedNullValueObject'

/**
 * @class OperatingSystemName
 * @extends {StringValueObject}
 * @description Value Object que representa el nombre de un sistema operativo.
 */
export class OperatingSystemVersion extends AcceptedNullValueObject<string> {}
