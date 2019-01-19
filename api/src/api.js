'use strict';

(()=>{
	const pb = require("./proto/hello_pb");
	const grpc = require("./proto/hello_grpc_web_pb");
	const server = "https://uvm1:8080";

	const gRPCWeb=function(){};
	gRPCWeb.prototype={
		hello: function(mesg) {
			return new Promise((resolve,reject)=>{
				const req = new grpc.HelloRequest()
				req.setName(mesg)

				const client = new pb.HelloServiceClient(server, {}, {})
				client.hello(req, {}, (err, ret)=>{
					resolve( ret.getMessage() );
				})
			})
		}
	};

	window['gRPCWeb']=gRPCWeb;
})()
