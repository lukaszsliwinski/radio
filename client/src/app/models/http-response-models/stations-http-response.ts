import { IStation } from "../station"

export interface IStationsHttpResponse {
  stations?: IStation[],
  message?: string
}
