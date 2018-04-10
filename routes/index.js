import emailRouter from './email'

export default (app) => {
	app.use('/email', emailRouter)

}