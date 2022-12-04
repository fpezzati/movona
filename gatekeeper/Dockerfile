FROM nginx:1.23-alpine
RUN apk add openssl curl ca-certificates
RUN curl -o /tmp/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub
RUN mv /tmp/nginx_signing.rsa.pub /etc/apk/keys/
RUN printf "%s%s%s%s\n" \
    "@nginx " \
    "http://nginx.org/packages/alpine/v" \
    `egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release` \
    "/main" \
    | tee -a /etc/apk/repositories
RUN apk add nginx-module-image-filter@nginx nginx-module-njs@nginx

COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
COPY ./conf/jwt_auth.js /tmp/jwt_auth.js
EXPOSE 80 443
