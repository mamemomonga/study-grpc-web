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
			const api=new window.gRPCWeb()
			api.hello(this.name)
			.then((resp)=>{ this.message=resp })
			.catch((e)=>{ alert(`エラー: ${e}`) })
		},
	}
}
</script>
