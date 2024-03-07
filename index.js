require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./src/middlewares/notFound')
const errorMiddleware = require('./src/middlewares/error')
const userRouter = require('./src/routes/user-routes')
const AdminRoute = require('./src/routes/admin-route')
const TeacherRoute = require('./src/routes/teacher-route')


const web = express()

web.use(cors())
web.use(express.json())

web.use('/user', userRouter)
web.use('/admin', AdminRoute)
web.use('/teacher', TeacherRoute)


web.use( notFound )

web.use(errorMiddleware)

let port = process.env.PORT || 2000
web.listen(port, ()=> console.log('Server on Port :', port))