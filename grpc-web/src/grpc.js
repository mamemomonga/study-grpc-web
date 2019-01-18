// ES5 externaljs.js
'use strict';

import { HelloServiceClient } from "./proto/hello_grpc_web_pb"
import { HelloRequest, HelloResponse } from "./proto/hello_pb"

// var HelloServiceClient = require('./proto/hello_grpc_web_pb')
// var hello_pb = require('./proto/hello_pb')
// var HelloRequest = hello_pb.HelloRequest

(function() {
	var MyExternalJS = function() {
	};
	MyExternalJS.prototype={
		hello: function(msg) {
			return new Promise((resolve,reject)=> {
				console.log('grpc:' + msg);

				var client = new HelloServiceClient("https://uvm1:8080", {}, {});
				var req = new HelloRequest();
				req.setName(msg);
				client.hello(req, {}, (err, ret) => {
					console.log(ret);
					var resp=ret.getMessage();
					console.log("RESP:"+resp);
					resolve(resp)
				})
			})
		},
		start: function() {
			console.log("START");
		},
	};
	window['MyExternalJS']=MyExternalJS
})();

