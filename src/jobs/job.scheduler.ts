import { CronJob } from "cron";
import { Logger } from "../utils/log4js.util";

export const Job = new CronJob(
  "* * * * * *", // cronTime
  function () {
    Logger.log.debug("You will see this message every second");
  }, // onTick
  null, // onComplete
  false, // start
  "America/Los_Angeles" // timeZone
);
// job.start() is optional here because of the fourth parameter set to true.
