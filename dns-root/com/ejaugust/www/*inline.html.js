return "<scroller->" + (
 "<header>" + (
  "<menu>" + (
   `<a id=notebook-title href="https://www.ejaugust.com" onclick="_.noop(event); _.com.ejaugust.scroller.setRouteID(0n); _.com.ejaugust.www.setRouteID(0n)">${ejaugust.title}</a>` +
   "<flex-spacer></flex-spacer>" +
   "<a target=_blank href=https://github.com/EJAugust>My Github</a>" +
   "<a target=_blank href=https://github.com/kireji-app/alpha>Site GitHub</a>" +
   "<a target=_blank href=https://github.com/sponsors/EJAugust>♡ Support</a>"
  ) +
  "</menu>"
 ) +
 "</header>" + (
  "<article id=notebook-section>" + section["inline.html"] + "</article>"
 )
) + "</scroller->"