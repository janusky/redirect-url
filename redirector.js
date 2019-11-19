//import { readPatterns } from "./helper.js";

var redirectFn = function(patterns) {
  if (!patterns || patterns.length < 1) {
    return;
  }
  var currentUrl = window.location.href;
  patterns.forEach(function(pat) {
    var newUrl = "";
    //Si se debe remplazar
    var matcher = new RegExp(pat.url);
    if (matcher.test(currentUrl)) {
      newUrl = currentUrl.replace(matcher, pat.to);
      console.debug("Redirect", currentUrl, "to", newUrl);
      // DEPRECATED
      // chrome.extension.sendRequest({ redirect: newUrl });
      chrome.runtime.sendMessage({ redirect: newUrl }); // send message to redirect
    }
  }, this);
};

readPatterns(redirectFn);
