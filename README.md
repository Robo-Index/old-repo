# RoboIndex

> Structured robotics research paper data — bilingual, open-source.

26 robotics papers with structured metadata (venue, year, authors, tags, links).

## Data

All paper data lives in `src/content/papers/*.yaml`.

Each YAML file contains:

```yaml
title: "Paper Title"
venue: RA-L          # RA-L, ICRA, CoRL, IROS, etc.
year: 2025
authors: [...]
abstract: "..."
tags: [manipulation, reinforcement-learning]
repo: https://github.com/...
arxiv: https://arxiv.org/abs/...
date_added: "2025-01-01"
```

## Contributing

Add a paper: create a YAML file in `src/content/papers/` and submit a PR to `dev`.

## Authors

- Ce Hao
- Yinglei Zhu

## License

[MIT](LICENSE)
