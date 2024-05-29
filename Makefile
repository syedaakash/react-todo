run: docker-run-all
install: build-backend build-frontend

build-backend:
	docker compose run --rm backend npm install

build-frontend:
	docker compose run --rm frontend npm install

docker-run-all:
	docker compose up --remove-orphans
