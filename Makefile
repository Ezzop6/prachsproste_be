create_dev: .env
	@docker compose up --build --force-recreate -d

.env:
	@cp .env.dev .env

up:
	@docker compose up -d

stop:
	@docker compose stop

rebuild:
	@docker compose up --force-recreate --build -d

restart:
	@docker compose restart

clean:
	@docker compose down --rmi all --volumes --remove-orphans
