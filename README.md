# FlowBoard
A full-stack task and project management dashboard built with Angular, Angular Material, and ASP.NET Core — featuring reactive forms, RxJS state management, and enterprise-grade UI components.
# FlowBoard

FlowBoard is a lightweight Angular dashboard app for task management, calendar events, and analytics.

## Project overview

This app includes:

- `Dashboard` � KPI cards with task and event summaries.
- `Task Board` � task creation, drag-and-drop status updates, and LocalStorage persistence.
- `Calendar` � event scheduling with Material Datepicker and event list storage.
- `Analytics` � task completion chart and KPI summary.

## Project structure

- `src/app/app.ts` � root component with navigation and router outlet
- `src/app/app.routes.ts` � standalone route definitions
- `src/app/dashboard/` � dashboard page
- `src/app/task-board/` � task board page
- `src/app/calender/` � calendar page
- `src/app/analytics/` � analytics page
- `angular.json` � build configuration
- `package.json` � dependencies and scripts
- `netlify.toml` � Netlify deployment config
- `.nvmrc` � recommended Node.js version

## Prerequisites

- Node.js 18.x
- npm

If you use `nvm`, run:

```bash
nvm use 18
```

## Install dependencies

```bash
npm install
```

## Development

Serve locally with live reload:

```bash
npm start
```

Then open:

```text
http://localhost:4200
```

## Build

Use the project build script:

```bash
npm run build
```

Production output is generated to:

```text
dist/flowboard
```

## Netlify deployment

The project includes a `netlify.toml` file with:

- `command = "npm run build"`
- `publish = "dist/flowboard"`
- Node version 18 via `.nvmrc`

## Useful commands

- Install: `npm install`
- Serve: `npm start`
- Build: `npm run build`
- Test: `npm test`

## Notes for developers

- This app uses standalone components, so component `imports` are declared directly in each component.
- Task and event data are stored in browser `localStorage`.
- Add Angular Material imports in the relevant component `imports` array when creating or updating components.
- `angular.json` is configured for Netlify-friendly output.

## Troubleshooting

1. Verify Node version:

```bash
node -v
```

2. Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

3. Build locally:

```bash
npm run build
```

## Resources

- Angular: https://angular.io/
- Angular Material: https://material.angular.io/
- Chart.js: https://www.chartjs.org/
- Netlify: https://www.netlify.com/

