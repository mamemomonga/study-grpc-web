// gulpfile.babel.js
'use strict'
import { task, src, dest, series, parallel, watch } from 'gulp'
import log from 'fancy-log'
import rimraf from 'rimraf'
import hash from 'gulp-hash'

import append_jstag from './gulp/append-jstag.js'
import run from './gulp/run.js'
import process from 'process'

const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false

// task: protoc
task('protoc',series(()=>{
	return run(['bash','tools/protoc.sh'])
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
	.pipe(dest('var/dist/js'))
	.pipe(hash.manifest('api-mamifest.json'))
	.pipe(dest('var'))
},()=>{
	return append_jstag({
		manifest: './var/api-mamifest.json',
		html: './client/dist/index.html',
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

// serve
task('serve',series(
	()=>{
		watch('proto/*.proto', series('protoc','go','api'))
		watch('go/**', series('go'))
		watch('api/src/**', series('api'))
		watch('client/+(public|src)/**', series('client','api'))
		watch('etc/nginx', ()=>{ return run(['docker-compose','restart','nginx']) })
		log('START SERVE')
	}
))


