# DontInfluenceMe
a chrome extension that hides scores &amp; ratings on [albumoftheyear.org](https://www.albumoftheyear.org) so that you can form your own score before the numbers tell you what to think.

## features

the following can be switched on or off from the popup:

- critic scores
- user scores
- track ratings
- scores on individual reviews
- year / all-time rankings
- "must hear" badges
- review text (*off by default)

hidden items are made fully invisible but keep their space on the page, so the layout doesn't shift.

## to install

not available on the chrome web store, so load unpacked:

1. download/clone this repo.
2. open `chrome://extensions` and turn on **developer mode** (top right).
3. click **load unpacked** in the top left and select the repo folder.
4. optionally, pin the extension from the puzzle piece menu so the button is always visible.

untested for most browsers, but should be functional for most chromium browsers (edge, brave, opera, vivaldi). if using another browser, the `chrome://extensions` url may change, for example helium browser's is `helium://extensions`.

## usage

- click the extension icon and press **show scores** / **hide scores** to toggle everything at once
- optionally, you can press **alt+shift+d** to toggle without opening the popup. you can change this shortcut at `chrome://extensions/shortcuts`.
- the toolbar badge shows **on** while scores are hidden and **off** while invisible
- under **what to hide**, feel free to uncheck any category you don't mind seeing

settings are savefd at `chroma.storage.sync`, so they follow your chrome profile on other devices
