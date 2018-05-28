# @quoin/node-http-with-https example

The certificate where generated using the following commands:

    openssl genrsa -out example.key 2048
    openssl req -new -x509 -key example.key -out example.cert -days 3650 -subj '/C=US/ST=Massachusetts/L=Boston/O=Quoin Inc/CN=Quoin Inc'

