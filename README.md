<sup><i>© 2013 - 2024 Eric Augustinowicz. All Rights Reserved.</i></sup>
# [A Method of Building Static Client-Rendered Web Apps That Have a Permanent URL to Every State](https://github.com/EJAugust/EJAugust)<br>[![Project Status: Alpha](https://img.shields.io/badge/Project%20Status-Alpha-orange)](https://www.repostatus.org/#alpha) [![Commits](https://img.shields.io/github/commit-activity/t/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust) [![GitHub Last Commit](https://img.shields.io/github/last-commit/EJAugust/EJAugust)](https://github.com/EJAugust/EJAugust)
This project is the culmination of my research in art, design, engineering, and mathematics. The result is a light, MVC-like front-end framework in which applications are made from reusable parts for which URLs are state literals and which are readily analyzed using mathematics.
# Concepts
It models application behavior as a [tree ↗](https://www.geeksforgeeks.org/tree-data-structure/) of [Diphantine equations ↗](https://mathworld.wolfram.com/DiophantineEquation.html) (called **parts**; see [figure 1](#fig-1)) whose [variables ↗](https://www.mathsisfun.com/algebra/introduction.html) are represented by their downstream vertices.

|left-hand-side|$=$|right-hand-side
|-|-|-
|zero or more variables<br>no constants|$=$|a constant natural number
|$`aB + c`$|$=$|$`94`$
|"type"|$=$|"state" or "value"

Parts have [types ↗](https://ncatlab.org/nlab/show/type%20theory) so that their left-hand-side can be reused and extended (see [figure 2](#fig-2)). A type has $k\geq 1$ solutions which bijectively map its possible variable assignments to its values less than $k$.

By giving every part type a [domain name ↗](https://datatracker.ietf.org/doc/html/rfc1034) (see [figure 3](#fig-3)) and expressing its value in some [base ↗](https://www.mathsisfun.com/numbers/bases.html) (see [figure 4](#fig-4)), we obtain a [URI ↗](https://datatracker.ietf.org/doc/html/rfc3986) for every value of every type (see [figure 5](#fig-5)).

Parts are implimented as [javascript class ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) instances (see [figure 6](#fig-6)). Each part has presentation information which takes the place of a traditional model-view-controller paradigm with perhaps less overhead than one would expect. All values have the [`bigint` ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) type.

## Implimentation
Type definitions are organized as source files in a folder starting at `domain-root/` with a structure matching the domain name hierarchy. Types gain their names from the folder their source material is in and are defined by adding new empty folder and putting zero or more source files into it. Certain file names are for special use like `.unit` for specifying a  base type. All types extending the common base `one.core.parts`. Presentation materials are also be placed in these folders. At deploy time, a node script recursively packs `domain-root` into a single script `sw.js` and single document `index.html`.

### Figures
For any part $p_x$
- $`t_x=\text{type}(p_x)`$
- $`v_x=\text{value}(p_x)`$
- $`u_x=\text{url}(p_x)`$
- $`k_x=\text{size}(t_x)`$
- $`h_x=\text{name}(t_x)`$
- $`0\leq v_x<k_x`$

|<span id=fig-1>Figure 1</span><br>
|-
|<pre>       p_a <br>      ( 94 ) <br>     /     \ <br>    /       \ <br>   /         \ <br> p_b       p_c <br> ( 9 )     ( 4 )</pre><sub><i>Example part </i></sub>$p_a$<sub><i> models the 2-digit base-10 numeral, </i></sub>$94$<sub><i>.</i></sub><br><br>$`v_a=v_bk_c+v_c=94`$<br><sub><i>where </i></sub><br>&nbsp;&nbsp;$`k_a=k_bk_c=100`$<br><sub>Given </i></sub>$v_a$<sub><i> and </i></sub>$k_c$<sub><i>, there is only one solution for </i></sub>$v_b$<sub><i> and </i></sub>$v_c$<sub><i>.</i></sub>
|<sub><i>Part </i></sub>$p_b$<sub><i> models the ten's place:</i></sub><br><br>$`v_b=...= 9`$<br><sub><i>where </i></sub><br>&nbsp;&nbsp;$`k_b=10`$
|<sub><i>Part </i></sub>$p_c$<sub><i> models the one's place:</i></sub><br><br>$`v_c=...= 4`$<br><sub><i>where </i></sub><br>&nbsp;&nbsp;$`k_c=10`$

|<span id=fig-2>Figure 2</span><br>
|-
|<sub><i>Part </i></sub>$p_a$<sub><i> is the cartesian product of two base-10 numerals.</i></sub><br><br>$`v_a=v_bk_t+v_c=94`$<br><sub><i>where </i></sub><br>&nbsp;&nbsp;$`k_a=k_t^2=100`$
|<sub><i>Parts </i></sub>$p_b$<sub><i> and </i></sub>$p_c$<sub><i> are base-10 numerals.</i></sub><br><br>$`t_a=t_b`$<br>$`v_b=...= 9`$<br>$`v_c=...= 4`$<br><sub><i>where </i></sub><br>&nbsp;&nbsp;$`k_a=k_b=10`$

|<span id=fig-3>Figure 3</span>
|-
|<sub><i>Types are given domain names.</i></sub><br><br>`[`$`$h_a=`$`example.core.parts]:`$`a\leftrightarrow (b,c)`$<br>`[`$`h_b=h_c=`$`digit.example.core.parts]:`$`n\leftrightarrow n`$

|<span id=fig-4>Figure 4</span>
|-
|<sub><i>Rendering </i></sub>$v_x$<sub><i> in base </i></sub>$b=64$<sub><i> reduces numeral length.</i></sub><br><br>$`v_a = 94_{10} = \text{1u}_{64}`$<br>$`17357333_{10} = \text{BCNoV}_{64}`$<br>$`225771398090934336480177995386552_{10} = \text{shorter-in-base-64}_{64}`$
|<sub><i>Given the following 74 uri-friendly characters:<br>\[`0`, ... `9`, `a` ... `z`, `A`, ... `Z`, `-`,  `_`, `.`, `~`, `?`, `#`, `&`, `/`, `=`, `!`, `$`, `*`\]<br></i>the optimal base (for space efficiency) would be </sub>$b=74$<sub><i>.

|<span id=fig-5>Figure 5</span>
|-
|<sub><i>Joining </i></sub>$h_x$<sub><i> to </i></sub>$v_x$<sub><i> in base </i></sub>$b$<sub><i> obtains </i></sub>$u_x$<sub><i>.</i></sub>
|$`$h_a=`$`example.core.parts`<br>$`v_a=94_{10}=\text{1u}_{64}`$<br>$`u_a=`$`https://example.core.parts#1u`
|$`$h_b=`$`digit.example.core.parts`<br>$`v_b=9_{10}=\text{9}_{64}`$<br>$`u_b=`$`https://digit.example.core.parts#9`
|$`$h_c=`$`digit.example.core.parts`<br>$`v_c=4_{10}=\text{4}_{64}`$<br>$`u_c=`$`https://digit.example.core.parts#4`
|<pre>           https&#58;//example.core.parts#1u <br>                         (p_a)   v_a = 94 <br>                       /       \ <br>                      /         \ <br>                     /           \ <br>                    /             \ <br>                   /               \ <br>       v_b = 9  (p_b)               \ <br>https&#58;//digit.example.core.parts#9   \ <br>                                      \ <br>                                    (p_c) v_b = 4 <br>                        https&#58;//digit.example.core.parts#4</pre>

|<span id=fig-6>Figure 6</span>
|-
|<sub><i>This simplified example shows how parts can be handled as objects in javascript.</i></sub>
|<pre>class TwoDigits {<br>&nbsp;constructor(value){<br>&nbsp;&nbsp;// construct subparts<br>&nbsp;&nbsp;this.b = new Digit()<br>&nbsp;&nbsp;this.c = new Digit()<br>&nbsp;&nbsp;this.value = value<br>&nbsp;}<br>&nbsp;get value(){<br>&nbsp;&nbsp;return this.b.value * this.c.size + this.c.value<br>&nbsp;}<br>&nbsp;set value(value){<br>&nbsp;&nbsp;this.b.value  = Math.floor(value / this.c.size)<br>&nbsp;&nbsp;this.c.value = value % this.c.size<br>&nbsp;}<br>}<br><br>const a = new TwoDigits(94)</pre>

## Support
This is a new paradigm with many applications and I'm working to demonstrate that. I need your support to keep going. Please contact me if you can help.
## Roadmap
Version `1.0.0` is under development.
|Status|Phase|Description
|-|-|-
|✅ Done|**Core framework**|Concept & algorithm
|✅ Done|**CI/CD pipeline**|Build and deploy automation
|🔄 Ongoing|**Debugging tools**|Source mapping and logging
|🔄 Ongoing|**Example content**|Live demos and documentation
|⏳ Planned|**Bootstrapped IDE**|Tools for rapid prototyping
