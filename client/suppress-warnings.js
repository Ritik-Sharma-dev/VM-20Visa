// Ultimate warning suppression - loads before everything else
(function () {
  const originalWarn = console.warn;

  console.warn = function (...args) {
    // Convert everything to string for comparison
    const message = args.join(" ");

    // Nuclear suppression of defaultProps warnings
    if (message.includes("defaultProps")) return;
    if (message.includes("XAxis")) return;
    if (message.includes("YAxis")) return;
    if (message.includes("recharts")) return;

    // Allow other warnings through
    originalWarn.apply(console, args);
  };
})();
