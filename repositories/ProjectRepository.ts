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

  show(id: number): Promise<AxiosResponse<SingleResult<Project>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(project: Project): Promise<AxiosResponse<SingleResult<Project>>> {
    return this.axios.put(`/api/${resource}/${project.id}`, project)
  }
}
