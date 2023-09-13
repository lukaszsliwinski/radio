import { IStation } from "./station"


// auth
export interface IGetUserHttpResponse {
  username: string
}

export interface IRegisterHttpResponse {
  status: number,
  message: string
}

export interface ILoginHttpResponse {
  status: number,
  message: string,
  username?: string,
  token?: string
}

export interface IChangePasswordHttpResponse {
  status: number,
  message: string
}


// stations
export interface IStationsHttpResponse {
  status: number,
  message?: string,
  stations?: IStation[]
}

export interface IAddFavouriteHttpResponse {
  status: number,
  message: string
}

export interface IGetFavouritesHttpResponse {
  status: number,
  stations: IStation[],
  message?: string
}

export interface ICheckFavouriteHttpResponse {
  fav: boolean
}

export interface IDeleteFavouriteHttpResponse {
  status: number,
  message: string
}

export interface IAddRecentHttpResponse {
  status: number,
  message: string
}
