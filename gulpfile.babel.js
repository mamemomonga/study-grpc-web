// gulpfile.babel.js
'use strict'
import { task, src, dest, series, parallel, watch } from 'gulp'
import log from 'fancy-log'
import rimraf from 'rimraf'
import hash from 'gulp-hash'

import append_jstag from './gulp/append-jstag.js'
import run from './gulp/run.js'

const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false

// task: protoc
task('protoc',series(()=>{
	return run(['bash','tools/protoc.sh'],undefined)
}))

// task: go
task('go',series(()=>{
	return run(['make'],'go')
},()=>{
	return src( [ 'go/dist/**' ],{ base:'go/dist' }).pipe(dest( 'var/dist/bin' ))
}))

// task: api
task('api',series(()=>{
	return run(['yarn','run','webpack-cli'],'api')
},()=>{
	return src('api/dist/api.js',{ base:'api/dist' })
	.pipe(hash())
	.pipe(dest('var/dist/static'))
	.pipe(hash.manifest('api-mamifest.json'))
	.pipe(dest('var'))
},()=>{
	return append_jstag({
		manifest: './var/api-mamifest.json',
		html: './var/dist/index.html',
		path: '/static/'
	})
}))

// task: client
task('client',series(()=>{
	return run(['yarn','run','build'],'client')
},()=>{
	return src([ 'client/dist/**' ],{ base:'client/dist' }).pipe(dest( 'var/dist' ))
}))

// cleanup
task('clean',(done)=>{
	rimraf('var/dist',done)
})

// build
task('default',series('clean','protoc','go','client','api'))

