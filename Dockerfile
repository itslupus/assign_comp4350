FROM nginx:1.19.7-alpine

WORKDIR /root

COPY . /root/

RUN apk add --no-cache --virtual .node_deps nodejs npm && \
	npm ci --quiet && \
	npm run build && \
	apk del .node_deps && \
	cp -r build/* /usr/share/nginx/html/ && \
	rm -rf ./* 

EXPOSE 80
