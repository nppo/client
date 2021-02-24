import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Project } from '~/types/entities'
import { MultipleResults } from '~/types/repositories'

const resource = 'projects'

export default class ProjectRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Project>>> {
    return this.axios.get(`/api/${resource}`)
  }
}
