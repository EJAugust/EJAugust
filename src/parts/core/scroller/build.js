Object.defineProperties(scroller, {
 cardinality: { value: 100_00n },

 content: { value: null, writable: true },
 listener: { value: e => scroller.onscroll(e) },
 container: { value: null, writable: true },
 scrollBar: { value: null, writable: true },
 skipDOMUpdate: { value: false, writable: true },
 skipRouteIDUpdate: { value: false, writable: true },
})