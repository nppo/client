import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Person } from '~/types/entities'
import { MultipleResults, SingleResult } from '~/types/repositories'

const resource = 'people'

export default class PeopleRepository {
  axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }

  all(): Promise<AxiosResponse<MultipleResults<Person>>> {
    return this.axios.get(`/api/${resource}`)
  }

  show(id: number): Promise<AxiosResponse<SingleResult<Person>>> {
    return this.axios.get(`/api/${resource}/${id}`)
  }

  update(person: Person): Promise<AxiosResponse<SingleResult<Person>>> {
    return this.axios.put(`/api/${resource}/${person.id}`, {
      first_name: person.firstName,
      last_name: person.lastName,
      about: person.about,
      tags: person.tags,
    })
  }
}
