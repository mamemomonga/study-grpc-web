
all: dist/bin/server dist/bin/client dist/public

dist/bin/server:
	go build -o $@ src/go/server/main.go

dist/bin/client:
	go build -o $@ src/go/client/main.go

dist/public:
	cd client && yarn build --mode development --dest ../$@

clean:
	rm -rf dist
