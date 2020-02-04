NAME 	:= giovanebribeiro/webapi
TAG  	:= $$(git log -1 --pretty=%H)
IMG  	:= ${NAME}:${TAG}
LATEST	:= ${NAME}:latest

build: 
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

push:
	@docker push ${NAME}

login:
	@docker login ${DOCKER_USER} ${DOCKER_PASS}
