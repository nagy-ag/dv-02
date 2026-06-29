# The Scale Button

An interactive data essay about heavy tails, hidden structure, and why averages fail in a world of extremes. The same public datasets can be explored on linear, logarithmic, log-log, and tail views to show how a change of scale reveals structure that an ordinary chart hides.

The interface is available in English, Hungarian, and Romanian, with light and dark themes.

## Stack

- [Next.js 16](https://nextjs.org/) and React 19
- [Convex](https://www.convex.dev/) for the dataset API and live data
- [Vercel Analytics](https://vercel.com/docs/analytics) for privacy-friendly traffic insights
- Tailwind CSS 4 and custom CSS for the visual system
- Lucide React for interface icons

## Local development

Requirements: Node.js 20 or newer and a Convex account.

```bash
npm install
npx convex dev
```

The Convex setup creates `.env.local` with `NEXT_PUBLIC_CONVEX_URL`. Keep the Convex process running, then start the app in another terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The application expects the Convex `datasets` and `dataPoints` tables to be populated. `scripts/prepare-convex-import.mjs` converts the project's processed dataset JSON into import-ready files:

```bash
node scripts/prepare-convex-import.mjs <processed-data-directory> <output-directory>
npx convex import --table datasets <output-directory>/datasets.json
npx convex import --table dataPoints <output-directory>/dataPoints.json
```

## Commands

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Serve the production build
npm run lint   # Run ESLint
```

## Project structure

```text
src/app/          Next.js App Router entry points and global styles
src/components/   Interactive essay, charts, navigation, and theme controls
src/lib/          Translations and narrative/data configuration
convex/           Schema, queries, and generated Convex bindings
scripts/          Dataset import preparation
docs/             Presentation notes
```

## Deployment

Deploy the app to Vercel and set `NEXT_PUBLIC_CONVEX_URL` to the production Convex deployment URL. Vercel Analytics is already mounted in the root layout and starts collecting data after the deployment has Analytics enabled in Vercel.

## Data and methodology

The essay uses public datasets from multiple sources. Each visualization links to its original source and retrieval details in the in-app **Data & citations** section.

## License

Released under the [MIT License](LICENSE).
