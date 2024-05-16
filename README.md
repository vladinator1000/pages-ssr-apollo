# pages-ssr-apollo

Get started

1. `pnpm install`
1. `pnpm dev`
1. Open http://localhost:5173/ to see lazy loading SSR bug
1. Open http://localhost:5173/data to see GraphQL data being server-rendered

There are a couple of issues I'm trying to fix:

When you go to http://localhost:5173/, the client throws out the SSR bundle.

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

The source for this is in src/components/App.tsx.

If I remove the `<Suspense>` component, which I suspect is causing it, I get another error:

```
A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.
```

The errors above seem to be fixable with https://loadable-components.com/
