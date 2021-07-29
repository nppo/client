/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import { SortBy } from './entities'
import { Filter } from './repositories'

interface StateAction<S> {
  mutation?: keyof S | null
}

interface IndexAction<S> extends StateAction<S> {
  filters?: Filter[]
  sorts?: SortBy[]
}

interface PaginatedIndexAction<S> extends IndexAction<S> {
  page?: number
  perPage?: number
}

interface FetchAction<S> extends StateAction<S> {
  id: string | number
}

interface StoreAction<S> extends StateAction<S> {
  data: Object | FormData
}

interface UpdateAction<S> extends StoreAction<S> {
  id: string | number
  data: Object | FormData
}

interface DeleteAction<S> extends FetchAction<S> {}
