.PHONY: build
build:
	npm run build

.PHOBY: run
run: build
	go run server.go

.DEFAULT_GOAL:=run
