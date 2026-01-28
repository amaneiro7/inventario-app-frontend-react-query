import { type AppSettingsDto } from '../../domain/dto/AppSettings.dto'
import { AppSettingsValue } from '../../domain/value-object/AppSettingsValue'
import { type SettingsTypeEnum } from '../../domain/value-object/AppSettingsType'

export type AppSettingsForm = AppSettingsDto

export interface State {
	settings: AppSettingsForm[]
	errors: Record<string, string> // key: error message
}

export const initialAppSettingsState: State = {
	settings: [],
	errors: {}
}

export type Action =
	| { type: 'init'; payload: { settings: AppSettingsForm[] } }
	| { type: 'reset'; payload: { settings: AppSettingsForm[] } }
	| {
			type: 'update_setting_value'
			payload: { key: string; value: string; type: SettingsTypeEnum }
	  }

export const appSettingsFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				settings: action.payload.settings,
				errors: {}
			}
		}

		case 'update_setting_value': {
			const { key, value, type } = action.payload
			const newSettings = state.settings.map(setting => {
				if (setting.key === key) {
					return { ...setting, value }
				}
				return setting
			})

			let error = ''
			try {
				new AppSettingsValue(value, type)
			} catch (e: any) {
				error = e.message
			}

			return {
				...state,
				settings: newSettings,
				errors: {
					...state.errors,
					[key]: error
				}
			}
		}
		default:
			return state
	}
}
