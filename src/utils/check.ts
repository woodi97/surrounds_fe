export const isValidPassword = (password: string): boolean => {
  if (!/^[a-zA-Z0-9]{7,16}$/.test(password)) {
    return false
  }

  const checkNum = password.search(/[0-9]/g) // number use
  const checkEng = password.search(/[a-z]/gi) // letter use

  if (checkNum < 0 || checkEng < 0) {
    return false
  }
  return true
}

export const isValidEmail = (email: string): boolean =>
  /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/.test(email)

export const isValidRoomName = (roomName: string): boolean => {
  if (!/^.{3,20}$/.test(roomName)) {
    return false
  }
  return true
}
