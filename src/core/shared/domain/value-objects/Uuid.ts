import { InvalidArgumentError } from './InvalidArgumentError'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {
	constructor(readonly value: string) {
		super(value)
		this.ensureIsValidUuid(value)
	}

	public static random(): Uuid {
		return new Uuid(crypto.randomUUID())
	}

	private ensureIsValidUuid(id: string): void {
		if (!this.isUuidValid(id)) {
			throw new InvalidArgumentError(
				`<${id}> is not valid <${this.constructor.name}>`
			)
		}
	}

	private isUuidValid(id: string): boolean {
		const regexExp =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

		return regexExp.test(id)
	}
}
