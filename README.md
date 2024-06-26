<h1 align="center">Welcome to Where was I? 👋</h1>
<h3>Enjoy, share, star, come with suggestions! ❤️</h3>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/shootsville/where-was-i#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/hebertcisco/ts-npm-package-boilerplate/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/shootsville/where-was-i/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/shootsville/Where was I?" />
  </a>
</p>

> A plugin for your page to display an interactive history of your users session

## [Demo](https://shootsville.github.io/where-was-i/)

### 🏠 [Homepage](https://github.com/shootsville/where-was-i)

## Install

Where Was I? is available as a module through npm or as a CDN.

Npm install:

```sh
npm install -S where-was-i
```

And then in the root of your project:

```ts
import whereWasI from 'where-was-i'

whereWasI()
```

Or via CDN, add Where Was I? with dependencies manually to the `<head>` element
of your site:

```html
<script
  src="//cdn.jsdelivr.net/npm/url-change-event@0.1.7/dist/url-change-event.min.js"
  defer
></script>
<script
  src="//cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  defer
></script>
<script
  src="//cdn.jsdelivr.net/npm/where-was-i@0.3.4/lib/index.iife.min.js"
  defer
></script>
```

Then initiate it:

```html
<script>
  if (typeof WhereWasI !== 'undefined' && typeof html2canvas !== 'undefined') {
    WhereWasI()
  }
</script>
```

## Options

Where Was I? offers a lot of customizability to tailor the plugin to fit your
needs

### Types

`ShowButtonPostionType` Specifies the position of the show button.

```ts
type ShowButtonPostionType =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
```

`ShowButtonOptions` Options for customizing the show button.

```ts
type ShowButtonOptions = {
  /** The position of the show button */
  position?: ShowButtonPostionType
  /** Custom HTML for the show button */
  html?: string
  /** Custom color for the show button */
  color?: string
}
```

`FooterOptions` Options for customizing the footer.

```ts
type FooterOptions = {
  /** Hide the footer */
  hide?: boolean
  /** Custom HTML for the footer */
  customHtml?: string
}
```

`WhereWasIOptions` Options for configuring "Where Was I?".

```ts
type WhereWasIOptions = {
  /** The title to display in the control panel. @default "Where was i?" */
  panelTitle?: string
  /** The maximum amount of location objects to display */
  maxAmount?: number
  /** The style for the location objects. @default "panel" */
  style?: 'cards' | 'panel' | 'drawer'
  /** How often the screenshot should refresh in milliseconds. @default 15000 */
  screenRefreshRate?: number
  /** Adds filter to which paths should be added as location objects */
  acceptedPaths?:
    | {
        /** Path should contain the following string */
        type: 'contains'
        path: string
      }
    | {
        /** Path should start with the following string */
        type: 'startsWith'
        path: string
      }
  /** Get the content of meta fields to use as metadata along each screenshot */
  metafields?: Array<string | Array<string>>
  /** html2canvas options, see https://html2canvas.hertzen.com/configuration for all options */
  canvasOptions?: CanvasOptions
  /** Set log level */
  logging?: 'debug' | 'default'
  /** Z-index of the container. @default 1000 */
  zIndex?: string
  /** Storage type. @default "session" */
  storage?: 'session' | 'local'
  /** Auto close the drawer/panel when leaving. @default true */
  autoClosing?: boolean
  /** Styling options for the show button */
  showButtonOptions?: ShowButtonOptions
  /** Styling options for the footer */
  footerOptions?: FooterOptions
  /** Flag that the application is a SPA */
  isSpa?: boolean
  /** Callback function for navigating to previous location. Useful for SPAs with custom routing */
  navigationCallback?: (path: string) => void
  /** SPA basepath */
  basePath?: string
}
```

### Example usage

```ts
const whereWasIOptions: WhereWasIOptions = {
  panelTitle: 'Recent Locations',
  maxAmount: 10,
  style: 'cards',
  screenRefreshRate: 20000,
  acceptedPaths: {
    type: 'contains',
    path: '/dashboard',
  },
  metafields: ['author', ['date', 'time']],
  canvasOptions: {
    logging: true,
    useCORS: true,
  },
  logging: 'debug',
  zIndex: '1500',
  storage: 'local',
  autoClosing: false,
  showButtonOptions: {
    position: 'bottom-right',
    html: '<img src="/my-icon.svg">',
    color: '#FF0000',
  },
  footerOptions: {
    hide: false,
    customHtml: '<footer>Custom footer</footer>',
  },
  isSpa: true,
  navigationCallback: (path: string) => {
    navigate(path)
  },
  basePath: '/app',
}

whereWasI(whereWasIOptions)
```

## Author

👤 **Gustaf Eriksson Segerdorf**

- Github: [@shootsville](https://github.com/shootsville)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check
[issues page](https://github.com/shootsville/where-was-i/issues). You can also
take a look at the
[contributing guide](https://github.com/shootsville/where-was-i/blob/master/contributing).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024
[Gustaf Eriksson Segerdorf](https://github.com/shootsville).<br /> This project
is [MIT](https://github.com/shootsville/where-was-i/LICENSE) licensed.

---

_This README was generated with ❤️ by
[readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
