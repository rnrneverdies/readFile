const fs = require('fs')
fs.readFile('./services/tpl.html','utf8',(err, data) => {
	if (err) console.log(err);

		//ESTO FUNCIONA PERFECTAMENTE Y ME CARGA LA TEMPLATE
		console.log(data)

})