import { Application, Router } from 'express'
import userController from '../controllers/userController'
import { userPostRequest } from '../requests'

const routes = Router()

routes.get('/user', userController.all)
routes.get('/user/:id', userController.find)
routes.post('/user', userPostRequest, userController.store)
routes.put('/user/:id', userController.update)
routes.delete('/user/:id', userController.destroy)

export default routes
