import { KitQueryRepository } from '../repository'

type GetKitType = 'curated' | 'fave' | 'recentlyOrdered' | 'newlyAdded'

export class KitQueryService {
  #repository: KitQueryRepository

  constructor(repository: KitQueryRepository) {
    this.#repository = repository
  }

  list(type: GetKitType, args?: any): Array<any> {
    switch (type) {
      case 'curated':
        return this.#repository.getCuratedList({
          username: args.username,
          limit: args.limit,
          offset: args.offset
        })
      case 'fave':
        return this.#repository.getFaveList({
          username: args.username,
          limit: args.limit,
          offset: args.offset
        })
      case 'recentlyOrdered':
        return this.#repository.getRecentlyOrderedList({
          username: args.username,
          limit: args.limit,
          offset: args.offset
        })
      case 'newlyAdded':
        return this.#repository.getNewlyAddedList({
          limit: args.limit,
          offset: args.offset
        })
    }
  }
}
