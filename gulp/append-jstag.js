'use strict'
import fs from 'fs'

export default function(opt) {
	return new Promise((resolve,reject)=>{
		const manifest=JSON.parse(fs.readFileSync(opt.manifest))
		let buf=fs.readFileSync(opt.html)
		buf+=`\n<script type="text/javascript" src="${opt.path}${manifest['api.js']}"></script>\n`
		fs.writeFileSync(opt.html,buf)
		console.log(`REWRITE: ${opt.html}`)
		resolve()
	})
}

