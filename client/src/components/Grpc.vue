<template>
  <div>
    <h1>Test</h1>
    <div>
      <input type="input" v-model="name" />
      <button @click="hello">send</button>
      <p>Message: {{ message }}</p>
    </div>
  </div>
</template>

<script>

// import { mjs } from '../grpc.js'

const mj = new window.MyExternalJS()
mj.start()

export default {
	name: 'Grpc',
	data: function(){
		return {
			message: '',
			name: ''
		}
	},
	methods: {
		hello() {
			mj.hello(this.name).then((ret)=>{
				this.message = ret
			})
		},
	}
}
</script>
