
FILES_CLIENT=$(shell find client -type d -name 'node_modules' -prune -o -type f)
FILES_GRPC_WEB=$(shell find grpc-web/src -type d -name 'node_modules' -prune -o -type f)

NODE_ENV=$(shell if [ -z "$$NODE_ENV" ]; then echo "development"; else echo $$NODE_ENV; fi)

.PHONY: all init

all: src/go/proto/hello.pb.go \
	var/dist/bin/server \
	var/dist/bin/client \
	var/dist/public \
	var/dist/public/static/grpc.js

init:
	go get -v \
		golang.org/x/net/context \
		google.golang.org/grpc

	cd client && yarn install

src/go/proto/hello.pb.go: proto/hello.proto
	tools/protoc.sh

var/dist/bin/server: src/go/server/main.go
	go build -o $@ src/go/server/main.go

var/dist/bin/client: src/go/client/main.go
	go build -o $@ src/go/client/main.go

var/dist/public: $(FILES_CLIENT)
	cd client && yarn build --mode ${NODE_ENV} --dest ../$@

var/dist/public/static/grpc.js: $(FILES_GRPC_WEB) proto/hello.proto
	NODE_ENV=${NODE_ENV} cd grpc-web && yarn webpack-cli

clean:
	rm -rf var/dist

