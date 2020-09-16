import {Request, Response} from 'express'
import createUserService from './services/CreateUserService'
export function helloWorld (request: Request, response: Response) {
  const user = createUserService({
    email: 'erildo@gamil.com',
    password: '12345',
    techs: ['nodejs', 'reactjs']
  })
  return
}