.PHONY: init all dist

all: dist/server dist/client

init:
	go get -v \
		golang.org/x/net/context \
		google.golang.org/grpc

clean:
	rm -rf dist

dist/server: server/main.go
	go build -o $@ $<

dist/client: client/main.go
	go build -o $@ $<


