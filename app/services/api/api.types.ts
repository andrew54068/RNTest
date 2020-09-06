import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface ApiResponseSuccess<T> {
  data: T
}

export interface LoginData {
  finishedRegister: boolean,
  isNewDevice: boolean,
  mobile: string,
  newDeviceToken: string | null,
  refreshToken: string
}

export type LoginResult = { kind: "ok"; data: LoginData } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
