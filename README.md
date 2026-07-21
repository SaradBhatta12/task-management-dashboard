# Taskflow

Taskflow is a responsive task management dashboard built with Next.js App Router and TypeScript. It includes mock authentication, persisted user state and filters, a local REST API, complete task CRUD, dashboard summaries, theme support, and accessible loading, error, empty, modal, and confirmation states.

## Installation

Requirements:

- Node.js 20 or newer
- npm 10 or newer

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The login is intentionally mocked. Use any valid email address and any password containing at least six characters.

```text
Email: alex@example.com
Password: 123456
```

Available scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
npm run format:check
```

## Environment Variables

No environment variables are required. By default, RTK Query uses the included Next.js Route Handlers under `/api`.

To use a compatible external API instead, create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://example.com/api
```

The external API must expose compatible `/tasks` and `/tasks/:id` endpoints.

## Project Structure

```text
src/
├── app/                  Next.js routes, layouts, and mock API handlers
├── components/
│   ├── common/           Reusable feedback and dialog components
│   ├── layout/           Navbar, sidebar, theme toggle, transitions
│   └── ui/               shadcn UI primitives
├── features/
│   ├── auth/             Authentication state and login flow
│   ├── dashboard/        Live task summaries and progress views
│   ├── tasks/            CRUD, filters, task cards, and RTK Query API
│   └── ui/               Shared interface state
├── lib/                  Providers, mock data, and validation
├── store/                Redux store, reducer, and typed hooks
├── types/                Domain types
├── constants/            Shared constants
└── utils/                Shared utilities
```

## Libraries Used

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Base UI
- Redux Toolkit and React Redux
- RTK Query
- Redux Persist
- Framer Motion
- Lucide React
- ESLint and Prettier

The theme implementation is intentionally local and persists the selected light or dark mode in browser storage.

## Architecture Notes

The App Router remains server-first. Interactive areas are isolated behind client boundaries, including Redux providers, authentication guards, task workflows, filters, navigation state, and animations.

Redux Toolkit owns authentication, filter, selected-task, and UI state. Redux Persist stores authentication, filters, and the desktop sidebar preference. RTK Query owns server data and request state; its API cache is intentionally excluded from persistence.

The included Route Handlers provide `GET`, `POST`, `PATCH`, and `DELETE` endpoints. RTK Query cache tags keep task lists and detail views synchronized after mutations.

## Assumptions

- Authentication is deliberately mocked and accepts any valid email with a six-character password.
- Task filtering and due-date sorting happen client-side because the included dataset is small.
- Dates are stored as ISO date strings and displayed consistently in UTC.
- The browser supports the modern baseline targeted by Next.js 16.

## Known Limitations

- Mock task data is stored in server memory and resets when the development server restarts.
- Authentication tokens are mock values and must not be used as a production security model.
- The notification, profile, and help controls are visual placeholders.
- Automated unit and end-to-end tests are not included in the one-day scope.
