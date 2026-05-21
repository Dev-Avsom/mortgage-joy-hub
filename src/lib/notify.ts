import { sendSubmissionNotification } from "./notify.functions";

export async function notifySubmission(payload: {
  source: string;
  subject: string;
  fields?: Record<string, string | number | boolean | null>;
  message?: string;
}) {
  try {
    await sendSubmissionNotification({ data: payload });
  } catch (err) {
    console.error("notifySubmission failed", err);
  }
}