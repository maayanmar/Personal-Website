# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Maayan Margolin — a CV/portfolio site showcasing professional experience, technical skills, and project highlights. Plain HTML + CSS + minimal JS — no build step, no dependencies.

## Tech Stack

- **HTML/CSS/JS** — no framework, no bundler
- **Hosting** — Cloudflare Pages at `maayan-margolin.pages.dev`
- **Fonts** — Inter via Google Fonts

## Site Structure

```
index.html              — Landing page (hero, project cards, academic, CV download)
vehagita.html           — VeHagita project sub-page
wordpress-security.html — WordPress Security sub-page
teaching.html           — Teaching placeholder → links to learn-with-maayan.netlify.app
css/style.css           — Single stylesheet with design tokens + all layouts
js/main.js              — Mobile nav toggle
```

## Build & Deploy

No build step required. To deploy:

```bash
npx wrangler pages deploy . --project-name=maayan-margolin
```

Or connect the GitHub repo to Cloudflare Pages dashboard for automatic deploys.

## Key Projects to Showcase

### VeHagita — Social Torah Study Platform
- Full-stack platform: Vite 5 + React 18 + TypeScript frontend, Supabase backend (PostgreSQL + Auth + Edge Functions + RLS), Cloudflare Pages hosting
- 23,206 Tanakh verses with 206,379 commentary segments from 37+ classical sources
- Users write pirushim (personal insights) via Tiptap rich text editor
- Built with: Claude Code (MCP servers), Supabase, Cloudflare, Lovable
- Features: infinite-scroll reader, offline caching (IndexedDB), full-text search, fisheye progress rail, Google OAuth, multiple commentary layouts

### Wordpress-Security — WAF & Automated Security Testing
- Cloudflare WAF implementation with a 5-rule layered defense system for WordPress sites
- WAF Monitor: progressive rules (allow good bots → challenge crawlers → geo/provider filter → VPN/login protection → block hostile traffic)
- Playwright Test Runner: automated E2E testing to validate WAF rule effectiveness and ensure zero false positives
- Includes video content protection strategies and bilingual vulnerability documentation

## Repository Context

- Owner GitHub: maayanmar
- The CV source file (Maayan_Margolin_CV_EN.docx) is in the repo root for reference
