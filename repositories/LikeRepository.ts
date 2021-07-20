import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Like } from '~/types/models'
import { SingleResult } from '~/types/repositories'

const parentResource = 'people'
const resource = 'likes'

export default class LikeRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(personId: number): Promise<AxiosResponse<SingleResult<Like>>> {
    return this.axios.get(`/api/${parentResource}/${personId}/${resource}`)
  }

  store(
    personId: number,
    data: FormData
  ): Promise<AxiosResponse<SingleResult<Like>>> {
    return this.axios.post(
      `/api/${parentResource}/${personId}/${resource}`,
      data
    )
  }
}
