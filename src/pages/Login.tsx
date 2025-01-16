import Typography from "../components/Typography"

export const Login = () => {
    return (
        <main className="bg-gray-300 dark:bg-gray-900">
            <section className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full flex flex-col gap-4 md:w-1/2gap-6 p-6 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border md:mt-0 sm:max-w-md dark:border-gray-700 ">
                    <Typography>
                        Iniciar Sesión
                    </Typography>

                    <form id="login" action="submit" method="post">
                        <div className="space-y-6 md:space-y-8 mb-20">

                        </div>
                    </form>

                </div>
            </section>

        </main>
    )
}