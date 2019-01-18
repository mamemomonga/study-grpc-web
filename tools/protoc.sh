#!/bin/bash
set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $BASEDIR/tools/functions

VOL_NAME="znly_protoc_bind_$$"

# https://hub.docker.com/r/znly/protoc
APP_NAME="znly/protoc:0.4.0"

bindfs_start
pull_image

PROTOC_SRC=./proto/hello.proto
PROTOC_INC=./proto

PROTOC_GO=./src/go/proto
PROTOC_JS=./grpc-web/src/proto
PROTOC_DOC=./proto

mkdir -p $PROTOC_JS
mkdir -p $PROTOC_GO
mkdir -p $PROTOC_DOC

echo "Running $APP_NAME"
docker run --rm -v $VOL_TARGET:$(pwd) -w $(pwd) $APP_NAME \
	-I $PROTOC_INC \
	--go_out=plugins=grpc:$PROTOC_GO \
	--js_out=import_style=commonjs,binary:$PROTOC_JS \
	--grpc-web_out=import_style=commonjs,mode=grpcweb:$PROTOC_JS \
	--doc_out=markdown,proto.md:$PROTOC_DOC \
	$PROTOC_SRC

bindfs_finish

# MarkdownにHTMLタグが混ざるのが気持ち悪いので除去
cat $PROTOC_DOC/proto.md | perl -nE 's#<(?:a|p) (?:.+)>##g; print' > $PROTOC_DOC/proto.new.md
mv $PROTOC_DOC/proto.new.md $PROTOC_DOC/proto.md

