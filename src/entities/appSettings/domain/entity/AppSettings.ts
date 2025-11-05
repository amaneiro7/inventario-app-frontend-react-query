import { AppSettingsValue } from '../value-object/AppSettingsValue'
import { AppSettingsKey } from '../value-object/AppSettingsKey'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsParams, type AppSettingsPrimitives } from '../dto/AppSettings.dto'

export class AppSettings {
	constructor(
		private readonly key: AppSettingsKey,
		private readonly value: AppSettingsValue
	) {}

	public static create(params: AppSettingsParams): AppSettings {
		return new AppSettings(
			new AppSettingsKey(params.key),
			new AppSettingsValue(params.value, params.type)
		)
	}

	/**
	 * Gets the primitive value of the setting value.
	 */
	get keyValue(): Primitives<AppSettingsKey> {
		return this.key.value
	}
	get primitiveValue(): Primitives<AppSettingsValue> {
		return this.value.value
	}

	/**
	 * Converts the AppSettings entity to its primitive representation.
	 * @returns The primitive representation of the AppSettings.
	 */
	toPrimitives(): AppSettingsPrimitives {
		return {
			key: this.keyValue,
			value: this.primitiveValue
		}
	}
}
