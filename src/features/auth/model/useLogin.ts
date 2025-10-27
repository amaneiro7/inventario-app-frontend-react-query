import { use, useEffect, useRef, useState } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { UserEmail } from '@/entities/user/domain/value-objects/UserEmail'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export function useLogin() {
	const {
		auth: { isLoginLoading, login }
	} = use(AuthContext)
	const [formData, setFormData] = useState<{
		userNameOrEmail: Primitives<UserEmail>
		password: Primitives<UserPassword>
	}>({
		userNameOrEmail: '',
		password: ''
	})
	const [errors, setErrors] = useState({ userNameOrEmail: '', password: '' })
	const [isPasswordVisible, setTogglePassword] = useState(false)
	const isPasswordFirstInput = useRef(true)
	const isEmailFirstInput = useRef(true)

	const handleToggleViewPassword = () => {
		setTogglePassword(!isPasswordVisible)
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
		await login({ userNameOrEmail: formData.userNameOrEmail, password: formData.password })
	}

	useEffect(() => {
		if (isEmailFirstInput.current || formData.userNameOrEmail === '') {
			isEmailFirstInput.current = !formData.userNameOrEmail.includes('@')
		}

		if (isPasswordFirstInput.current || formData.password === '') {
			isPasswordFirstInput.current = formData.password?.length <= UserPassword.HAS_MIN_LENGTH
		}

		const isEmailValid = isEmailFirstInput.current
			? true
			: UserEmail.isValid(formData.userNameOrEmail)
		const isPasswordValid = isPasswordFirstInput.current
			? true
			: UserPassword.isValid(formData.password)

		setErrors(prev => ({
			...prev,
			email: isEmailValid ? '' : UserEmail.invalidMessage(formData.userNameOrEmail),
			password: isPasswordValid ? '' : UserPassword.invalidMessage()
		}))

		return () => {
			setErrors({ userNameOrEmail: '', password: '' })
		}
	}, [formData.userNameOrEmail, formData.password])

	return {
		isLoginLoading,
		errors,
		formData,
		handleToggleViewPassword,
		isPasswordVisible,
		handleChange,
		handleSubmit
	}
}
