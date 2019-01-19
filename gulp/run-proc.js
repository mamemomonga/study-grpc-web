'use strict'
import { spawn } from 'child_process'

export default function(args,cwd) {
	return new Promise((resolve,reject)=>{
		spawn(args.shift(), args, { cwd: cwd, stdio: 'inherit' }).on('close',(code)=>{
			if (code == 0) { resolve() }
			reject(`run_proc Code: ${code}`)
		})
	})
}

