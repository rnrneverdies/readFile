import express from 'express'
const app = express()
import routes from './routes'


routes(app) //Incluyo las rutas de la app





//DATABASE SETUP
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Escuchando en el puerto: ${PORT}`);
})
