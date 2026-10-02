/**
 * Refreshing a page starts it from the top.
 *
 * Browsers normally put a refreshed page back where it was scrolled to, which
 * here would drop the visitor into the middle of a page with its opening
 * already over. This runs before the page is drawn and, on a refresh only:
 * turns that restoring off for this load, drops any #section from the address
 * (which would otherwise scroll to that section) and starts at the top.
 *
 * Going back and forward through history is left alone — the browser still
 * returns to where the visitor was on the previous page.
 */
const script = `(function () {
  try {
    var nav = performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "reload") return;
    history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    var toTop = function () { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
    toTop();
    window.addEventListener("pageshow", function () {
      toTop();
      setTimeout(function () { history.scrollRestoration = "auto"; }, 0);
    }, { once: true });
  } catch (error) {}
})();`;

export function StartAtTop() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
