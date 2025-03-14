<sub><i>© 2013 - 2025 Eric Augustinowicz. All Rights Reserved.</i></sup>
# [Static Client-Rendered Web Apps with a URL to Every State](https://github.com/EJAugust/EJAugust)
This project is a JavaScript library that builds [static](https://en.wikipedia.org/wiki/Static_web_page) [single-page](https://en.wikipedia.org/wiki/Single-page_application) [client-rendered](https://www.patterns.dev/react/client-side-rendering/) [progressive web applications](https://en.wikipedia.org/wiki/Progressive_web_app) with robust hash-based state management:
```
╭───────────────────────────────────────────────╮
│ https:// www.example.com # 0-2c9_ghc3whi45... |
╰───────────────────────────┬-------------------┤
                            │ URI fragment/hash │
                            ╰───────────────────╯
```
Using a straightforward approach, all user-configurable state information is compressed in real-time with optimal space-efficiency.

This framework can build small-scale, feature-rich applications (such as a short-form document editor or an icon painting utility) that let users create something offline and share a public link to it without uploading anything.

This project is currently in alpha. See below for the [roadmap](#roadmap) and [live demos](#live-demos).
## Method
As an array of characters, a URL hash can be considered a [numeral](https://en.wikipedia.org/wiki/Positional_notation) representing integer $`n < k_{\text{max}}`$ in some base $`b`$. This framework uses an alphabet of $`b = 64`$ characters and allows all hashes up to 2000 characters long. This provides a hash cardinality of $`k_{\text{max}} = (64^{2001}-64)/63 ≈ 2.3 * 10^{3612} ≈ 2^{12000}`$, or about 1500 bytes of storage space.

In the same way that a hash is an array of characters, object types in this framework are an array of simpler types. Just like a hash, an object $`O`$ of type $`T_O`$ exists in one of $`k_{T_O}`$ states and represents a positive integer $`n < k_{T_O}`$. When $`O`$'s properties change, so does $`n`$.

We compute the [perfect hash function](https://en.wikipedia.org/wiki/Perfect_hash_function) $`\text{hash} \xleftrightarrow{} \text{object state}`$ using the same techniques we would use to compute a [base conversion](https://en.wikipedia.org/wiki/Positional_notation#Base_conversion).

Every type is identified by a unique domain name which, combined with a hash, provides a URL for every instance of every data type.

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &(\;\text{host}_{\text{T}}, \text{hash}_n\;) \\ \textcolor{grey}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\textcolor{#AAAA44}{[\textcolor{#AA8866}{\text{"two-digit.example.com"}}\textcolor{grey}{,} \textcolor{#AA8866}{\text{"1u"}}]}\\\;\\\;\\\;\\\;\\&\text{host}_{\text{T}} &\xleftrightarrow{} &\text{T} = \{\;{O_T}_0,\;{O_T}_1,\;{O_T}_2,\;\ldots,\;{O_T}_{k-1}\;\} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"two-digit.example.com"}} & &\textcolor{grey}{\textcolor{#4466AA}{\texttt{const}}\;\textcolor{#88AAEE}{\texttt{part}}\texttt{ = }\textcolor{#4466AA}{\texttt{new class}}\;\textcolor{#33AA88}{\texttt{TwoDigit}}\;\textcolor{#4466AA}{\texttt{extends}}\;\textcolor{#33AA88}{\texttt{Conjunction}}\;\textcolor{#AAAA44}{\texttt{\{}}} \\ & & &\texttt{\textcolor{#BFBFBF}{\quad state} \textcolor{grey}{=} \textcolor{#88AAEE}{-1}\textcolor{#4466AA}{n}} \\ & & &\texttt{\textcolor{#448833}{\quad// compiled from dns-root/com/example/two-digit }} \\ & & &\texttt{\textcolor{#AAAA44}{\}()}}\\\;\\\;\\\;\\\;\\&\text{hash}_n &\xleftrightarrow{} &n \\ \textcolor{gray}{\text{e.g., }}&\texttt{\textcolor{#AA8866}{"1u"}} & &\texttt{\textcolor{#88AAEE}{94}\textcolor{#4466AA}{n}} \end{alignat}`$

The objects managed by this process are called "parts" and are controllers in a model-view-controller runtime framework which can assign the runtime state to itself and its subparts:

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &{O_{\text{T}}}_n \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}}\\\;\\\;\\\;\\\;\\&{O_{\text{T}}}_n &\xleftrightarrow{} &\{\;{{O_{\text{T}}}_n}_0, {{O_{\text{T}}}_n}_1, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{grey}{\textcolor{#88AAEE}{\texttt{part}}.\textcolor{#BFBFBF}{\text{state}}\texttt{ === }\textcolor{#88AAEE}{\texttt{94}}\textcolor{#4466AA}{\texttt{n}}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{tensPlace}.state \textcolor{grey}{===} \textcolor{#88AAEE}{9}\textcolor{#4466AA}{n},}} \\ & & &\quad \text{\textcolor{#BFBFBF}{\textcolor{#88AAEE}{onesPlace}.state \textcolor{grey}{===} \textcolor{#88AAEE}{4}\textcolor{#4466AA}{n}}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$

URLs can now act as file literals which readily break down into smaller components:

$`\begin{alignat}{3} &{\text{url}_T}_n &\xleftrightarrow{} &\{\;{\text{url}_{T}}_{n_0}, {\text{url}_{T}}_{n_1}, \ldots \} \\ \textcolor{gray}{\text{e.g., }}&\textcolor{#AA8866}{\text{"https://two-digit.example.com\#1u"}} & &\text{\textcolor{#AAAA44}{[}} \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com\#9"}}, \\ & & &\quad \textcolor{#AA8866}{\text{"https://one-digit.example.com\#4"}} \\ & & &\texttt{\textcolor{#AAAA44}{]}} \end{alignat}`$


All types exist in a hierarchy with each one ultimately extending from a common base type ($`\textcolor{#AA8866}{\texttt{"core.parts"}}`$) which extends native [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array). A type's cardinality and state are [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) primitives. The base type has a cardinality of $`\texttt{\textcolor{#88AAEE}{1}\textcolor{#4466AA}{n}}`$ and its one state is $`\texttt{\textcolor{#88AAEE}{0}\textcolor{#4466AA}{n}}`$.

All client application types start with $`\textcolor{#AA8866}{\text{"www."}}`$ and extend $`\textcolor{#AA8866}{\text{"app.core.parts"}}`$. These types have associated DNS records pointing to a server hosting the output directory `./public`.

The framework packs all type definitions into `./public/framework.js` which on first visit registers itself as a service worker to serve `manifest.json` and become an offline installable PWA. On window load, it serves itself as the client runtime framework and recovers its initial state from the window location. On native event (where attached), it updates the client state and window location together.

The root part ($`\textcolor{#AA8866}{\texttt{"root.core.parts"}}`$) is instantiated explicitly by `framework.js` at start up. All other parts are instantiated by their parent part when the application launches. This creates a global uniform data structure representing the state of the entire runtime. It's subparts represent the state of various aspects of the runtime.

Using the hash instead of query parameters or a pathname enables the user to engage with the app without sending activity to a server which is useful both for user privacy and for reducing the burden on cloud services. Furthermore, the [URI fragment](https://datatracker.ietf.org/doc/html/rfc3986#section-3.5) is the most appropriate segment for this kind of information.

Hashes should not be hard-coded anywhere in an application's source. Instead, a staging layer allows parts to stage an arbitrary number of operations on the current state in order to obtain a URL to another state without affecting the current data model and URL. This enables anchor links like `<a href=#1u>` to be generated at runtime.

Using domain names for all types enables configuration of type information via DNS.

Semantic versioning can be used to associate a hash with the version of the type hierarchy that it was generated in. This project does implement a per-commit automatic semantic versioning method which relies on indicating two booleans about the API at commit time:
1. Whether any new apps were published or new end points were added to the existing published apps since the last commit
   - For example, new apps and non-breaking increases to the cardinality of existing web apps
2. Whether any breaking changes were made to any published apps since the last commit
   - For example, any moved or removed resources that were once published to public URLs


The project is still in alpha and there will be no LTS until version 1.0.0 or later.

## Live Demos
These projects aren't just live demos, they are standalone projects. Some of them I have been trying to build since before I created this framework, and they inspired the creation of this framework.

* [www.kireji.io](https://www.kireji.io) A short-form document editor.
* [www.core.parts](https://www.core.parts) Interactive documentation for the project.
* [www.ejaugust.com](https://www.ejaugust.com) My portfolio and blog.
* [www.glowstick.click](https://www.glowstick.click) An app presenting animated web content with the ability to edit and share video clips.
* [www.orenjinari.com](https://www.orenjinari.com) An artist portfolio which includes images, animations, interaction and video streaming.

## Roadmap
![version](https://img.shields.io/badge/version-0.100.34-silver) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)

Version `1.0.0` is under development.
|Phase|Status
|-|-
|**Framework**|Completed
|**CI/CD pipeline**|Completed
|**Debug tools, docs**|In progress
|**Live demos**|In progress
|**LTS plan**|In progress
|**Advanced DNS integration**|Planned
|**Community-curated content**|Planned
|**Periodicity and transfinite types**|Planned

## License and Extensions
<sub>I am still selecting a license for this project. As a result, you do not have permission to use, modify, redistribute, etc. this project or any of its methods or parts except for using the live demos and looking through the repo.</sub>


<sub>There is more than one unique feature in this project. It introduces or otherwise brings together for the first time multiple features, including</sub>
<br><sub>- its integration with DNS</sub>
<br><sub>- its efficient coding methods</sub>
<br><sub>- its base-conversion algorithm</sub>
<br><sub>- its formal 'part' concept</sub>
<br><sub>- its single global type schema</sub>
<br><sub>- its unique social sharing paradigm</sub>
<br><sub>- its cloud build capabilities</sub>
<br><sub>- its offline interaction capabilities</sub>
<br><sub>- its permalink-assigning capabilities</sub>
<br><sub>- its formal automatic <a href="https://en.wikipedia.org/wiki/Software_versioning#Semantic_versioning">semantic versioning</a> concept</sub>
<br><sub>- its <a href="https://en.wikipedia.org/wiki/Quine_(computing)">quine-like</a> ability to output itself, a modified version of itself, and/or a subset of itself including individual components and assets.</sub>
<br><sub>- its live example applications which are each separate, meaningful tools and experiences of their own</sub>


<sub>In addition, this document has a project roadmap and list of extensions discussing plans for additional unique features not yet implemented. This document and repository serve to establish prior art for these inventions, the obvious extensions that they inspire, my upcoming plans for them, and my intent to continue to research and develop these lines of inquiry. Among the considered features are the following:</sub>
<br><sub>- Storing a type schema or some or all information about one (including but not limited to a global type schema like that used in this project) on the DNS.</sub>
<br><sub>- Storing a framework or some or all information about one (including but not limited to a framework like that used in this project) on the DNS, such as:</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- cloud building capabilities and data</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- source mapping capabilities and data</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- quine-like self-outputting capabilities</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- Storing any of the aforementioned information in a database.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- for example, to allow users to curate it.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- for example, to offer domain name services alongside it.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- Resolving some or all information from the DNS at build time.</sub>
<br><sub>- Resolving some or all information from the DNS at run time.</sub>
<br><sub>- Using these methods in combination with normal DNS registry or registrar services.</sub>
<br><sub>- Using these methods to compress:</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- files or configuration information for DNS</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- files or configuration information for HTTP/S</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- It's own source files or other plain text files</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- Binary files like multimedia</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- Entire applications and schemas (such as the applications and global schema of this project)</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- Using these methods within a stand-alone application, such as:</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a stand-alone application that doesn't require a browser</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a stand-alone application that is a browser</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a stand-alone application that looks or feels like a browser</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a stand-alone application that renders information stored on the DNS</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a stand-alone application that only requires a small bootstrap and the DNS to begin browsing.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- A system in which each domain owner curates type definitions associated with the domain(s) they own.</sub>
<br><sub>- A video library or video streaming platform that, like </sub>$`\textcolor{#AA8866}{\text{"www.glowstick.click"}}`$<sub>, assigns a URL to and optionally allows the direct editing of every</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- segment ("subset" or "clip") of every video</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- scene of every title</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- act of every movie</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- episode of every show</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- frame of every segment</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- details page of every episode, show, title, etc.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- way of sorting and viewing the library items</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- A document editor and/or library that, like </sub>$`\textcolor{#AA8866}{\text{"www.kireji.io"}}`$<sub>, assigns a URL to and optionally allows the direct editing of every</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- word</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- haiku</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- multi-word expression (MWE)</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- linguistic pattern such as</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- every word x depicted in every color y</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- every poem x depicted in every font y</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- every phrasal template x populated with the given expressions Y</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- every phrasal template x along with the opportunity for a user to populate it with words, haikus, MWEs, or phrasal templates such as those</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- selected from a pre-defined list or dictionary</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- user-submitted as an appendix to a pre-defined list or dictionary</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- user-submitted as a "staged change" to a pre-defined list or dictionary</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- user-submitted as plain text for the purpose of populating a phrasal template</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- etc</sub>
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- A development environment app that, like </sub>$`\textcolor{#AA8866}{\text{"www.core.parts"}}`$<sub>, can 'look at itself' by assigning a URL to and optionally allowing the direct editing of every state of every data type and component defined by a repo, database, or the DNS including a URL to every piece of meta-information about or simulation of every state of another app (or itself, such as would require a special encoding scheme to avoid infinite recursion).</sub>
<br><sub>- Any of the many other obvious applications inspired by the principles that enable this project to work, such as</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a way to browse or link to every SHA-256 hash</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a way to browse or link to every SVG with a given path structure</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a way to browse or link to every outfit possible with a given collection of clothing items</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a way to browse or link to every possible arrangement of a given collection of interior decorations and furniture</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- a way to enumerate (such as to find, index, compare and contrast) a collection of approaches to solving the same computational problem</sub>
<br>&nbsp;&nbsp;&nbsp;<sub>- etc.</sub>
<br><sub>- A blog or editorial website that, like </sub>$`\textcolor{#AA8866}{\text{"www.ejaugust.com"}}`$<sub>, presents text content and includes a method of embedding one or more interactive content elements so that the URL of the content in which the elements are embedded is 'aware' or 'reactive' to the state of the embedded element(s) themselves.</sub>
<br><sub>- A static website that, like </sub>$`\textcolor{#AA8866}{\text{"www.orenjinari.com"}}`$<sub>, presents a third party's own design at their own domain by incorporating it into the global type schema. This gives it access to all other types in the schema and makes all of its content openly available to all other types in the schema, as long as the type graph remains acyclic.</sub>
<br><sub>- The above use cases used in tandem with a search-result style list (such as a paginated list of links) that allows enumerating and scrolling through, browsing or searching for every value of a given type especially when generated automatically by a schema.</sub>
<br><sub>- The above use cases used in tandem with the express purpose of creating a self-hosted self-editing application whether it needs to be rebuilt to reflect changes or updates itself in real-time in response to source code or art asset modifications.</sub>
<br><sub>- The above use cases used in tandem with a git-like staging and committing system.</sub>
<br><sub>- The above use cases used in tandem with intentional constraints like [no writing with the letter e](https://en.wikipedia.org/wiki/Gadsby_(novel)) or painting with restrictions on color palettes especially when these limitations offer an appealing means of reframing a limit on the cardinality of a data type as a desirable feature.</sub>
<br><sub>- The above use cases used in tandem with periodic types with non-finite cardinality (rather than or in addition to types with finite cardinality).</sub>
<br><sub>- etc.</sub>
