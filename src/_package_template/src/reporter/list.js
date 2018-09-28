export function listReporter() {
    const log = console.log;
    const icons = {
        [0 /* Passed */]: "\u2713",
        [1 /* Failed */]: "\u2717",
        [2 /* Skipped */]: "\u00bb",
    };
    let failed;
    return {
        start() {
            failed = false;
        },
        finish() {
            log(failed ? "FAILED" : "PASSED");
        },
        report(r) {
            const name = r.path.join(" / ");
            const icon = icons[r.status];
            const secs = (r.duration / 1000).toFixed(2);
            log(`${icon} ${name} (${secs}s)`);
            r.errors.forEach(err => {
                log("\terror: " + err.replace("\n", "\n\t\t"));
            });
            failed = failed || r.status === 1 /* Failed */;
        },
    };
}
//# sourceMappingURL=list.js.map