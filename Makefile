FILES_CLIENT=$(shell find client -type d -name 'node_modules' -prune -o -type f)
.PHONY: all init

all: proto/hello.proto dist/bin/server dist/bin/client dist/public

init:
	go get -v \
		golang.org/x/net/context \
		google.golang.org/grpc

	cd client && yarn install

src/go/proto/hello.pb.go: proto/hello.proto
	tools/protoc.sh

dist/bin/server: src/go/server/main.go
	go build -o $@ src/go/server/main.go

dist/bin/client: src/go/client/main.go
	go build -o $@ src/go/client/main.go

dist/public: $(FILES_CLIENT)
	cd client && yarn build --mode development --dest ../$@

clean:
	rm -rf dist

