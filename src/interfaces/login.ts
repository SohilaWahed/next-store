export interface successsignin {
  message: string
  user: UserResponse
  token: string
}

export interface UserResponse {
  name: string
  email: string
  role: string

}

export interface failsignin {
  statusMsg: string
  message: string
}

