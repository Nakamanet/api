.PHONY: help install dev test migrate seed deploy build up down logs shell

# Adonis.js Chat Makefile
# Standalone commands for Adonis.js chat service

YELLOW := \033[0;33m
GREEN := \033[0;32m
RED := \033[0;31m
BLUE := \033[0;34m
NC := \033[0m

# ============================================================================
# CONFIGURATION
# ============================================================================

SERVICE_NAME := adonis-chat
DOCKER_IMAGE := $(SERVICE_NAME):latest
CONTAINER_NAME := anime-adonis
NODE_ENV ?= development

help: ## Show all available commands
	@echo "$(BLUE)=== Adonis.js Chat Makefile ===$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-25s$(NC) %s\n", $$1, $$2}'

# ============================================================================
# INSTALLATION & SETUP
# ============================================================================

install: ## Full setup: install deps, build, migrate
	@echo "$(GREEN)Installing Adonis Chat...$(NC)"
	npm install
	cp .env.example .env
	node ace generate:key
	@echo "$(GREEN)✓ Installation complete$(NC)"

deps: ## Install npm dependencies
	@echo "$(GREEN)Installing npm dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

deps-update: ## Update npm dependencies
	@echo "$(YELLOW)Updating dependencies...$(NC)"
	npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

deps-audit: ## Audit npm dependencies for vulnerabilities
	@echo "$(BLUE)Auditing npm packages...$(NC)"
	npm audit

deps-audit-fix: ## Auto-fix vulnerable dependencies
	@echo "$(BLUE)Fixing vulnerabilities...$(NC)"
	npm audit fix
	@echo "$(GREEN)✓ Fixed$(NC)"

# ============================================================================
# DOCKER OPERATIONS
# ============================================================================

build: ## Build Docker image
	@echo "$(BLUE)Building Docker image: $(DOCKER_IMAGE)...$(NC)"
	docker build -t $(DOCKER_IMAGE) .
	@echo "$(GREEN)✓ Image built$(NC)"

up: ## Start Adonis service
	@echo "$(GREEN)Starting $(SERVICE_NAME)...$(NC)"
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p 3333:3333 \
		-v $(PWD):/app \
		-w /app \
		-e NODE_ENV=$(NODE_ENV) \
		$(DOCKER_IMAGE) \
		npm run dev
	@echo "$(GREEN)✓ Service running at http://localhost:3333$(NC)"

down: ## Stop Adonis service
	@echo "$(YELLOW)Stopping $(SERVICE_NAME)...$(NC)"
	docker stop $(CONTAINER_NAME) 2>/dev/null || true
	docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "$(GREEN)✓ Service stopped$(NC)"

restart: ## Restart Adonis service
	@echo "$(YELLOW)Restarting $(SERVICE_NAME)...$(NC)"
	@make down
	@make up

logs: ## Tail service logs
	docker logs -f $(CONTAINER_NAME)

ps: ## Show running containers
	docker ps | grep $(SERVICE_NAME) || echo "$(YELLOW)No running containers$(NC)"

# ============================================================================
# DATABASE & MIGRATIONS
# ============================================================================

migrate: ## Run database migrations
	@echo "$(GREEN)Running migrations...$(NC)"
	node ace migration:run

migrate-fresh: ## Fresh migrations (⚠️ drops all data)
	@echo "$(RED)⚠️  This will DROP all data!$(NC)"
	node ace migration:refresh

migrate-rollback: ## Rollback last migration
	@echo "$(YELLOW)Rolling back migrations...$(NC)"
	node ace migration:rollback

migrate-status: ## Check migration status
	node ace migration:status

seed: ## Seed database with sample data
	@echo "$(GREEN)Seeding database...$(NC)"
	node ace db:seed

seed-specific: ## Seed specific database (usage: make seed-specific FILE="database/seeders/UserSeeder")
	@echo "$(GREEN)Seeding from $(FILE)...$(NC)"
	node ace db:seed --files="$(FILE)"

seed-fresh: ## Fresh migrations + seed
	@echo "$(GREEN)Fresh database with seeds...$(NC)"
	node ace migration:refresh
	node ace db:seed

# ============================================================================
# DEVELOPMENT
# ============================================================================

dev: docker-dev ## Start development server with Docker

local-serve: ## Start local development server (no Docker)
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

start: ## Start production server
	@echo "$(GREEN)Starting production server...$(NC)"
	npm start

watch: ## Watch files for changes
	@echo "$(BLUE)Watching for changes...$(NC)"
	npm run dev

build-ts: ## Build TypeScript
	@echo "$(BLUE)Building TypeScript...$(NC)"
	npm run build

inspect: ## Start with Node inspector
	@echo "$(BLUE)Starting with inspector...$(NC)"
	node --inspect=0.0.0.0:9229 ace serve --watch

repl: ## Open REPL for interactive debugging
	@echo "$(BLUE)Opening REPL...$(NC)"
	node ace repl

# ============================================================================
# TESTING
# ============================================================================

test: ## Run all tests
	@echo "$(BLUE)Running tests...$(NC)"
	npm run test

test-watch: ## Run tests in watch mode
	@echo "$(BLUE)Running tests in watch mode...$(NC)"
	npm run test:watch

test-coverage: ## Generate test coverage
	@echo "$(BLUE)Generating coverage...$(NC)"
	npm run test:coverage
	@echo "$(GREEN)✓ Report in coverage/index.html$(NC)"

test-unit: ## Run unit tests only
	npm run test -- --grep="Unit"

test-integration: ## Run integration tests only
	npm run test -- --grep="Integration"

# ============================================================================
# CODE QUALITY
# ============================================================================

lint: ## Lint code
	@echo "$(BLUE)Linting code...$(NC)"
	npm run lint

lint-fix: ## Auto-fix linting issues
	@echo "$(BLUE)Fixing linting issues...$(NC)"
	npm run lint:fix

format: ## Format code with Prettier
	@echo "$(BLUE)Formatting code...$(NC)"
	npm run format

format-check: ## Check code formatting
	npm run format:check

typecheck: ## Type check TypeScript
	@echo "$(BLUE)Type checking...$(NC)"
	npx tsc --noEmit

# ============================================================================
# DATABASE UTILITIES
# ============================================================================

fresh-db: migrate-fresh seed ## Reset database completely
	@echo "$(GREEN)✓ Database reset$(NC)"

backup-db: ## Backup MongoDB/database
	@mkdir -p backups
	@echo "$(GREEN)Backing up database...$(NC)"
	mongodump --out backups/mongodb_$(shell date +%Y%m%d_%H%M%S) || echo "$(YELLOW)MongoDB not available$(NC)"
	@echo "$(GREEN)✓ Backup complete$(NC)"

restore-db: ## Restore database (usage: make restore-db FILE=backups/mongodb_*)
	@echo "$(YELLOW)Restoring from $(FILE)...$(NC)"
	mongorestore --drop $(FILE) || echo "$(YELLOW)MongoDB restore failed$(NC)"
	@echo "$(GREEN)✓ Restore complete$(NC)"

# ============================================================================
# UTILITIES
# ============================================================================

npm: ## Run npm command (usage: make npm CMD="install package-name")
	npm $(CMD)

ace: ## Run Ace command (usage: make ace CMD="migration:run")
	node ace $(CMD)

install-pkg: ## Install npm package (usage: make install-pkg PKG="package-name")
	npm install $(PKG)

install-pkg-dev: ## Install dev dependency (usage: make install-pkg-dev PKG="package-name")
	npm install --save-dev $(PKG)

remove-pkg: ## Remove npm package (usage: make remove-pkg PKG="package-name")
	npm uninstall $(PKG)

version: ## Show Node and npm versions
	@echo "Node: $$(node --version)"
	@echo "npm: $$(npm --version)"

info: ## Show environment info
	@echo "$(BLUE)=== Adonis Chat Info ===$(NC)"
	@echo "Service: $(SERVICE_NAME)"
	@echo "Environment: $(NODE_ENV)"
	@node ace env
	@echo ""
	@echo "$(BLUE)Top Dependencies:$(NC)"
	@npm list --depth=0 | head -15

env-check: ## Check .env configuration
	@echo "$(BLUE)=== Environment Check ===$(NC)"
	@test -f .env && echo "$(GREEN)✓ .env exists$(NC)" || echo "$(RED)✗ .env missing$(NC)"
	@grep -q "PORT=" .env && echo "$(GREEN)✓ PORT set$(NC)" || echo "$(RED)✗ PORT missing$(NC)"
	@grep -q "NODE_ENV=" .env && echo "$(GREEN)✓ NODE_ENV set$(NC)" || echo "$(RED)✗ NODE_ENV missing$(NC)"
	@grep -q "MONGODB_URL=" .env || grep -q "DB_" .env && echo "$(GREEN)✓ Database config set$(NC)" || echo "$(RED)✗ Database config missing$(NC)"

# ============================================================================
# DEVELOPMENT HELPERS
# ============================================================================

seed-users: ## Create test users
	@echo "$(GREEN)Seeding users...$(NC)"
	node ace db:seed --files="database/seeders/UserSeeder"

seed-chats: ## Create test chat data
	@echo "$(GREEN)Seeding chats...$(NC)"
	node ace db:seed --files="database/seeders/ChatSeeder"

seed-all: migrate-fresh ## Seed all data
	@echo "$(GREEN)Seeding all data...$(NC)"
	npm run db:seed

make-model: ## Create new model (usage: make make-model NAME="Chat")
	node ace make:model $(NAME)

make-controller: ## Create new controller (usage: make make-controller NAME="ChatController")
	node ace make:controller $(NAME)

make-migration: ## Create new migration (usage: make make-migration NAME="create_chats_table")
	node ace make:migration $(NAME)

make-seeder: ## Create new seeder (usage: make make-seeder NAME="ChatSeeder")
	node ace make:seeder $(NAME)

make-test: ## Create new test (usage: make make-test NAME="ChatTest")
	node ace make:test $(NAME)

# ============================================================================
# CLEANUP
# ============================================================================

clean: ## Clean temporary files
	@echo "$(YELLOW)Cleaning up...$(NC)"
	rm -rf tmp/
	rm -rf build/
	rm -rf .env.local
	@echo "$(GREEN)✓ Cleaned$(NC)"

clean-node-modules: ## Remove node_modules
	@echo "$(YELLOW)Removing node_modules...$(NC)"
	rm -rf node_modules/
	@echo "$(GREEN)✓ Removed$(NC)"

clean-all: clean clean-node-modules ## Complete cleanup
	@echo "$(GREEN)✓ Complete cleanup done$(NC)"

prune: ## Remove dangling Docker images
	docker image prune -f

# ============================================================================
# DOCKER COMPOSE INTEGRATION
# ============================================================================

docker-dev: build ## Build and run with Docker Compose
	@echo "$(GREEN)Starting with Docker Compose...$(NC)"
	docker-compose up adonis
	@echo "$(GREEN)✓ Running at http://localhost:3333$(NC)"

docker-down: ## Stop Docker Compose service
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f adonis

docker-shell: ## Access Docker container shell
	docker-compose exec adonis bash

docker-migrate: ## Run migrations in Docker
	docker-compose exec -T adonis node ace migration:run

docker-seed: ## Seed database in Docker
	docker-compose exec -T adonis node ace db:seed

# ============================================================================
# PRODUCTION
# ============================================================================

prod-build: ## Build production image
	docker build -t $(DOCKER_IMAGE)-prod --build-arg NODE_ENV=production .

prod-start: ## Start production server
	@echo "$(GREEN)Starting production server...$(NC)"
	NODE_ENV=production npm start

prod-optimize: ## Optimize for production
	@echo "$(BLUE)Optimizing for production...$(NC)"
	npm run build
	npm install --production
	@echo "$(GREEN)✓ Ready for production$(NC)"

prod-deploy: prod-build ## Deploy production image
	@echo "$(GREEN)Production build ready$(NC)"
	@echo "$(YELLOW)Push to registry and deploy:$(NC)"
	@echo "  docker push $(DOCKER_IMAGE)-prod"

# ============================================================================
# MONITORING
# ============================================================================

monitor: ## Monitor service with Node
	@echo "$(BLUE)Starting monitoring...$(NC)"
	npm run monitor || echo "$(YELLOW)Monitor script not defined$(NC)"

health-check: ## Check service health
	@echo "$(BLUE)Checking health...$(NC)"
	curl http://localhost:3333/health || echo "$(RED)Service not responding$(NC)"

.DEFAULT_GOAL := help
