import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { AuthContext } from '@/context/Auth/AuthContext'
import { UserEmail } from '@/core/user/domain/value-objects/UserEmail'
import { UserPassword } from '@/core/user/domain/value-objects/UserPassword'
import { useContext, useEffect, useRef, useState } from 'react'

export function useLogin() {
	const {
		auth: { isLoginLoading, login }
	} = useContext(AuthContext)
	const [formData, setFormData] = useState<{
		email: Primitives<UserEmail>
		password: Primitives<UserPassword>
	}>({
		email: '',
		password: ''
	})
	const [errors, setErrors] = useState({ email: '', password: '' })
	const [togglePassword, setTogglePassword] = useState(true)
	const isPasswordFirstInput = useRef(true)
	const isEmailFirstInput = useRef(true)

	const handleToggleViewPassword = () => {
		setTogglePassword(!togglePassword)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[event.target.name]: event.target.value
		}))
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event?.preventDefault()
		event?.stopPropagation()
		await login({ email: formData.email, password: formData.password })
	}

	useEffect(() => {
		if (isEmailFirstInput.current || formData.email === '') {
			isEmailFirstInput.current = !formData.email.includes('@')
		}

		if (isPasswordFirstInput.current || formData.password === '') {
			isPasswordFirstInput.current =
				formData.password?.length <= UserPassword.HAS_MIN_LENGTH
		}

		const isEmailValid = isEmailFirstInput.current
			? true
			: UserEmail.isValid(formData.email)
		const isPasswordValid = isPasswordFirstInput.current
			? true
			: UserPassword.isValid(formData.password)

		setErrors(prev => ({
			...prev,
			email: isEmailValid ? '' : UserEmail.invalidMessage(formData.email),
			password: isPasswordValid ? '' : UserPassword.invalidMessage()
		}))

		return () => {
			setErrors({ email: '', password: '' })
		}
	}, [formData.email, formData.password])

	return {
		isLoginLoading,
		errors,
		formData,
		handleToggleViewPassword,
		togglePassword,
		handleChange,
		handleSubmit
	}
}
