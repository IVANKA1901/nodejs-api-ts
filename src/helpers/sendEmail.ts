import sgMail from "@sendgrid/mail";

import { envConfig } from "../configs/envConfig";

sgMail.setApiKey(envConfig.SENDGRID_API_KEY);

interface Data {
  to: string;
  from: string;
  text: string;
  html: string;
  subject: string;
}
const sendEmail = async (data: Data) => {
  const email = { ...data, from: "ivankafromel@gmail.com" };
  await sgMail.send(email);
  return true;
};

export default sendEmail;
