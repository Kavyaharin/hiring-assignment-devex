up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

test:
	cd deployment-insights && npm test

clean:
	docker compose down -v

restart:
	docker compose down && docker compose up --build

ps:
	docker compose ps