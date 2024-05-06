.PHONY: build
build: ## Собрать проект на тачке
	npm run build:prod

.PHONY: build-dev
build-dev: ## Собрать проект локально
	npm run build:dev

.PHONY: run-local
run-local: ## Запустить проект на локалочке
	go run server.go

.PHONY: lint
lint: ## Запустить fix и линтеры
	npm run lint

.PHONY: fix
fix: ## Запустить fix
	npm run fix

.PHONY: run-prod
run-prod: ## Запустить приложение на тачке
	docker compose -f deploy/docker-compose.yaml up -d

.PHONY: stop-prod
stop-prod: ## Остановить приложение на тачке
	docker stop 148b58a73786

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(firstword $(MAKEFILE_LIST)) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL:=help
