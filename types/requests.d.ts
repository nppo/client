/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'

interface StateAction<S> {
  mutation?: keyof S | null
}

interface IndexAction<S> extends StateAction<S> {}

interface PaginatedIndexAction<S> extends IndexAction<S> {
  page?: number
  perPage?: number
}

interface StoreAction<S> extends StateAction<S> {
  data: Object | FormData
}

interface UpdateAction<S> extends StoreAction<S> {
  id: string | number
}

interface DeleteAction<S> extends StateAction<S> {
  id: string | number
}
