import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      // Write your logic here
      let userId: string = getUserId(event)
      let result = await getTodosForUser(userId)
      return {
        statusCode: 200,
        body: JSON.stringify({
          items: result
        }),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
  }
 )
 handler
  .use(httpErrorHandler())
  .use(
      cors({
        credentials: true
   })
 )