#!/bin/bash
set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"

FILENAME=etc/nginx/keys/localhost8080
COMMON_NAME="localhost:8080"

mkdir -p etc/nginx/keys

openssl genrsa 2048 > $FILENAME.key
echo "Create: $FILENAME.key"

openssl req -new -x509 -days 3650 \
	-key $FILENAME.key \
	-out $FILENAME.crt \
	-subj "/CN=$COMMON_NAME/ST=Kyoto/L=Kyoto/O=SnakeOil Japan LTD./OU=Web Section"
echo "Create: $FILENAME.crt"
