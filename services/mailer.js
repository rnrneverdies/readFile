import nodemailer from 'nodemailer'
import key from '../config/prod'

var fs = require('fs')
var path = require('path')


//requerimos el servicio
class Mailer {

	constructor({ subject }){
		this.emailOptions = {}
		this.emailOptions.subject = subject
		this.emailOptions.from = 'Nombre <+++ro@gmail.com>'
	}

	/*
	* Seteamos el transport por defecto
	*/
	setAdminTransport(){
		//Configuracion del Transport GMAIL
		let transport = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				type: 'OAuth2',
				user: 'carb+++@gmail.com',//Email de Gmail
				clientId: key.GMAIL_CLIENT_ID,
				clientSecret: key.GMAIL_CLIENT_SECRET,
				refreshToken: key.GMAIL_REFRESH_TOKEN
			}
		})

		this.transport = transport
		return this
	}



	/*
	* Seteamos la template y sustituimos las variables
	* tplName - String
	* vars - { }
	*/
	setTemplate(tpl= 'tpl'){

		//Leemos el HTML de la template'tpl.html'
		/****** AQUI ESTA EL PROBLEMA *********/
		/*
			NO PUEDE SELECCIONAR LA TEMPLATE DESDE DENTRO DE LA CLASE!
		*/
		fs.readFile(`${tpl}.html`, 'utf8', (err, data) => {
			if (err) console.log(err);

			//Seteamos la template con las variables seteadas
			this.template = data

		})

		return this;
	}

	getTemplate(){
		return this.template
	}


	/*
	* Un Array con todos los recipients que queremos enviar el email
	* recipients - []
	*
	*/
	setRecipients(recipients = []){
		// [ { name: '', address:'' } ]
		this.recipients = recipients
		return this;
	}

	getRecipients(){
		return this.recipients
	}


	/*
	* Enviamos el Email por cada recipient
	* tplName - String
	* vars - { }
	*/
	send(){
		//Por cada recipient tenemos que enviar un email
		let recipients = this.getRecipients()

			//Por cada Recipient, enviamos un Email
			recipients.forEach(recipient => {
				//seteamos this.emailOptions
				this.emailOptions.to = recipient.address
				this.emailOptions.html = this.template //cargamos la Template HTML

				//enviamos el email
				this.transport.sendMail(this.emailOptions, (err, info) => {
					if (err) throw new Error(err)
						console.log(`Email enviado a ${this.emailOptions.to} con exito!`)
				})
			})

		this.transport.close()
	}


}

export default Mailer
