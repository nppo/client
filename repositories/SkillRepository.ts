import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Tag } from '~/types/models'
import { MultipleResults } from '~/types/repositories'

const resource = 'skills'

export default class SkillRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Tag>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
