export const isTokenExpired = (token: string) => {
  // Lógica para verificar si el token ha expirado
  // Retorna true si el token ha expirado, false en caso contrario
  const tokenData = JSON.parse(atob(token.split('.')[1]))

  // Obtener la fecha de expiración del token
  const expirationDate = new Date(tokenData.exp * 1000)

  // Obtener la fecha actual
  const currentDate = new Date()
  // Comparar las fechas

  return currentDate > expirationDate
}
