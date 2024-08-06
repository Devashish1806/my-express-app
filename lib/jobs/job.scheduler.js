"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const cron_1 = require("cron");
const log4js_util_1 = require("../utils/log4js.util");
exports.Job = new cron_1.CronJob("* * * * * *", // cronTime
function () {
    log4js_util_1.Logger.log.debug("You will see this message every second");
}, // onTick
null, // onComplete
false, // start
"America/Los_Angeles" // timeZone
);
// job.start() is optional here because of the fourth parameter set to true.
//# sourceMappingURL=job.scheduler.js.map