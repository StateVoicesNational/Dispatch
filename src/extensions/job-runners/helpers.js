/* eslint import/prefer-default-export:0 no-console:0 */

import { r } from "../../server/models";

export const saveJob = async (jobData, trx) => {
  const builder = trx || r.knex;

  let unsavedJob;
  if (typeof jobData.payload === "string") {
    unsavedJob = jobData;
  } else {
    unsavedJob = { ...jobData, payload: JSON.stringify(jobData.payload || {}) };
  }

  console.log("unsavedJob", unsavedJob);

  console.log(
    "SQL",
    builder("job_request")
      .insert(unsavedJob, "id")
      .toString()
  );
  const [res] = await builder("job_request").insert(unsavedJob, "id");
  console.log("job_request insert return", res);

  return builder("job_request")
    .select("*")
    .where("id", res.id)
    .first();
};
