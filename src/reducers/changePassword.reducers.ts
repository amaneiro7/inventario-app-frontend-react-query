interface DefaultProps {
  formData: FormData
  errors: Errors
  valid: Valid
  toggleInputs: ToggleInputs
  loading: boolean
}

export interface FormData {
  password: string
  newPassword: string
  reTypePassword: string
}
export interface Errors {
  password: string
  newPassword: string
  reTypePassword: string
}
export interface Valid {
  password: boolean
  newPassword: boolean
  reTypePassword: boolean
}
export interface ToggleInputs {
  password: boolean
  newPassword: boolean
  reTypePassword: boolean
}

export const changePasswordInitialState: DefaultProps = {
  formData: {
    password: '',
    newPassword: '',
    reTypePassword: ''
  },
  errors: {
    password: '',
    newPassword: '',
    reTypePassword: ''
  },
  valid: {
    password: false,
    newPassword: false,
    reTypePassword: false
  },
  toggleInputs: {
    password: false,
    newPassword: false,
    reTypePassword: false
  },
  loading: false
}

type Action =
  | { type: 'reset' }
  | {
      type: 'toggle_inputs'
      payload: { name: 'password' | 'newPassword' | 'reTypePassword' }
    }
  | { type: 'initial_submit' }
  | { type: 'end_submit' }
  | { type: 'write'; payload: { name: string; value: string } }
  | { type: 'errors'; payload: { errors: Errors } }
  | { type: 'valid'; payload: { valid: Valid } }

export const chanegPasswordReducer = (
  state: DefaultProps,
  action: Action
): DefaultProps => {
  switch (action.type) {
    case 'reset':
      return { ...changePasswordInitialState }
    case 'initial_submit':
      return { ...state, loading: true }
    case 'end_submit':
      return { ...state, loading: false }
    case 'toggle_inputs': {
      const { name } = action.payload
      return {
        ...state,
        toggleInputs: {
          ...state.toggleInputs,
          [name]: !state.toggleInputs[name]
        }
      }
    }
    case 'write': {
      const { value, name } = action.payload
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value
        }
      }
    }
    case 'errors': {
      const { errors } = action.payload
      return {
        ...state,
        errors: {
          ...state.errors,
          ...errors
        }
      }
    }
    case 'valid': {
      const { valid } = action.payload
      return {
        ...state,
        valid: {
          ...state.valid,
          ...valid
        }
      }
    }
    default:
      return state
  }
}
