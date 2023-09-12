import { IStation } from "../station"

export interface IStationsHttpResponse {
  status: number,
  message?: string,
  stations?: IStation[]
}
