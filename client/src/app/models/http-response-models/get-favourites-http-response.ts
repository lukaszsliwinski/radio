import { IStation } from "../station"

export interface IGetFavouritesHttpResponse {
  status: number,
  stations: IStation[],
  message?: string
}
