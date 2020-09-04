import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface LoginData {
  finishedRegister: boolean,
  isNewDevice: boolean,
  mobile: string,
  newDeviceToken: string,
  refreshToken: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type LoginResult = { kind: "ok"; data: LoginData } | GeneralApiProblem
