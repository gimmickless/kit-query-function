import { AppSyncResolverEvent, ProxyResult } from 'aws-lambda'
import { RDSClient, AddRoleToDBClusterCommand } from '@aws-sdk/client-rds'

export const lambdaHandler = async (
  event: AppSyncResolverEvent<any>
): Promise<ProxyResult> => {
  const queries = JSON.stringify(event.queryStringParameters)

  switch (event.field) {
    case 'getPost':
      var id = event.arguments.id
      return {
        statusCode: 200,
        body: `Queries: ${queries}`
      }
      break
    default:
      break
  }
}
