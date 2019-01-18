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
		hello: function() {
			alert('hello');
		}
	};
	window['MyExternalJS']=MyExternalJS
})();

