// Ultimate warning suppression - loads before everything else
(function () {
  // NUCLEAR OPTION: Completely disable console.warn for testing
  console.warn = function () {
    // Do absolutely nothing - block ALL warnings
  };
})();
