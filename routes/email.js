import express from 'express'
let router = express.Router();

import Mailer from '../services/mailer'

/* ############ Email Test ################ */
router.get('/test', (req, res) => {

	let mail = new Mailer({subject: 'Test Nodemailer 2.0'})
	mail.setAdminTransport()
			.setTemplate('tpl')
			.setRecipients([ { name: 'Cesar', address:'info@gmail.com' } ])
			.send()

	res.json({ok:'ok'})

})


export default router