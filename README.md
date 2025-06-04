# [About My Project](https://github.com/EJAugust/EJAugust)

## A Static Client-Rendered DNS-based Operating System That Uses a Perfect Hash Function to Provide Optimal Data Compression and a Permalink to Every Possible State

This project combines a [perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function), the [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System), an [operating system](https://en.wikipedia.org/wiki/Operating_system), and an end-to-end [reactive](https://en.wikipedia.org/wiki/Reactive_programming) [component-based](https://en.wikipedia.org/wiki/Component-based_software_engineering) [front-end](https://en.wikipedia.org/wiki/Frontend_and_backend) [framework](https://en.wikipedia.org/wiki/Web_framework). It builds a [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [progressive web application](https://en.wikipedia.org/wiki/Progressive_web_app) with [server-side](https://en.wikipedia.org/wiki/Server-side_scripting#Server-side_rendering) and [client-side file rendering](https://www.patterns.dev/react/client-side-rendering/). The use of a perfect hash function allows the app to encode its runtime state as a [URI](https://datatracker.ietf.org/doc/html/rfc3986) with optimal space efficiency:

```
╭─────────────────────────────────────────────╮
│ https:// www.example.com / ghc3whi45g4w3 /  |
╰─────────────────────────────────────────────╯
  https://     App Name    /   App State   /
```

The library is written in [vanilla JavaScript (ECMA-262)](https://ecma-international.org/publications-and-standards/standards/ecma-262/) and doesn't rely on any other libraries.

The project is currently in alpha. See below for [live demos](#live-demo-domains).

## Data Compression

Using a straightforward approach, arbitrary data is compressed into a URI pathname in real-time with great efficiency - enough to permit creative content creation (such as editing rich text and procedurally generated images). The ability to instantly share a link to that content gives the illusion that the user uploaded their work to a server but no network traffic takes place.

This allows the URI to act as a tiny file storing all of the user's content in a highly optimal way. The client window acts like a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor for that compressed data.

## Operating System

An operating system concept is employed primarily to demonstrate the capabilities of my algorithm and secondarily to give users the ability to explore the entire architecture of my project in a familiar and intuitive way.

### DNS Apps and their Windows

The ecosystem of "installed apps" links intimately with the web: each app corresponds to a domain name and is a reusable component which any other app may extend or embed as a subcomponent. This components can be configured via DNS records.

The user can open, reposition, resize, maximize, minimize or close arbitrarily many different application windows - all in a single browser window. The user gets a start menu for launching tasks and a taskbar for switching between them.

A file explorer allows the user to access the file system that makes the entire project operate. It also shows the user's own custom files and folders.

This integrates with the DNS: readonly system folders correspond to DNS domains; readonly system files correspond to DNS records; all user-generated/user-editable files and folders are encoded in the user's address bar using perfect hashing.

All user-configurable state information is encoded in a surprisingly short pathname (with a soft limit of 1750 characters, but this can be extended greatly on certain browsers). Using a combination of [LTS](https://en.wikipedia.org/wiki/Long-term_support), iterative improvement of the compression model, and a pathname-swapping (whereby SEO-optimized, human-readable pathnames 'trade places' with the unreadable URIs that actually store their state data) the project will continue to add features to the operating system while encouraging short, likeable URIs and desirable search engine indexing.

## Full Stack Reactive Framework

Like React, the front-end framework is carefully designed to ensure that it doesn't unnecessarily rerender or reevaluate DOM elements and their attributes.

However, the reactive algorithm goes far beyond DOM updates to encompass all runtime objects across all four environments (cloud build, serverless function, service worker and client window) so that all functions, buffers and runtime values are protected from doing unnecessary work.

## Minimal Network Activity

The client window performs exactly two network fetches on visit:

1. **`index.html`**: A server-rendered HTML bootstrap which provides an unhydrated snapshot of the operating system at the given pathname
1. **`service.js`**: The service worker provides hydration assets for the snapshot and turns the app into an entirely offline experience.

This represents the absolute minimum possible number of server requests for providing a fully-functioning PWA given today's web standards. All other assets are fetched after the service worker is installed and they are client-rendered. The browser's default service worker updating features and an LTS convention are responsible for a smooth operating system update experience.

### Unnecessary Network Activity

The exacting nature of the installation process process makes it easy to differentiate legitimate user activity from bots and malicious activity.

However, browsers must fetch a service worker _directly from the network_ for safely reasons. A browser will not permit cross-origin sharing of a service worker, eliminating the possibility of providing a single payload that would hydrate _all_ of my projects at the same time, across multiple browsers or across several different devices at once.

- **Cross-origin**: Two different web origins require the browser to fetch two different service workers.
- **Cross-browser**: Two different browsers installed on the same device will not share a service worker even for the same origin.
- **Cross-device** Two different devices will not share a service worker with one another.

I am currently researching the best approach to mitigating this problem while adhering closely to the word and spirit of web safety standards.

## Roadmap

[![version](https://img.shields.io/badge/version-0.115.78-silver)](https://github.com/EJAugust/EJAugust)
[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha)
[![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)\
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A7WQ6V4)

Version `1.0.0` is under development.
|Phase|Status
|-|-
|**Framework and core functionality**|Completed
|**CI/CD pipeline**|Completed
|**Debug tools, docs**|In progress
|**Example applications**|In progress
|**LTS plan**|In progress
|**Advanced DNS integration**|Planned
|**Community-curated content**|Planned

## Live Demo Domains

Each of these domains corresponds to a live demo of the operating system, where the theme of the operating system is set according to the domain that is used to access it.

When an application is set as the operating system's theme, an instance of the application in question is presented as an interactive desktop wallpaper, allowing the operating system to provide a familiar web browsing experience.

- [`"www.core.parts"`](https://www.core.parts) Interactive documentation for the project.
- [`"www.desktop.parts"`](https://www.desktop.parts) A familiar operating system experience.
- [`"www.ejaugust.com"`](https://www.ejaugust.com) My portfolio and blog.
- [`"www.orenjinari.com"`](https://www.orenjinari.com) Another artist's portfolio. Currently the only example of a third-party application installed in the operating system.

### Coming Soon

- [`"www.user.parts"`](https://www.user.parts) A website where the user can create a custom wallpaper, avatar and theme for the operating system.
- [`"www.kireji.io"`](https://www.kireji.io) A short-form document editor.
- [`"www.kireji.app"`](https://www.kireji.io) A presentation app for displaying documents authored using `"www.kireji.io"`.
- [`"www.glowstick.click"`](https://www.glowstick.click) A video streaming platform with the ability to edit and share custom video clips.

## License

<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup><br>
The project is still in alpha. It is not ready for large scale usage. Please do not copy, modify or redistribute this project but feel free to contact me. The project acts as prior art allowing me to continue to develop these ideas. These methods are subject to change as I continue research and development.

## Build Process

This framework creates a static web application by packing source files into a single source-mapped script, `./api/service.js`, and deploying that script as both a client service worker and cloud serverless function.

On first visit to a given URI, the request reaches a serverless function for that domain name which uses the incoming request to pre-render an HTML file with inlined CSS. This is like a still image of the requested application in the requested state. This ensures:

1. That the client will always see something besides a blank page on first visit, while the rest of the application data downloads in the background.
2. Search engine crawlers like Googlebot will see fully rendered pages for any given link.

An inline script registers `service.js` as a service worker while the window continues parsing the HTML. No other assets (including PWA assets like `manifest.json`, icons or screenshots) are fetched until after the client window is controlled by a service worker, ensuring that all of these assets are client-rendered, reducing the burden on the serverless function.

## Domain and State Encoding

A bijection $`\text{pathname} \leftrightarrow{} \text{object state}`$ is computed. The method uses an alphabet of $`b = 64`$ characters to encode/decode integers as an array of variable-length pathname segments (each segment up to $`{250}`$ characters long). Each path segment can represent $`k_{\text{segment}} = (64^{251}-64)/63 ≈ 3.56 * 10^{451} ≈ 2^{1500}`$ unique values (about $`1500`$ bits of storage space). The computation is similar to a numeral [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion) with some added complexity which takes advantage of the storage potential of a variable-length string.

Domain names identify UI component objects (**parts**) which are instantiated by the framework at runtime. A part $`P`$ exists in one of $`k_P`$ states and represents a positive integer $`n < k_P`$. When $`P`$'s properties change, so does $`n`$. In this way, each domain represents its own perfect hash function.

$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &(\;\text{d}_T, \text{v}, n_0, n_1, \ldots, n_m\;) \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &{[{\text{``two-digit.example.com''}}{,} {123}, {\text{``0t''}}]}\\\;\\\;\\\;\\\;\\&\text{d}_{\text{T}} &\leftrightarrow{} &\text{T} = \{\;{P_T}_0,\;{P_T}_1,\;{P_T}_2,\;\ldots,\;{P_T}_{k-1}\;\} \\ {\text{e.g., }}&{\text{``two-digit.example.com''}} & &{{\text{const}}\;{\text{part}}\text{ = }{\text{new class}}\;{\text{TwoDigit}}\;{\text{extends}}\;{\text{Mix}}\;{\text{\{}}} \\ & & &\quad \text{state = -1n} \\ & & &\quad \text{// compiled from dns-root/com/example/two-digit } \\ & & &\text{\}()}\\\;\\\;\\\;\\\;\\&(\;n_0, n_1, \ldots, n_m\;) &\leftrightarrow{} &n \\ {\text{e.g., }}&\text{``0t''} & &\text{94n} \end{alignat}`$

Parts act like controllers in a model-view-controller paradigm. They can have their state read and written either as an integer or via direct manipulation of the part or its subparts.

$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &{P_{\text{T}}}_n \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &{{\text{part}}.{\text{state}}\text{ === }{\text{94}}{\text{n}}}\\\;\\\;\\\;\\\;\\&{P_{\text{T}}}_n &\leftrightarrow{} &\{\;{{P_{\text{T}}}_n}_0, {{P_{\text{T}}}_n}_1, \ldots \} \\ {\text{e.g., }}&{{\text{part}}.{\text{state}}\text{ === }{\text{94}}{\text{n}}} & &\text{[} \\ & & &\quad \text{tensPlace.routeID === 9n,} \\ & & &\quad \text{onesPlace.routeID === 4n} \\ & & &\text{]} \end{alignat}`$

<!-- URIs act as typed data literals which are readily composed and decomposed into more URIs.
$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &\{\;{{u_T}_v}_{n_0}, {{u_T}_v}_{n_1}, \ldots \} \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &\text{[} \\ & & &\quad {\text{``https://one-digit.example.com/v123/8''}}, \\ & & &\quad {\text{``https://one-digit.example.com/v123/3''}} \\ & & &\text{]} \end{alignat}`$ -->

## Type Schema

The part `"part.core.parts"` is the prototype of all other parts. Its own prototype is `null`. All other parts directly or indirectly extend it.

The following parts are the most common prototypes and they perform the majority of the perfect hash arithmetic:

1. `"part.core.parts"` - The default prototype if none is given. This represents a part with no subparts. It has a cardinality of one. That one state maps to the integer value zero.
1. `"mix.core.parts"` - A multiplicative function for handling independently mutable factors. It controls a set of subparts (called mix factors), all of which are enabled whenever the part itself is enabled. This acts like a tuple or an $`n`$-dimensional point selected from a cartesian product space whose dimensions are the mix factors.
1. `"match.core.parts"` - An additive function for handling mutually exclusive options. Only one of its subparts (called match arms) can be enabled at a time, behaving like a single option selected from a set.

Each part is responsible for inheriting or overriding its prototype part's cardinality, which is immutable for each part.

This forms a type tree whose root is `"part.core.parts"`.

The framework initializes the root part whose name is the empty string, `""`, representing the DNS root. This defines the user-configurable state space which is bijectively mapped to the URI pathname.

<!-- Using domain names for all parts enables future configuration of part information via DNS. -->

## Versioning and LTS

The global type schema has a semantic versioning scheme.

| major | .   | minor | .   | patch |
| ----- | --- | ----- | --- | ----- |

- Does this commit make breaking changes to existing routes?
  - yes: increment the major version number
  - no: does this commit add new routes?
    - yes: increment the minor version number
    - no: increment the patch version number

To enable long-term support (LTS), a segment of the URI path can be devoted to the major version number of the global type schema that generated the URI.

The project is still in alpha so the rules are slightly different. Version information is not encoded in the URI. The first LTS version will be version 1.0.0 or later.

## Large Files

Large multimedia assets can theoretically be served by pairing the system with a traditional [CMS](https://en.wikipedia.org/wiki/Content_management_system), but the current iteration of the project prefers procedurally generated content over storing and serving large files.
