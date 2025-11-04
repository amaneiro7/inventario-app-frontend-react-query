import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AppSettingsType } from '../value-object/AppSettingsType'
import { type AppSettingsIsEditable } from '../value-object/AppSettingsIsEditable'
import { type AppSettingsGroup } from '../value-object/AppSettingsGroup'
import { type AppSettingsDescription } from '../value-object/AppSettingsDescription'
import { type AppSettingsKey } from '../value-object/AppSettingsKey'
import { type AppSettingsValue } from '../value-object/AppSettingsValue'
import { type AppSettingsIsProtected } from '../value-object/AppSettingsIsProtected'
import { type AppSettingsName } from '../value-object/AppSettingsName'

export interface AppSettings {
	key: Primitives<AppSettingsKey>
	value: Primitives<AppSettingsValue>
	type: Primitives<AppSettingsType>
	group: Primitives<AppSettingsGroup>
	name: Primitives<AppSettingsName>
	description: Primitives<AppSettingsDescription>
	isEditable: Primitives<AppSettingsIsEditable>
	isProtected: Primitives<AppSettingsIsProtected>
}

/**
 * Represents the primitive properties of a Directiva entity, excluding the ID but including associated cargo IDs.
 */
export type AppSettingsPrimitives = Omit<
	AppSettings,
	'key' | 'type' | 'group' | 'name' | 'description' | 'isEditable' | 'isProtected'
>

/**
 * Represents the parameters used for creating or updating a AppSettings entity.
 * It includes all primitive properties and an optional ID for update operations, along with associated cargo IDs.
 */
export type AppSettingsParams = Omit<
	AppSettings,
	'key' | 'group' | 'name' | 'description' | 'isEditable' | 'isProtected'
>

/**
 * Represents the Data Transfer Object (DTO) for a AppSettings entity, including full Cargo details and update timestamp.
 */
export type AppSettingsDto = AppSettings
