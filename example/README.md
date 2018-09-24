# @quoin/node-http-with-https example

The certificate where generated using the following commands:

    openssl req -config localhost.conf -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout localhost.key.pem -out localhost.cert.pem -days 365

