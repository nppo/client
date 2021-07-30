import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Project } from '~/types/models'
import { SingleResult } from '~/types/repositories'

const resource = 'projects'

export default class ProjectRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  show(id: string): Promise<AxiosResponse<SingleResult<Project>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  store(data: FormData): Promise<AxiosResponse<SingleResult<Project>>> {
    return this.axios.post(`/api/${resource}`, data)
  }

  update(
    id: string,
    data: FormData
  ): Promise<AxiosResponse<SingleResult<Project>>> {
    // Needed as Laravel otherwise does not allow uploading of images
    data.set('_method', 'PUT')
    return this.axios.post(`/api/${resource}/${id}`, data)
  }

  create(): Promise<AxiosResponse<any>> {
    return this.axios.get(`api/${resource}/create`)
  }
}
