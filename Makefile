
FILES_CLIENT=$(shell find client -type d -name 'node_modules' -prune -o -type f)
FILES_GRPC_WEB=$(shell find grpc-web/src -type d -name 'node_modules' -prune -o -type f)

NODE_ENV=$(shell if [ -z "$$NODE_ENV" ]; then echo "development"; else echo $$NODE_ENV; fi)

.PHONY: all init

all: src/go/proto/hello.pb.go \
	dist/bin/server \
	dist/bin/client \
	dist/public/client \
	dist/static/grpc.js

init:
	go get -v \
		golang.org/x/net/context \
		google.golang.org/grpc

	cd client && yarn install

dist/static/grpc.js: $(FILES_GRPC_WEB) proto/hello.proto
	echo ${NODE_ENV}
	NODE_ENV=${NODE_ENV} cd grpc-web && yarn webpack-cli

src/go/proto/hello.pb.go: proto/hello.proto
	tools/protoc.sh

dist/bin/server: src/go/server/main.go
	go build -o $@ src/go/server/main.go

dist/bin/client: src/go/client/main.go
	go build -o $@ src/go/client/main.go

dist/public/client: $(FILES_CLIENT)
	cd client && yarn build --mode ${NODE_ENV} --dest ../$@

clean:
	rm -rf dist

