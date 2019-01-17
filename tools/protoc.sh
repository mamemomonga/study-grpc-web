#!/bin/bash
set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $BASEDIR/tools/functions

VOL_NAME="znly_protoc_bind_$$"

# https://hub.docker.com/r/znly/protoc
APP_NAME="znly/protoc:0.4.0"

bindfs_start
pull_image

mkdir -p src/js/proto
mkdir -p src/go/proto

echo "Running $APP_NAME"
docker run --rm -v $VOL_TARGET:$(pwd) -w $(pwd) $APP_NAME \
	-I ./proto \
	--go_out=plugins=grpc:./src/go/proto \
	--js_out=import_style=commonjs,binary:./src/js/proto \
	--grpc-web_out=import_style=commonjs,mode=grpcweb:./src/js/proto \
	--doc_out=markdown,proto.md:./ \
	proto/hello.proto 

bindfs_finish

# MarkdownにHTMLタグが混ざるのが気持ち悪いので除去
cat proto.md | perl -nE 's#<(?:a|p) (?:.+)>##g; print' > proto.new.md
mv proto.new.md proto.md

