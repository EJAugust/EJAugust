let result = ""

for (const subpart of _.parts.desktop)
 result += `<desktop-icon tabIndex=${subpart.index}><img class=icon /><span class=label>${subpart.title}</span></desktop-icon>`

return result