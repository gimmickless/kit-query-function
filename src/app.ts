import { AppSyncResolverEvent } from 'aws-lambda'
import { RDSClient, AddRoleToDBClusterCommand } from '@aws-sdk/client-rds'
import { KitQueryService } from './service'
import { KitQueryRepository } from './repository'

const dbClient = new RDSClient({ region: 'REGION' }) // TODO: Get region from env variables
const repo = new KitQueryRepository(dbClient)
const svc = new KitQueryService(repo)

const resolvers = {
  Query: {
    curatedKitList: (event: AppSyncResolverEvent<any>) =>
      svc.list('curated', event.arguments),
    faveKitList: (event: AppSyncResolverEvent<any>) =>
      svc.list('fave', event.arguments),
    recentlyOrderedKitList: (event: AppSyncResolverEvent<any>) =>
      svc.list('recentlyOrdered', event.arguments),
    newlyAddedKitList: (event: AppSyncResolverEvent<any>) =>
      svc.list('newlyAdded', event.arguments)
  }
}

export const lambdaHandler = async (
  event: AppSyncResolverEvent<any>
): Promise<any> => {
  console.info(`kitQueryFunction received an event: ${JSON.stringify(event)}`)
  const typeHandler = resolvers[event.info.parentTypeName]
  if (!typeHandler) {
    throw new Error(
      `"${event.info.parentTypeName}" is not a valid resolver type`
    )
  }
  const resolver = typeHandler[event.info.fieldName]
  if (!resolver) {
    throw new Error(
      `a function for "${event.info.fieldName}" is not implemented.`
    )
  }
  return await resolver(event.arguments)
}
