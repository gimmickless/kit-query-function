import { AppSyncResolverEvent } from 'aws-lambda'
import { RDSClient, AddRoleToDBClusterCommand } from '@aws-sdk/client-rds'

const getNewKits = () => {
  return []
}

const resolvers = {
  Query: {
    posts: (ctx) => {
      return getNewKits()
    }
  }
}

export const lambdaHandler = async (
  event: AppSyncResolverEvent<any>
): Promise<any> => {
  const typeHandler = resolvers[event.info.parentTypeName]
  if (typeHandler) {
    const resolver = typeHandler[event.info.fieldName]
    if (resolver) {
      return await resolver(event)
    }
  }
  throw new Error(`Resolver not found for event: ${JSON.stringify(event)}`)
}
