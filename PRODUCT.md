# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Alunos (Students)**: Primary users on mobile who use the portal to consult the Intelligent Tutor, check study plans, review performance metrics, and track study goals.
- **Coordenadores (Coordinators)**: Primary users on desktop/web who monitor students' pedagogical radar, check schedules, analyze performance indicators, and manage student tracking.

## Product Purpose
Portal Atlas is an educational dashboard designed to support students and coordinators. It integrates study planning, real-time feedback via an intelligent conversational tutor, and performance tracking to improve learning outcomes and school management.

## Positioning
A highly personalized, chat-driven learning companion integrated directly with school curriculum plans and student performance data, offering actionable, context-aware goals and plans instead of generic advice.

## Operating Context
- Students interact primarily through a conversational interface (Tutor) on both mobile and desktop.
- Mobile usage is highly focused on quick status checks, messaging the tutor, and marking tasks as done.
- Coordinators use a rich, data-dense desktop web app to analyze metrics and track pedagogical flags.

## Capabilities and Constraints
- Web application built with React, TanStack Router, and Tailwind CSS.
- Dual-role profiles: Aluno (Student) and Coordenador (Coordinator).
- Fully responsive design layout (desktop sidebar, mobile bottom nav, mobile top header).

## Brand Commitments
- Name: Portal Atlas
- Persona/Voice: Helpful, encouraging, and clear (for students); professional, data-driven, and supportive (for coordinators).

## Evidence on Hand
- Interactive chat component in [tutor.index.tsx](file:///home/moa-dev/projetos/atlas-compass-prot-main/src/routes/tutor.index.tsx).
- Pedagogical radar charts in coordinator portal.
- Mobile bottom navigation and top headers in [Sidebar.tsx](file:///home/moa-dev/projetos/atlas-compass-prot-main/src/components/portal/Sidebar.tsx).

## Product Principles
1. **Student-centricity**: Learning tools must be frictionless and highly responsive on mobile.
2. **Actionability**: Every insight (radar, desempenho, tutor) must point to concrete steps.
3. **Conversational Support**: The AI tutor is the central hub for learning guidance.
