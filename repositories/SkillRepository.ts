import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Skill } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'skills'

export default class SkillRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Skill>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
