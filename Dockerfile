FROM alpine:3.13.2

RUN apk add --no-cache nodejs npm && \
	wget https://github.com/itslupus/assign_comp4350/archive/master.zip && \
	unzip master.zip && \
	rm -f master.zip && \
	cd assign_comp4350-master && \
	npm ci --quiet && \
	npm run build --quiet && \
	rm -rf node_modules && \
	npm install -g serve --quiet && \
	apk del npm

EXPOSE 5000

WORKDIR /assign_comp4350-master/build

CMD ["serve"]
