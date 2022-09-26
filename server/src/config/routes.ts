import { Router } from 'express'
import userController from '../controllers/userController'
import * as middleware from '../middleware'
import { authLoginRequest, userGetRequest, userPostRequest } from '../requests'
const routes = Router()

routes.post('/auth/user/create', userPostRequest, userController.store)
routes.post('/auth/login', authLoginRequest, middleware.login)
routes.get('/auth/refresh-token', middleware.refreshToken)

routes.use(middleware.verifyToken)

routes.delete('/auth/logout', middleware.logout)
routes.get('/auth/user', userController.user)

routes.get('/user', userGetRequest, userController.all)
routes.get('/user/:id', userController.find)
routes.put('/user/:id', userController.update)
routes.delete('/user/:id', userController.destroy)

export default routes
