# RoboIndex 开发规范 / Development Specification

## 项目架构 / Architecture

```
src/content/papers/*.yaml   →  数据源 (Source of Truth)
        ↓
src/lib/papers.ts           →  数据加载 (Data Loading)
        ↓
  ┌─────┴──────┐
  ↓            ↓
Pages (SSG)   Public API (Static JSON)
app/**        public/api/**
```

- **静态导出** (`output: 'export'`)，无服务端运行时
- 数据流单向：YAML → TypeScript loader → Pages / JSON API
- `prebuild` 脚本在构建前自动生成 `/public/api/` 下的 JSON 文件

---

## 数据规范 / Data Schema

### Paper YAML 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | Yes | 论文标题 |
| `venue` | string | Yes | 发表期刊/会议 (RA-L, ICRA, CoRL, IROS…) |
| `year` | number | Yes | 发表年份 |
| `authors` | string[] | Yes | 作者列表 |
| `abstract` | string | Yes | 摘要 |
| `tags` | string[] | Yes | 标签 (小写, 连字符分隔, e.g. `reinforcement-learning`) |
| `repo` | string | No | GitHub 仓库链接 |
| `project_page` | string | No | 项目主页 |
| `arxiv` | string | No | arXiv 链接 |
| `pdf` | string | No | PDF 链接 |
| `preview_image` | string | No | 预览图路径 |
| `preview_video` | string | No | 预览视频路径 |
| `date_added` | string | Yes | 添加日期 (ISO 格式 `YYYY-MM-DD`) |

### YAML 文件命名

- 文件名即 `slug`，用于 URL 路由和 API 路径
- 使用小写字母和连字符：`paper-name.yaml`
- 避免特殊字符和空格

---

## 接口规范 / API Specification

所有 API 为静态 JSON 文件，由 `scripts/build-data.ts` 在构建时生成。

| 端点 | 说明 | 示例 |
|------|------|------|
| `/api/papers.json` | 所有论文索引（含完整元数据） | `{ papers: Paper[], meta: {...} }` |
| `/api/stats.json` | 聚合统计（按 venue/year/tag） | `{ total, byVenue, byYear, byTag }` |
| `/api/papers/{slug}.json` | 单篇论文详情 | 完整 Paper 对象 |

### API 稳定性承诺

- 上述三个端点路径**不可变更**
- 字段只增不删：可以添加新字段，不可删除或重命名已有字段
- 返回格式始终为 JSON，保持 agent-friendly

---

## 页面路由 / Routes

| 路由 | 组件 | 渲染方式 | 说明 |
|------|------|----------|------|
| `/` | `app/page.tsx` | SSG | 首页 |
| `/papers` | `app/papers/page.tsx` + `PapersPageClient.tsx` | SSG + Client | 论文列表（搜索/筛选） |
| `/papers/:slug` | `app/papers/[slug]/page.tsx` | SSG | 论文详情 |

---

## 组件规范 / Component Conventions

### 目录结构

```
components/
  Header.tsx              # 全局导航
  PaperCard.tsx           # 论文卡片
  PapersPageClient.tsx    # 论文列表客户端交互
  TagPill.tsx             # 标签组件
```

### 规则

- 使用 **函数式组件** + TypeScript
- 服务端组件为默认，仅在需要交互时使用 `'use client'`
- 组件文件使用 **PascalCase** 命名
- Props 通过 `interface` 定义，与组件同文件
- 保持组件小而专注，单一职责

---

## 样式规范 / Styling

- 使用 **Tailwind CSS**，不使用 CSS Modules 或 styled-components
- 主题色定义在 `tailwind.config.ts`：
  - Accent: `#d97757` (terracotta orange)
  - Surface: `#faf9f5` ~ `#ffffff`
  - Text: `#1a1a1a` ~ `#8a8a8a`
- 字体：Source Sans 3 / Inter

---

## 脚本 / Scripts

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建静态站点（自动触发 `prebuild`） |
| `npm run fetch-papers` | 从 GitHub 自动发现新 RA-L 论文 |

### build-data.ts

- 读取 `src/content/papers/*.yaml`
- 生成 `public/api/papers.json`、`public/api/stats.json`、`public/api/papers/{slug}.json`
- 作为 `prebuild` 钩子自动执行

### fetch-papers.ts

- 通过 GitHub API 搜索 RA-L 相关仓库
- 自动提取元数据并生成 YAML 文件
- 遵守 API 速率限制，自动去重

---

## 贡献规范 / Contribution Guide

### 添加论文

1. 在 `src/content/papers/` 下创建 `paper-name.yaml`
2. 按 Data Schema 填写字段
3. 向 `dev` 分支提交 PR

### 代码修改

- 不引入不必要的依赖
- 不破坏已有 API 端点
- 不改变数据 schema（除非同步更新文档）
- 优先复用已有组件

---

## 部署 / Deployment

- 静态导出至 `out/` 目录
- 通过 GitHub Pages / Vercel 部署
- 合并到 `master` 后自动部署
