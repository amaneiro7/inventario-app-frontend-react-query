import { useContext, useEffect, useMemo, useReducer, useRef } from 'react'
import { UserPassword } from '@/core/user/domain/entity/UserPassword'
import { EventContext } from '@/context/EventManager/EventContext'
import { ChangePassword } from '@/core/user/application/ChangePassword'
import { ChangePasswordService } from '@/core/user/infra/ChangePassword.service'
import { type ModalRef } from '@/ui/Modal/Modal'
import {
  changePasswordInitialState as initialState,
  chanegPasswordReducer as reducer
} from '@/reducers/changePassword.reducers'

export function useChangePassword() {
  const { events } = useContext(EventContext)
  const repository = useMemo(() => {
    return new ChangePasswordService()
  }, [])
  const changePasswordService = useMemo(() => {
    return new ChangePassword(repository, events)
  }, [repository, events])
  const dialogRef = useRef<ModalRef>(null)
  const isPasswordFirstInput = useRef(true)
  const isNewPasswordFirstInput = useRef(true)
  const isReTypePasswordFirstInput = useRef(true)
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault()
    event?.stopPropagation()
    dispatch({ type: 'initial_submit' })
    await changePasswordService
      .execute(state.formData)
      .then(() => {
        dispatch({ type: 'reset' })
      })
      .finally(() => {
        handleCloseModal()
        dispatch({ type: 'end_submit' })
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    dispatch({ type: 'write', payload: { name, value } })
  }

  const handleToggleInputs = (
    name: 'password' | 'newPassword' | 'reTypePassword'
  ) => {
    dispatch({ type: 'toggle_inputs', payload: { name } })
  }

  const handleOpenModal = () => {
    dialogRef.current?.handleOpen()
  }
  const handleCloseModal = () => {
    dialogRef.current?.handleClose()
  }

  const handleClose = () => {
    dispatch({ type: 'reset' })
  }

  const isDisabled = useMemo(() => {
    return (
      !state.valid.password ||
      !state.valid.newPassword ||
      !state.valid.reTypePassword
    )
  }, [
    state.valid.newPassword,
    state.valid.reTypePassword,
    state.valid.password
  ])

  useEffect(() => {
    if (isPasswordFirstInput.current || state.formData.password === '') {
      isPasswordFirstInput.current =
        state.formData.password?.length <= UserPassword.HAS_MIN_LENGTH
    }
    if (isNewPasswordFirstInput.current || state.formData.newPassword === '') {
      isNewPasswordFirstInput.current =
        state.formData.newPassword?.length <= UserPassword.HAS_MIN_LENGTH
    }
    if (
      isReTypePasswordFirstInput.current ||
      state.formData.reTypePassword === ''
    ) {
      isReTypePasswordFirstInput.current =
        state.formData.reTypePassword?.length <= UserPassword.HAS_MIN_LENGTH
    }

    const isPasswordValid = isPasswordFirstInput.current
      ? true
      : UserPassword.isValid(state.formData.password)
    const isNewPasswordValid = isNewPasswordFirstInput.current
      ? true
      : UserPassword.isValid(state.formData.newPassword)
    const isReTypePasswordValid = isReTypePasswordFirstInput.current
      ? true
      : state.formData.newPassword === state.formData.reTypePassword

    dispatch({
      type: 'valid',
      payload: {
        valid: {
          password: UserPassword.isValid(state.formData.password),
          newPassword: UserPassword.isValid(state.formData.newPassword),
          reTypePassword:
            UserPassword.isValid(state.formData.newPassword) &&
            state.formData.newPassword === state.formData.reTypePassword
        }
      }
    })
    dispatch({
      type: 'errors',
      payload: {
        errors: {
          password: isPasswordValid ? '' : UserPassword.invalidMessage(),
          newPassword: isNewPasswordValid ? '' : UserPassword.invalidMessage(),
          reTypePassword: isReTypePasswordValid
            ? ''
            : 'La contraseña no coinciden'
        }
      }
    })
  }, [state.formData])

  return {
    ...state,
    formId: 'change-password-form',
    dialogRef,
    handleChange,
    handleSubmit,
    handleCloseModal,
    handleOpenModal,
    handleToggleInputs,
    handleClose,
    isDisabled
  }
}
