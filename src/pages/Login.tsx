import Typography from "../components/Typography"

export const Login = () => {
    return (
        <main className="bg-gray-300 dark:bg-gray-900">
            <section className="flex flex-col items-center justify-center gap-2 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div></div>
                <Typography color="primary" children>
                    Iniciar Sesión
                </Typography>
            </section>

        </main>
    )
}