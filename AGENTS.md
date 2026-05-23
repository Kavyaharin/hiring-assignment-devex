# AGENTS.md

## Repository Overview

This repository contains:

- Deployment Registry API (.NET)
- Deployment Insights API (Node.js/TypeScript)
- MongoDB
- Docker Compose orchestration

## Services

### deployment-registry
Source system for deployment records.

### deployment-insights
Stateless analytics service consuming Registry API data.

## Common Commands

Start all services:

make up

Run tests:

make test

View logs:

make logs

Stop services:

make down

## Architecture Principles

- Stateless services
- Docker-first local development
- Clear service boundaries
- Lightweight operational model
- Testable aggregation logic
- Minimal operational complexity

## Notes for Contributors and Coding Agents

- Keep route handlers thin
- Prefer pure utility functions for calculations
- Avoid introducing unnecessary infrastructure
- Maintain Docker Compose compatibility
- Preserve stateless Insights service design