import { IStation } from "../station"

export interface IGetFavouritesHttpResponse {
  stations?: IStation[],
  status?: number,
  message?: string
}
