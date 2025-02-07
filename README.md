# [`core.parts`](https://github.com/EJAugust/EJAugust) [![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
<i>© 2013 - 2024 Eric Augustinowicz. All Rights Reserved.</i>
## A Method of Building Static Client-Rendered Web Apps That Have a Permanent URL to Every State

This project is the culmination of my research in art, design, engineering, and mathematics. It models application behavior as a tree of Diphantine equations (called **parts**; see [figure 1](#fig-1)) whose variables are their downstream vertices.

A part's type expression bijectively maps all `k` of its valid variable assignment combinations to the natural numbers less than `k`, even if `k` is very large.

By giving every part type a domain name (see [figure 2](#fig-2)) and expressing its value in base `b` (see [figure 3](#fig-3)), we obtain a URI<sup>[[1]](#ref-1)</sup> for every instance of every part type (see [figure 4](#fig-4)).

Parts are implimented as class instances in javascript (see [figure 5](#fig-5)). Each part has presentation information which takes the place of a traditional model-view-controller paradigm with perhaps less overhead than one would expect.

The source material is broken apart into a folder structure representing the domain name hierarchy. Types are defined by selecting a base type (with all types extending `one.core.parts`) and overriding one or more of its properties.

At deploy time, a node script packs all of the type definitions into a single script `sw.js` and single document `index.html`.

The result is a light, MVC-like front-end framework in which applications are made from reusable parts which are readily analyzed by mathematics.
### Figures

<pre id=fig-1>
╭─────────────────╮
│ a = bC + c = 94 │
│ A = B * C       │
│ 0 <= a < A      │
╰─────────────────╯
<sub><i><b>Figure 1a:</b> Example part </i><b>p<sub>a</sub></b><i> has
an integer value of </i><b>94</b><i> and two
subparts, </i><b>p<sub>b</sub></b><i> and </i><b>p<sub>c</sub></b><i> which
determine its range. It models
the behavior of a 2-digit
base-10 numeral.</i></sub></pre>
<pre>
╭──────────────╮
│ b = ... =  9 │
│ B = 10       │
│ 0 <= c < B   │
╰──────────────╯
<sub><i><b>Figure 1b:</b> Part </i><b>p<sub>b</sub></b><i> models the ten's place.</i></sub></pre>
<pre>
╭──────────────╮<br>│ c = ... =  4 │<br>│ C = 10       │<br>│ 0 <= c < C   │<br>╰──────────────╯
<sub><i><b>Figure 1c:</b> Part </i><b>p<sub>c</sub></b><i> models the one's place.</i></sub></pre>
<pre id=fig-2>
╭───────────────────────────────╮
│ a = bC + c               = 94 │
╰────╮--------------------╭─────╯ 
     │ example.core.parts │
     ╰────────────────────╯
<sub><i><b>Figure 2:</b>  All part types have a dedicated
domain name. Part <b>p<sub>a</sub></b> has the type name
</i><b>example.core.parts</b><i>.</i></sub>
</pre>
<pre id=fig-3>
╭─────────────────────────────────────────────╮
│ a = bC + c               = 94  (base = 10)  │
╰────╮--------------------╭─╮-----------------│ 
     │ example.core.parts │ │ 1u (base = 64)  │
     ╰────────────────────╯ ╰─────────────────╯
<sub><i><b>Figure 3:</b> By writing part values in a large base (like <b>64</b>) we
can represent large integers as character strings. Part <b>p<sub>a</sub></b>'s </b><i>
state as a base-64 string is <b>1u</b>.</i></sub>
</pre>
<pre id=fig-4>
╭────────────────────────────────────────╮
│ a = bC + c                      = 94   │
│----------------------------------------│ 
│ a = https:// example.core.parts#1u.    │
╰────────────────────────────────────────╯
<sub><i><b>Figure 4:</i></b> Concatenating type and state obtains the URI.</i></sub>
</pre>
<pre id=fig-5>
╭───────────────────────────────────────╮
│ a     =  bC + c     =  94             │
│---------------------------------------│
│      left-hand-side = right-hand-side |
│---------------------------------------│
╰──────╮ object type ╭─╮ instance state │
       ╰─────────────╯ ╰────────────────╯
<sub><i><b>Figure 5:</b> Part <b>p<sub>a</sub></b>'s equation maps to an object instance
in javascript. Each part type is a class in javascript
whose instance state can be set by setting the right-
hand-side value or any of the left-hand-side variables.</i></sub>
</pre>
### Support
This is a new paradigm with many applications and I'm working to demonstrate that. I need your support to keep going. Please contact me if you can help.
### Roadmap
Version `1.0.0` is under development.
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Concept & algorithm
|✅ Done|**CI/CD pipeline**|Build and deploy automation
|🔄 Ongoing|**Debugging tools**|Source mapping and logging
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|Tools for rapid prototyping

### References
<a id="ref-1">[1]</a> IETF. (2005). <em>Uniform Resource Identifier (URI): Generic Syntax</em>. RFC 3986. <a href="https://datatracker.ietf.org/doc/html/rfc3986">https://datatracker.ietf.org/doc/html/rfc3986</a>
