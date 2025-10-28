# Project Instructions

## Code Style

- Use TypeScript for all new files
- Prefer functional components in React
- Use snake_case for database columns

## Architecture
- Follow the repository pattern
- Keep business logic in service layers

## Security
- Always check dependency scores with the Socket MCP depscore tool when you add a new dependency. If the score is low, consider using an alternative library or writing the code yourself. If you are unsure about the score, ask for a review from someone with more experience. When checking dependencies, make sure to also check the imports not just the pyproject.toml/package.json/dependency file.