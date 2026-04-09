# RoboIndex
> This file provides guidance for Claude Code when working in this repository.


Structured robotics research paper data — content only, no frontend.

# Soul

minimalist, simple is more; high-taste, ai-powered, community-driven, open-source, bilingual (zh/en)

# Project Overview

RoboIndex is an open-source platform for the robotics research community.

The goal of RoboIndex is to help researchers:

- discover robotics papers
- explore open-source robotics projects
- share submission experiences
- access robotics tools and resources
- interact with AI agents

The platform is designed to be **agent-friendly** and provide structured data for both humans and AI systems.

## Data

- 520+ paper YAML files in `src/content/papers/`
- Fields: title, venue, year, authors, abstract, tags, repo, project_page, arxiv, pdf, date_added

# Core Features

The platform includes the following core modules:

### Paper Index
A structured index of robotics papers with metadata.

Includes:

- paper cards
- search and filtering
- GitHub repository links

---

### Open-source RAL Papers

Showcase robotics papers from RA-L that provide open-source GitHub repositories.

Each paper should include:

- title
- authors
- conference/journal
- summary
- GitHub repository
- tags

---

### Submission Experience Community

A community section where users share submission experiences.

Examples:

- RA-L submission experience
- ICRA / IROS conference participation
- review timeline
- rebuttal experience

---

### Paper Analytics Dashboard

Provide analytics and statistics for robotics papers and repositories.

Examples:

- research topic distribution
- programming language usage
- toolchain statistics
- hardware platform usage
- keyword trends

---

### Robotics Tools

Curated robotics tools including:

- ROS2 utilities
- simulation tools
- visualization tools
- research productivity tools

---

### Agent Infrastructure

RoboIndex is designed to be **AI-agent friendly**.

The platform provides:

- structured JSON APIs
- CLI tools
- MCP server for AI agents

Example APIs:

/api/papers.json
/api/tools.json
/api/guides.json

These APIs should remain stable.

# Technology Stack

The project uses the following stack:

Frontend

- Next.js
- React
- Tailwind CSS

Deployment

- GitHub
- Vercel

Data

- JSON-based structured data
- community contributions via pull requests

---

# Repository Structure

Typical structure:

/app            → Next.js pages
/components     → UI components
/data           → structured JSON datasets
/api            → API endpoints
/docs           → documentation

Data files may include:

/data/papers.json
/data/tools.json
/data/guides.json

Community contributions will mainly modify files in `/data`.

---

# Development Rules

Claude should follow these rules when modifying the codebase.

### Code Style

- Use TypeScript
- Use functional React components
- Prefer small reusable components
- Follow existing project structure

### Architecture

- Do not introduce new root-level directories unless necessary
- Reuse existing components
- Keep APIs simple and stable

### Data

- Do not change the schema of existing JSON data without updating documentation
- Avoid breaking existing API responses

---

# Contribution Workflow

The project is open-source and designed for community contributions.

Typical workflow:

1. fork repository
2. modify data or code
3. open pull request
4. automatic deployment updates the website

Common contributions:

- add new robotics papers
- add new tools
- add submission experiences

---

# Claude Development Workflow

When implementing features, Claude should follow this process:

1. Read README.md
2. Read ARCHITECTURE.md if available
3. Understand repository structure
4. Implement small incremental changes
5. Update documentation if needed
6. Ensure APIs remain stable

Avoid large refactors unless explicitly requested.

---

# Safety Rules

Claude should not:

- break existing APIs
- modify data schema without documentation
- introduce unnecessary dependencies
- restructure the repository drastically

Prefer minimal and maintainable changes.

---

# Long-Term Vision

RoboIndex aims to become a central hub for robotics research by combining:

- paper discovery
- open-source robotics projects
- research experience sharing
- AI agent integration
- community collaboration
