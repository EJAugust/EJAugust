<sup><i>I use my [profile repository to host my flagship project](https://github.com/EJAugust/EJAugust) so that I can feature this document on my profile without duplicating it. [More details.](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)</i></sub>

# A Static Client-Rendered DNS-based Operating System That Uses a Perfect Hash Tree to Provide Optimal Data Compression and a Permalink to Every Possible State

<sup><i>Note: This is a living document. The project and this document have been in progress for many years and are constantly evolving. You may see typos or mistakes.</i></sub>

This project combines a [piecewise-defined](https://en.wikipedia.org/wiki/Piecewise_function) [*minimal* perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function), the [Domain Name System](https://en.wikipedia.org/wiki/Domain_Name_System), a novel [operating system](https://en.wikipedia.org/wiki/Operating_system), and a [reactive](https://en.wikipedia.org/wiki/Reactive_programming) [component-based](https://en.wikipedia.org/wiki/Component-based_software_engineering) [full-stack](https://en.wikipedia.org/wiki/Frontend_and_backend) [framework](https://en.wikipedia.org/wiki/Web_framework).

To end users, it is a [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [progressive web application](https://en.wikipedia.org/wiki/Progressive_web_app) with [server-](https://en.wikipedia.org/wiki/Server-side_scripting#Server-side_rendering) and [client-side file rendering](https://www.patterns.dev/react/client-side-rendering/) with powerful compression capabilities, search engine optimization and truly comprehensive routing (every possible operating system state has a [permalink](https://en.wikipedia.org/wiki/Permalink)/[deep link](https://en.wikipedia.org/wiki/Deep_linking) directly to it).

The project does not import any libraries. See below for [the motivation behind that decision](#vanilla-language-features).

The project is currently in alpha. See below for [live demos](#live-demo-domains).

## Stateful Data Compression

The use of a perfect hash function allows the app to encode its runtime state as a [URI](https://datatracker.ietf.org/doc/html/rfc3986):

```
╭──────────────────────────/──────────────────────────────╮
│ https:// www.example.com / ghc3w_hi4-5g4w3 / ab52fa-... |
╰──────────────────────────/──────────────────────────────╯
              App Name     /           App State
```

Using a straightforward approach, arbitrary data is compressed into a URI pathname in real-time with enough efficiency to permit creative content generation (such as editing rich text and procedurally generating images). The ability to instantly share a link to that content gives the illusion that the user uploaded their work to a server but no network traffic takes place.

This allows the URI to act as a tiny file storing all of the user's content in a highly optimal way. The client window acts like a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editor for that compressed data.

### Pathname Segment Encoding

Pathname encoding uses an alphabet of $`b = 64`$ characters to encode/decode integers as an array of variable-length pathname segments (each segment up to $`250`$ characters long). Each path segment can represent $`k_{\text{segment}} = (64^{251}-64)/63 ≈ 3.56 * 10^{451} ≈ 2^{1500}`$ unique values (about $`1500`$ bits of storage space). The computation is similar to a numeral [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion) with some added complexity which takes advantage of the storage potential of a variable-length string.

$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &(\;\text{d}_T, \text{v}, n_0, n_1, \ldots, n_m\;) \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &{[{\text{``two-digit.example.com''}}{,} {123}, {\text{``0t''}}]}\\\;\\\;\\\;\\\;\\&\text{d}_{\text{T}} &\leftrightarrow{} &\text{T} = \{\;{P_T}_0,\;{P_T}_1,\;{P_T}_2,\;\ldots,\;{P_T}_{k-1}\;\} \\ {\text{e.g., }}&{\text{``two-digit.example.com''}} & &{{\text{const}}\;{\text{part}}\text{ = }{\text{new class}}\;{\text{TwoDigit}}\;{\text{extends}}\;{\text{Mix}}\;{\text{\{}}} \\ & & &\quad \text{state = -1n} \\ & & &\quad \text{// compiled from dns-root/com/example/two-digit } \\ & & &\text{\}()}\\\;\\\;\\\;\\\;\\&(\;n_0, n_1, \ldots, n_m\;) &\leftrightarrow{} &n \\ {\text{e.g., }}&\text{``0t''} & &\text{94n} \end{alignat}`$

$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &{P_{\text{T}}}_n \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &{{\text{part}}.{\text{state}}\text{ === }{\text{94}}{\text{n}}}\\\;\\\;\\\;\\\;\\&{P_{\text{T}}}_n &\leftrightarrow{} &\{\;{{P_{\text{T}}}_n}_0, {{P_{\text{T}}}_n}_1, \ldots \} \\ {\text{e.g., }}&{{\text{part}}.{\text{state}}\text{ === }{\text{94}}{\text{n}}} & &\text{[} \\ & & &\quad \text{tensPlace.state === 9n,} \\ & & &\quad \text{onesPlace.state === 4n} \\ & & &\text{]} \end{alignat}`$

<!-- URIs act as typed data literals which are readily composed and decomposed into more URIs.
$`\begin{alignat}{3} &{{u_T}_v}_n &\leftrightarrow{} &\{\;{{u_T}_v}_{n_0}, {{u_T}_v}_{n_1}, \ldots \} \\ {\text{e.g., }}&{\text{``https://two-digit.example.com/v123/0t''}} & &\text{[} \\ & & &\quad {\text{``https://one-digit.example.com/v123/8''}}, \\ & & &\quad {\text{``https://one-digit.example.com/v123/3''}} \\ & & &\text{]} \end{alignat}`$ -->

<!-- Using domain names for all parts enables future configuration of part information via DNS. -->

### DNS-based Schema

All domain names correspond to an exact runtime object (called a **part**) which is first created in the build environment by a process which scans the repository and fetches TXT records from the DNS.

These objects are then serialized at build time as object literals which are inlined into the output file, `./api/service.js`. As a result, all of the objects are "already instantiated" the moment the output script is evaluated in the subsequent three environments.

#### Piecewise Bijection

The optimal data compression is achieved using a hash function powered by the tree of objects that these domains creates. For each part, the compression is powered by the following bijection which is computed using the resources gathered from that domain:

$`\text{natural number} \leftrightarrow{} \text{component state}`$

A part $`P`$ exists in one of $`k_P`$ states and represents a positive integer $`n < k_P`$. When $`P`$'s properties change, so does $`n`$. In this way, each part sports its own perfect hash function while connecting together as a vertex in a larger perfect hash tree.

Parts can have their state read from and written to as an integer. They can also be simply manipulated directly. The manipulation of a part or any of its subparts automatically changes its numeric value.

In this way, parts are controllers that update a data model (its integer value) allowing the data model to change in response to user interactions. By adding a couple of rendering methods, reevaluating the hash results in updates to all the other runtime values and - in the client window - DOM elements. In other words, the perfect hash function by itself *already is [MVC-like](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)* so equiping them with rendering callbacks was all that was needed to turn the hash function into a full MVC reactive web framework.

#### Inheritance

A domain's records and source files define its behavior. Its subdomains define its subparts. Every domain can be a prototype for an extension domain so that all of its behaviors, assets and subparts are inherited by the extension without needing to add any records or files to the domain except for the file that specifies its prototype domain. Each of these things can then be overwritten by the extension domain by introducing correctly formatted source files, records and subdomains to the extension part.

This gives domains a familiar [class inheritance](<https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)>) behavior.

The following parts are the most common prototypes:

1. `"part.core.parts"` - The default prototype if none is given. This represents a part with no subparts. It has a cardinality of one. That one state maps to the integer value zero. It is the only part with no prototype object (at runtime, its prototype is `null`).
1. `"mix.core.parts"` - A multiplicative function for handling independently mutable factors. It controls a set of subparts (called mix factors), all of which are enabled whenever the part itself is enabled. This acts like a tuple or an $`n`$-dimensional point selected from a cartesian product space whose dimensions are the mix factors.
1. `"match.core.parts"` - An additive function for handling mutually exclusive options. Only one of its subparts (called match arms) can be enabled at a time, behaving like a single option selected from a set.

The "mix and match" core parts perform the majority of the perfect hash arithmetic so that the rest of the domains can focus on their own responsibilities, like providing unique game logic or multimedia assets.

Each part is responsible for inheriting or overriding its prototype part's cardinality - or the number of states that the part can be in - and this number is immutable for each part.

This forms a type tree whose root is `"part.core.parts"`.

The framework initializes the root part whose name is the empty string, `""`, representing the DNS root. This defines the entire user-configurable state space.

#### State Propagation, Frame Rate and Address Bar Synchronizing

The overall state of the application bijectively maps 1:1 with the URI in user's address bar. That URI represents the current state of the DNS root part.

The state of each part is synchronized with its parent domain (except for the DNS root, which has no parent) and subdomain states (where existing) via careful leafward and rootward propagation any time something changes. Those changes are either driven by user interaction or by the application itself (e.g, a game loop that performs a simulation or plays an animation).

This propagation activity is fast enough to be synchronized in real-time (which for modern browsers is [typically 60hz but not always](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)). This requires changes to the address bar (i.e. [the window's history object](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)) to be throttled to prevent [the browser from introducing an even more aggressive throttle of its own that prevents DoS hanging](https://issues.chromium.org/issues/40080060).

The value in the address bar is the one most likely to be bookmarked or shared but because of this throttle limitation, it could be up to 350ms older than the actual state.

## Operating System

An operating system concept is employed primarily to demonstrate the capabilities of the perfect hash function and secondarily to give users the ability to explore the entire architecture of my project in a familiar and intuitive way.

### Tasks and Windows

The ecosystem of "installed apps" links intimately with the web: each app corresponds to a domain name and is a reusable component which any other app may extend or embed as a subcomponent. These components can be configured via DNS records.

The user can open, reposition, resize, maximize, minimize or close arbitrarily many different application windows - all in a single browser tab. The user gets a start menu for launching tasks and a taskbar for switching between them. A file explorer allows the user to access the file system that makes the entire project operate. It also shows the user's own custom files.

The file system intimately integrates with the DNS: readonly system folders correspond to DNS domains; readonly system files correspond to DNS records and the bootstrap provided by this repo; an arbitrary number of user-generated/user-editable files (which store all user-configurable state information) are encoded in the user's address bar as a single URI, separated into segments by "/".

The resulting pathname is surprisingly short. The user state is designed to stay below 1750 pathname characters but some browsers can handle far longer URIs than that.

### Decentralized/Distributed System

Because the exact state of the operation system can be shared instantly via URI to other users and across devices and its components can be permanently configured by different property owners using the DNS, this project represents a world-wide [decentralized and distributed operating system](https://en.wikipedia.org/wiki/Decentralised_system).

### Potential for Real-time Collaboration

The native [WebRTC API](https://webrtc.org/) may allow users to engage in [collaborative real-time editing](https://en.wikipedia.org/wiki/Collaborative_real-time_editor) - two or more people may operate the system even if they are in different parts of the world. Users would then be able to connect with themselves to synchronize the state of the operating system across multiple devices. I am currently researching this opportunity.

## Full-Stack Reactive Framework

Like [React](https://react.dev/) and similar modern front-end frameworks, this project is carefully designed to ensure that it doesn't unnecessarily rerender or reevaluate DOM elements and their attributes.

This project goes far beyond front-end DOM updates to encompass all runtime objects across all four environments (cloud build, server/serverless function, service worker and client window) including all function calls, buffers and primitives.

This is made possible by the way that each domain provides a branch delineation that is entirely based on whether or not the primitives that the domain uses will mutate or not. The act of navigating from one state to another follows from the branches that must be traveresed in order to get from one leaf to another on that tree.

## Continuous Improvement

The project aims to [continually improve](https://en.wikipedia.org/wiki/Continual_improvement_process) the experience for both users and developer. We use a multifaceted approach:

### Quantitative [UX](https://en.wikipedia.org/wiki/User_experience) Model

By promoting a [quantitative analysis](https://en.wikipedia.org/wiki/Quantitative_analysis_of_behavior) of [usability](https://en.wikipedia.org/wiki/Usability), we combine the quest for the ideal compression ratio with the quest for the ideal user experience.

Any [interaction design](https://en.wikipedia.org/wiki/Interaction_design) must be presented numerically in order to integrate with a perfect hash function. Such models act both as design specifications for this operating system and as discussion tools that relate [information theory](https://en.wikipedia.org/wiki/Information_theory) to [cognitive ergonomics](https://en.wikipedia.org/wiki/Cognitive_ergonomics).

[User research](https://en.wikipedia.org/wiki/User_research) drives the pruning of unwanted subsets of the user configuration space and the expansion of desirable ones, variously spending and reclaiming hash indices with each model revision.

### Mathematically Robust [LTS](https://en.wikipedia.org/wiki/Long-term_support) Strategy

We prevent bookmarks and shared links from [unexpectedly breaking](https://en.wikipedia.org/wiki/Link_rot) as the model improves by setting aside a small portion of the configuration space for specifying the version number of the hash tree while retaining and patching popular revisions of the hash function.

The overall hash function corresponds to the DNS root and defines a single file type schema with a single semantic version number.

#### Semantic Versioning

| major | .   | minor | .   | patch |
| ----- | --- | ----- | --- | ----- |

- Does this commit make breaking changes to existing routes?
  - yes: increment the major version number
  - no: does this commit add new routes?
    - yes: increment the minor version number
    - no: increment the patch version number

The project is still in alpha so the rules are slightly different. Version information is not encoded in the URI _yet_. The first LTS version will be version 1.0.0 or later.

### Curated Semantic Hashing

The chances that a [human-readable](https://en.wikipedia.org/wiki/Human-readable) hash would describe the state it maps to is almost zero.

To solve this (in the context of search engine optimization and [CTA](<https://en.wikipedia.org/wiki/Call_to_action_(marketing)>) links), we trade unreadable hashes with more appropriate counterparts. This pairwise trading can be automated by relating certain object properties with certain pathname components without affecting the coverage of the hash function.

## Minimal Network Activity

The client window performs exactly two network fetches on visit:

1. **`index.html`**: A server-rendered HTML bootstrap which provides an unhydrated (but _complete_ and _exact_) snapshot of the DOM at the requested URI.
1. **`service.js`**: A service worker script which hydrates the snapshot and forevermore intercepts its origin's client network traffic, turning the app into an offline experience.

This represents the absolute minimum possible number of server requests for providing a fully-functioning PWA given today's web standards. All other assets are fetched after the service worker is installed and they are client-rendered. The browser's default service worker updating features and an LTS convention are responsible for a smooth operating system update experience.

### Unnecessary Network Activity

The exacting nature of the installation process process makes it easy to differentiate legitimate user activity from bots and malicious activity.

However, browsers must fetch a service worker _directly from the network_ for safely reasons. A browser will not permit cross-origin sharing of a service worker, eliminating the possibility of providing a single payload that would hydrate _all_ of my projects at the same time, across multiple browsers or across several different devices at once.

- **Cross-origin**: Two different web origins require the browser to fetch two different service workers.
- **Cross-browser**: Two different browsers installed on the same device will not share a service worker even for the same origin.
- **Cross-device** Two different devices will not share a service worker with one another.

I am currently researching the best approach to mitigating this problem while adhering closely to the word and spirit of web safety standards.

## Build Process

This framework creates a static web application by packing source files into a single source-mapped script, `./api/service.js`, and deploying that script as both a client service worker and cloud serverless function.

On first visit to a given URI, the request reaches a serverless function for that domain name which uses the incoming request to pre-render an HTML file with inlined CSS. This is like a still image of the requested application in the requested state. This ensures:

1. That the client will always see something besides a blank page on first visit, while the rest of the application data downloads in the background.
2. Search engine crawlers like Googlebot will see fully rendered pages for any given link.

An inline script registers `service.js` as a service worker while the window continues parsing the HTML. No other assets (including PWA assets like `manifest.json`, icons or screenshots) are fetched until after the client window is controlled by a service worker, ensuring that all of these assets are client-rendered, reducing the burden on the serverless function.

## Large Files

Large multimedia assets can theoretically be served by pairing the system with a traditional [CMS](https://en.wikipedia.org/wiki/Content_management_system), but the current iteration of the project prefers procedurally generated content over storing and serving large files.

## Roadmap

[![version](https://img.shields.io/badge/version-0.115.80-silver)](https://github.com/EJAugust/EJAugust)
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

## Vanilla Language Features

This entire project is written using [vanilla language features](https://en.wikipedia.org/wiki/Vanilla_software#Software_Development_Practices) for all three of the core web languages:
- [JavaScript](https://en.wikipedia.org/wiki/Vanilla_JavaScript) [(a.k.a. ECMAScript or ECMA-262)](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
- [CSS](https://www.w3.org/TR/css-2024/)
- [HTML](https://html.spec.whatwg.org/dev/)

I do not import any libraries for this project for a number of reasons:
1. It helps me maintain fine-grained control over all static (build output) data.
1. I like to align as directly as I can with the spirit and word of international technology standards.
1. This lets me analyze the operating system end-to-end as a single equation which I can progressively simplify even as I equip it with new features. This would not be possible if any of the system's optimizations or behaviors were achieved with a third-party library because it is not really appropriate to go about editing the internal contents of a third-party library.

## License

<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sub><br><br>
<sub><i>The project is still in alpha. It is only possible thanks to many years of my own personal research and development.  Its methods are subject to change as I continue that work. It is not ready for large scale usage but it will be, soon.</i></sub><br><br><sub><i>You do not have permission to **copy, modify or redistribute this project** in any form. Don't steal someone's work. Why steal when you can contact me with your interest instead? Perhaps we can collaborate on a project together.</i></sub><br><br><sub><i>Sorry, you cannot legally patent or claim any part of this project as your own because it has been taking place in public for years. This repository serves as [prior art](https://en.wikipedia.org/wiki/Prior_art) allowing me to continue to develop these ideas in public without fear of a large organization or patent troll claiming these ideas as their own.</i></sub>
