return `html, body {
 --invert-on-light: ${desktop.color.arm === desktop.color.light ? "100%" : "0%"};
 --invert-on-dark: ${desktop.color.arm === desktop.color.light ? "0%" : "100%"};

 --light-fg: ${desktop.theme.lightFgTheme};
 --light-bg: ${desktop.theme.lightBgTheme};
 --light-accent: ${desktop.theme.lightAccentTheme};
 --dark-fg: ${desktop.theme.darkFgTheme};
 --dark-bg: ${desktop.theme.darkBgTheme};
 --dark-accent: ${desktop.theme.darkAccentTheme};

 --fg-accent: ${desktop.color.accent};
 --fg-un-accent: ${desktop.color.unAccent};
 --fg-light-est: ${desktop.color.lightEstFg};
 --fg-light-er: ${desktop.color.lightErFg};
 --fg-light: ${desktop.color.lightFg};
 --fg: ${desktop.color.fg};
 --fg-dark: ${desktop.color.darkFg};
 --fg-dark-er: ${desktop.color.darkErFg};
 --fg-dark-est: ${desktop.color.darkEstFg};
 --fg-mode-est: ${desktop.color.modeEstFg};
 --fg-mode-er: ${desktop.color.modeErFg};
 --fg-mode: ${desktop.color.modeFg};
 --fg-un-mode: ${desktop.color.unModeFg};
 --fg-un-mode-er: ${desktop.color.unModeErFg};
 --fg-un-mode-est: ${desktop.color.unModeEstFg};
 --bg-light-est: ${desktop.color.lightEstBg};
 --bg-light-er: ${desktop.color.lightErBg};
 --bg-light: ${desktop.color.lightBg};
 --bg: ${desktop.color.bg};
 --bg-dark: ${desktop.color.darkBg};
 --bg-dark-er: ${desktop.color.darkErBg};
 --bg-dark-est: ${desktop.color.darkEstBg};
 --bg-mode-est: ${desktop.color.modeEstBg};
 --bg-mode-er: ${desktop.color.modeErBg};
 --bg-mode: ${desktop.color.modeBg};
 --bg-un-mode: ${desktop.color.unModeBg};
 --bg-un-mode-er: ${desktop.color.unModeErBg};
 --bg-un-mode-est: ${desktop.color.unModeEstBg};
}`