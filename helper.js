function savePatterns(value, callback) {
  chrome.storage.sync.set({ patterns: value }, function() {
    if (callback) {
      callback(value);
    }
  });
}

function readPatterns(callback) {
  chrome.storage.sync.get(["patterns"], function(data) {
    if (callback) {
      callback(data.patterns);
    }
  });
}
