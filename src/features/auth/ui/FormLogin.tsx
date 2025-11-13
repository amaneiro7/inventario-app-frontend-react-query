import { use } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { useGreetings } from '@/shared/lib/hooks/useGreetings'
import { cn } from '@/shared/lib/utils'
import { LoginFooter } from './LoginFooter'
import { LoginHeader } from './LoginHeader'
import { LoginLogoAndTitle } from './LoginLogoAndTitle'
import { FormLoginInputs } from './FormLoginInputs'
import { ExpiredPasswordForm } from './ExpiredPasswordForm'
import './formLogin.css'

export const FormLogin = () => {
	const {
		auth: { isPasswordExpired, deleteTempToken }
	} = use(AuthContext)
	const { date, greeting, currentDate } = useGreetings()

	return (
		<main className="formLogin">
			<section
				className={cn(
					'mx-auto flex h-screen w-fit flex-col items-center justify-center gap-2 px-6 py-8 sm:max-w-lg lg:py-0'
				)}
			>
				<LoginHeader date={date} />
				<div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg shadow-black/60">
					{/* logo y titulo */}
					<LoginLogoAndTitle />
					<div
						className={cn(
							'p-6 transition-colors duration-300',
							isPasswordExpired ? 'bg-rojo' : 'bg-azul'
						)}
					>
						{isPasswordExpired ? (
							<ExpiredPasswordForm deleteTempToken={deleteTempToken} />
						) : (
							<FormLoginInputs greeting={greeting} />
						)}
					</div>
				</div>
				<LoginFooter currentDate={currentDate} />
			</section>
		</main>
	)
}
