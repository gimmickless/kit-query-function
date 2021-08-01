import { RDSClient } from '@aws-sdk/client-rds'

interface PaginationParams {
  limit: number
  offset: number
}

interface AuthPaginationParams extends PaginationParams {
  username: string
}

export class KitQueryRepository {
  #dbClient: RDSClient

  constructor(dbClient: RDSClient) {
    this.#dbClient = dbClient
  }

  getCuratedList(params: AuthPaginationParams): Array<any> {
    // this.#dbClient.send()
    return []
  }

  getFaveList(params: AuthPaginationParams): Array<any> {
    return []
  }
  getRecentlyOrderedList(params: AuthPaginationParams): Array<any> {
    return []
  }

  getNewlyAddedList(params: PaginationParams): Array<any> {
    return []
  }
}
