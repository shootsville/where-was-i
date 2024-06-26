# Where Was I? - SPA Example

An example of a simple SPA using Vite, React, TypeScript with Where Was I?
installed.

Important when using Where Was I? in a single page application, you need to
supply the `ìsSpa` flag to the `WhereWasI` component, along with a navigation
callback for custom routing functions. If a basePath is supplied, the
`WhereWasI` component will use that as the base path for the `href` attributes
of the links.
