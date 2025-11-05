import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsKey } from '../value-object/AppSettingsKey'
import { type AppSettingsPrimitives } from '../dto/AppSettings.dto'

export abstract class AppSettingsSaveRepository {
	abstract update({
		key,
		payload
	}: {
		key: Primitives<AppSettingsKey>
		payload: AppSettingsPrimitives
	}): Promise<{ message: string }>

	abstract updateMultiple({
		settings
	}: {
		settings: AppSettingsPrimitives[]
	}): Promise<{ message: string }>
}
