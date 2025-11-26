import { type SiteDto, type SiteParams } from '../../domain/dto/Site.dto'
import { SiteAddress } from '../../domain/value-object/SiteAddress'
import { SiteName } from '../../domain/value-object/SiteName'

export interface DefaultSite extends SiteParams {
	stateId: SiteDto['city']['stateId']
	regionId: SiteDto['city']['state']['regionId']
	updatedAt?: string
}

export interface SiteErrors extends Record<string, string> {
	address: string
	name: string
}
export interface SiteRequired extends Record<string, boolean> {
	regionId: boolean
	stateId: boolean
	cityId: boolean
	address: boolean
	name: boolean
}
export interface SiteDisabled extends Record<string, boolean> {
	regionId: boolean
	stateId: boolean
	cityId: boolean
	address: boolean
	name: boolean
}

export interface State {
	formData: DefaultSite
	errors: SiteErrors
	required: SiteRequired
	disabled: SiteDisabled
}

export const initialSiteState: State = {
	formData: {
		id: undefined,
		regionId: '',
		stateId: '',
		cityId: '',
		address: '',
		name: '',
		updatedAt: undefined
	},
	errors: {
		name: '',
		address: ''
	},
	required: {
		regionId: false,
		stateId: false,
		cityId: true,
		address: true,
		name: true
	},
	disabled: {
		regionId: false,
		stateId: false,
		cityId: false,
		address: false,
		name: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultSite } }
	| { type: 'reset'; payload: { formData: DefaultSite } }
	| { type: 'regionId'; payload: { value: DefaultSite['regionId'] } }
	| { type: 'stateId'; payload: { value: DefaultSite['stateId'] } }
	| { type: 'cityId'; payload: { value: DefaultSite['cityId'] } }
	| { type: 'address'; payload: { value: DefaultSite['address'] } }
	| { type: 'name'; payload: { value: DefaultSite['name'] } }

export const siteFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData }
			}
		}

		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: SiteName.isValid(name) ? '' : SiteName.invalidMessage()
				}
			}
		}
		case 'address': {
			const address = action.payload.value
			return {
				...state,
				formData: { ...state.formData, address },
				errors: {
					...state.errors,
					address: SiteAddress.isValid(address) ? '' : SiteAddress.invalidMessage()
				}
			}
		}
		case 'regionId': {
			const regionId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stateId: '',
					cityId: '',
					regionId
				}
			}
		}
		case 'stateId': {
			const stateId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cityId: '',
					stateId
				}
			}
		}
		case 'cityId': {
			const cityId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cityId
				}
			}
		}
		default:
			return state
	}
}
