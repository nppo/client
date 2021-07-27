import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Like } from '~/types/models'
import { SingleResult } from '~/types/repositories'

const parentResource = 'users'
const resource = 'likes'

export default class LikeRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(personId: string): Promise<AxiosResponse<SingleResult<Like>>> {
    return this.axios.get(`/api/${parentResource}/${personId}/${resource}`)
  }

  store(
    personId: string,
    data: FormData
  ): Promise<AxiosResponse<SingleResult<Like>>> {
    return this.axios.post(
      `/api/${parentResource}/${personId}/${resource}`,
      data
    )
  }
}
