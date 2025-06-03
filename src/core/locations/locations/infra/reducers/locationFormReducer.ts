import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { LocationDto, LocationParams } from '../../domain/dto/Location.dto'
import { LocationName } from '../../domain/value-object/LocationName'
import { LocationSubnet } from '../../domain/value-object/LocationSubnet'

export interface DefaultLocation extends LocationParams {
	regionId: LocationDto['site']['city']['state']['regionId']
	stateId: LocationDto['site']['city']['stateId']
	cityId: LocationDto['site']['cityId']
	siteName: LocationDto['site']['name']
	codeAgency?: number
	updatedAt?: LocationDto['updatedAt']
}

export interface LocationErrors {
	subnet: string
	name: string
	codeAgency: string
}
export interface LocationRequired {
	typeOfSiteId: boolean
	locationStatusId: boolean
	regionId: boolean
	stateId: boolean
	cityId: boolean
	siteId: boolean
	siteName: boolean
	codeAgency?: boolean
	name: boolean
	subnet: boolean
}

export interface LocationDisabled {
	typeOfSiteId: boolean
	locationStatusId: boolean
	regionId: boolean
	stateId: boolean
	cityId: boolean
	siteId: boolean
	siteName: boolean
	codeAgency?: boolean
	name: boolean
	subnet: boolean
}

export interface State {
	formData: DefaultLocation
	errors: LocationErrors
	required: LocationRequired
	disabled: LocationDisabled
}

export const initialLocationState: State = {
	formData: {
		id: undefined,
		typeOfSiteId: '',
		locationStatusId: '',
		regionId: '',
		stateId: '',
		cityId: '',
		siteId: '',
		codeAgency: 1,
		siteName: '',
		subnet: '',
		name: '',
		updatedAt: undefined
	},
	errors: {
		name: '',
		codeAgency: '',
		subnet: ''
	},
	required: {
		typeOfSiteId: true,
		locationStatusId: true,
		regionId: false,
		stateId: false,
		cityId: false,
		siteId: true,
		siteName: false,
		subnet: false,
		codeAgency: false,
		name: true
	},
	disabled: {
		typeOfSiteId: false,
		locationStatusId: false,
		regionId: false,
		stateId: true,
		cityId: true,
		siteId: true,
		siteName: false,
		subnet: true,
		codeAgency: false,
		name: false
	}
}

export type Action =
	| { type: 'init'; payload: { formData: DefaultLocation } }
	| { type: 'reset'; payload: { formData: DefaultLocation } }
	| { type: 'typeOfSiteId'; payload: { value: DefaultLocation['typeOfSiteId'] } }
	| { type: 'locationStatusId'; payload: { value: DefaultLocation['locationStatusId'] } }
	| { type: 'regionId'; payload: { value: DefaultLocation['regionId'] } }
	| { type: 'stateId'; payload: { value: DefaultLocation['stateId'] } }
	| { type: 'cityId'; payload: { value: DefaultLocation['cityId'] } }
	| {
			type: 'siteId'
			payload: { value: DefaultLocation['siteId']; siteName: DefaultLocation['siteName'] }
	  }
	| { type: 'name'; payload: { value: DefaultLocation['name'] } }
	| { type: 'codeAgency'; payload: { value: DefaultLocation['codeAgency'] } }
	| { type: 'subnet'; payload: { value: DefaultLocation['subnet'] } }

export const locationFormReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'reset':
		case 'init': {
			return {
				...state,
				formData: { ...action.payload.formData },
				disabled: {
					...state.disabled,
					stateId: !action.payload.formData.regionId,
					cityId: !action.payload.formData.stateId,
					siteId: !action.payload.formData.cityId,
					siteName: !action.payload.formData.siteId,
					name: !action.payload.formData.siteId,
					codeAgency: !action.payload.formData.siteId,
					subnet:
						!action.payload.formData.typeOfSiteId ||
						TypeOfSiteOptions.ALMACEN === action.payload.formData.typeOfSiteId
				}
			}
		}
		case 'typeOfSiteId': {
			const typeOfSiteId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					typeOfSiteId,
					codeAgency: 1,
					name: '',
					subnet: ''
				},
				disabled: {
					...state.disabled,
					subnet: !typeOfSiteId || typeOfSiteId === TypeOfSiteOptions.ALMACEN
				}
			}
		}
		case 'regionId': {
			const regionId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					regionId,
					stateId: '',
					cityId: '',
					siteId: '',
					siteName: ''
				},
				disabled: {
					...state.disabled,
					stateId: !regionId,
					cityId: true,
					siteId: true,
					siteName: true,
					name: true,
					codeAgency: true
				}
			}
		}
		case 'stateId': {
			const stateId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					stateId,
					cityId: '',
					siteId: '',
					siteName: ''
				},
				disabled: {
					...state.disabled,
					cityId: !stateId,
					siteId: true,
					siteName: true,
					name: true,
					codeAgency: true
				}
			}
		}
		case 'cityId': {
			const cityId = action.payload.value
			return {
				...state,
				formData: {
					...state.formData,
					cityId,
					siteId: '',
					siteName: ''
				},
				disabled: {
					...state.disabled,
					siteId: !cityId,
					siteName: true,
					name: true,
					codeAgency: true
				}
			}
		}
		case 'siteId': {
			const siteId = action.payload.value
			const siteName = action.payload.siteName
			return {
				...state,
				formData: {
					...state.formData,
					siteId,
					siteName
				},
				disabled: {
					...state.disabled,
					siteName: !siteId,
					name: !siteId,
					codeAgency: !siteId
				}
			}
		}
		case 'codeAgency': {
			const codeAgency = Number(action.payload.value)
			let numberFormatter = ''
			if (codeAgency >= 1 && codeAgency <= 99) {
				numberFormatter = codeAgency.toString().padStart(3, '0')
			} else {
				numberFormatter = codeAgency.toString()
			}
			return {
				...state,
				formData: {
					...state.formData,
					name: `Agencia (${numberFormatter}) ${state.formData.siteName}`,
					codeAgency: codeAgency
				},
				errors: {
					...state.errors,
					codeAgency:
						codeAgency > 599 || codeAgency < 1
							? 'El valor debe estar entre 1 y 599'
							: ''
				}
			}
		}
		case 'name': {
			const name = action.payload.value
			return {
				...state,
				formData: { ...state.formData, name },
				errors: {
					...state.errors,
					name: LocationName.isValid(name) ? '' : LocationName.invalidMessage()
				}
			}
		}
		case 'subnet': {
			const subnet = action.payload.value
			return {
				...state,
				formData: { ...state.formData, subnet },
				errors: {
					...state.errors,
					subnet: LocationSubnet.isValid(subnet) ? '' : LocationSubnet.invalidMessage()
				}
			}
		}
		case 'locationStatusId': {
			const locationStatusId = action.payload.value
			return {
				...state,
				formData: { ...state.formData, locationStatusId }
			}
		}
		default:
			return state
	}
}
