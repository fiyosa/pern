import { Router } from 'express'
import * as middleware from '../middleware'
import categoryController from '../controllers/categoryController'
import menuController from '../controllers/menuController'
import userController from '../controllers/userController'
import {
  authLoginRequest,
  categoryPostRequest,
  categoryPutRequest,
  messageGetRequest,
  messagePostRequest,
  messagePutRequest,
  userGetRequest,
  userPostRequest,
  userPUTRequest,
} from '../requests'
import messageController from '../controllers/messageController'
import roleController from '../controllers/roleController'
import blogController from '../controllers/blogController'
const routes = Router()

routes.post('/auth/user/create', userPostRequest, userController.store)
routes.post('/auth/login', authLoginRequest, middleware.login)
routes.get('/auth/refresh-token', middleware.refreshToken)
routes.get('/auth/menu', menuController.Public)

// ========================= middleware =========================
routes.use(middleware.verifyToken)

routes.delete('/auth/logout', middleware.logout)
routes.get('/auth/message', messageController.user)
routes.get('/auth/user', userController.user)
routes.get('/menu', menuController.Auth)

routes.get('/user', userGetRequest, userController.all)
routes.get('/user/:id', userController.find)
routes.put('/user/:id', userPUTRequest, userController.update)
routes.delete('/user/:id', userController.destroy)

routes.get('/role', roleController.all)

routes.get('/category', categoryController.all)
routes.get('/category/:id', categoryController.find)
routes.post('/category', categoryPostRequest, categoryController.store)
routes.put('/category/:id', categoryPutRequest, categoryController.update)
routes.delete('/category/:id', categoryController.destroy)

routes.get('/message', messageGetRequest, messageController.all)
routes.get('/message/:id', messageController.find)
routes.post('/message', messagePostRequest, messageController.store)
routes.put('/message/:id', messagePutRequest, messageController.update)
routes.delete('/message/:id', messageController.destroy)
routes.put('/message-read/', messageController.updateView)

routes.get('/blog', blogController.all)
routes.get('/blog/:id', blogController.find)
routes.post('/blog', categoryPostRequest, blogController.store)
routes.put('/blog/:id', categoryPutRequest, blogController.update)
routes.delete('/blog/:id', blogController.destroy)

export default routes
