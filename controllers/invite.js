import { transporter } from "../nodemailer.js";
import { db } from "../connect.js";

export const adminInvite = (req, res) => {
  const emailsResult = sendMultipleEmails(
    req.body.email_reciever_id,
    req.body.email_sub,
    req.body.email_cont
  );
  //console.log("emailsResult : " , emailsResult);
 
  const q = "insert into mail_content (mail_content) Values (?)";
  db.query(q, [req.body.email_cont], (err, data) => {
    //console.log(req.body.email_cont);
    if (err) return res.status(500).json(err);
    const insertId = data.insertId;
    const values2 = Object.values(emailsResult).map(({ to, success }) => [
      insertId,
      to,
      success,
    ]);
    const q = "insert into mail_sent_data (content_id, email_id, status) Values ?";
  db.query(q, [values2], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(emailsResult);
  });
  });
  //return res.status(200).json(emailsResult);
};

const sendMultipleEmails = (emailsList, sub, content) => {
  const emailsRes = {};

  for (let i = 0, len = emailsList.length; i < len; i++) {
    const res = sendNewMail({
      from: '"Propertyease " <noreply@propertyease.in>',
      to: emailsList[i],
      //   subject: `Unlock Exclusive Real Estate Opportunities!`,
      subject: sub,
      body: content,
      //         body: `
      // <div style="margin:0px;padding:0px;">
      //             <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
      //                <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
      //                   <tbody>
      //                      <tr>
      //                         <td style="width:700px;display:block;clear:both">
      //                            <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">

      //                               <tr style="height:80px; text-align:center;">
      //                                  <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
      //                                  </td>
      //                               </tr>
      //                         </td>
      //                      </tr>
      //                      <tr>
      //                         <td>
      //                            <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">

      //                               <tr>
      //                                  <td>
      //                                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">

      //                                        <tr>
      //                                           <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
      //                                              <p style="color:#404040; margin-bottom: 10px;"> Hi there,</b>

      //                                              <p style="margin-bottom: 10px; font-size: 16px;">We are thrilled to invite you to join our exclusive real estate community! By signing up, you’ll gain access to:</p>
      //                                              <p style="margin-bottom: 10px; font-size: 16px;"><b>List Properties for Free: </b>Easily list your properties for sale or rent at no cost.</p>
      //                                              <p style="margin-bottom: 10px; font-size: 16px;"><b>Contact Agents and Buyers: </b>Connect directly with agents and potential buyers.</p>
      //                                              <p style="margin-bottom: 10px; font-size: 16px;"><b>Email Alerts: </b>Get notified about new listings and market updates.</p>
      //                                              <p style="margin-bottom: 10px; font-size: 16px;"><b>Shortlist Properties: </b>Save your favorite properties and access them anytime.</p>

      //                                              <p style="margin-bottom: 10px; font-size: 16px;"><a href="https://propertyease.in/" style="display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;" >Sign Up Now</a></p>

      //                                              <p style="margin-bottom: 10px; font-size: 16px;">Don’t miss out on these amazing opportunities. Click the button above to join us today!</p>

      //                                              <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support at <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>

      //                                              </td>
      //                                        </tr>
      //                                        <tr>
      //                                           <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
      //                                              <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
      //                                                 </b></p>
      //                                              <p style="margin-bottom:0px; font-size: 15px;"><b>Propertyease Team</b></p>
      //                                              <p style="margin-bottom: 10px; font-size: 15px;"><b>Propertyease.in</b></p>

      //                                           </td>
      //                                        </tr>
      //                                     </table>
      //                                  </td>
      //                               </tr>

      //                            </table>
      //                         </td>
      //                      </tr>
      //                      <tr>
      //                         <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">

      //                            <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
      //                               &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
      //                         </td>
      //                      </tr>

      //                   </tbody>
      //                </table>
      //             </div>
      //          </div>
      //     `,
    });
    emailsRes[emailsList[i]] = res;
  }
  return emailsRes;
};

const sendNewMail = (data) => {
  const { from, to, subject, body } = data;
  try {
    transporter.sendMail({
      from,
      to,
      subject: subject || "no subject",
      html: body,
    }
  );
    console.log("mail sent : ", to);
    return { success: true, message: "Email sent successfully!", to: to };
  } catch (error) {
    console.error(error);
    console.log("failed : ", to);
    return { success: false, message: "Email not sent !", to: to };
  }
};

// const sendNewMail = (data) => {
//   const { from, to, subject, body } = data;

//   try {
//     transporter.sendMail({
//       from,
//       to,
//       subject: subject || "no subject",
//       html: body,
//     }, (err, info) => {
//       if (err) {
//         console.log("Error sending mail:", err);
//         return { success: false, message: "Email not sent!", to: to };
//       }
//       console.log("Mail sent to:", to);
//       return { success: true, message: "Email sent successfully!", to: to };
//     });
//   } catch (error) {
//     console.error("Caught error:", error);
//     console.log("Failed to send mail to:", to);
//     return { success: false, message: "Email not sent!", to: to };
//   }
// };


export const getMailContactList = (req, res) => {
  const q = `
   SELECT login_module.login_id AS email_id, 
       login_module.login_email AS email, 
       1 AS already_user
FROM login_module
UNION
SELECT email_contacts.email_id AS email_id, 
       email_contacts.email AS email, 
       0 AS already_user
FROM email_contacts
LEFT JOIN login_module
ON email_contacts.email = login_module.login_email
WHERE login_module.login_email IS NULL;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addSingleMail = (req, res) => {
  const { email } = req.body;
  console.log(email);
  const q = "insert into email_contacts (email) Values (?)";
  db.query(q, [email], (err, data) => {
    console.log(email);
    if (err) return res.status(500).json(err);
    return res.status(200).json("Updated Successfully");
  });
};

export const deleteMailContact = (req, res) => {
  console.log("req.params.mailId : ", req.params.mailId);
  const q = "DELETE email_contacts from email_contacts WHERE email_id = ?";
  db.query(q, [req.params.mailId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("DELETED");
  });
};
<<<<<<< HEAD
=======




export const userInvite = (req, res) => {
  
  const res1 = sendMultipleEmailToUser(
    req.body.email_reciever_id,
    req.body.email_sender_name
  );
  return res.status(200).json("done");
};


const sendMultipleEmailToUser = (emailsList, name) => {
  const emailsRes = {};

  for (let i = 0, len = emailsList.length; i < len; i++) {
    const res = sendNewMail({
      from: '"Propertyease " <noreply@propertyease.in>',
      to: emailsList[i],
      subject: `Unlock Exclusive Real Estate Opportunities!`,
              body: `
      <div style="margin:0px;padding:0px;">
                  <div style="margin:0px;padding:0px;  margin: 30px auto; width: 700px; padding: 10px 10px;  background-color: #f6f8fc; box-shadow:rgba(13, 109, 253, 0.25) 0px 25px 50px -10px !important; ">
                     <table cellpadding="0" style="width:700px;margin:auto;display:block;font-family:\'trebuchet ms\',geneva,sans-serif;">
                        <tbody>
                           <tr>
                              <td style="width:700px;display:block;clear:both">
                                 <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style=" margin-top:30px;background-clip:padding-box;border-collapse:collapse;border-radius:5px;">

                                    <tr style="height:80px; text-align:center;">
                                       <td style="padding-left:22px; padding-bottom: 10px"><img src="https://property-five.vercel.app/images/logo.png">
                                       </td>
                                    </tr>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <table style="width:500px;clear:both" border="0" align="center" cellpadding="0" cellspacing="0">

                                    <tr>
                                       <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 30px 0px 0px 0px;">

                                             <tr>
                                                <td height="10px" style="font-size: 16px;line-height: 24px;letter-spacing:.3px;">
                                                   <p style="color:#404040; margin-bottom: 10px;"> Hi there,</b>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">${name} invited you to join our exclusive real estate community! By signing up, you’ll gain access to:</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>List Properties for Free: </b>Easily list your properties for sale or rent at no cost.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Contact Agents and Buyers: </b>Connect directly with agents and potential buyers.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Email Alerts: </b>Get notified about new listings and market updates.</p>
                                                   <p style="margin-bottom: 10px; font-size: 16px;"><b>Shortlist Properties: </b>Save your favorite properties and access them anytime.</p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;"><a href="https://propertyease.in/" style="display: block; width: 200px; margin: 20px auto; padding: 10px 0; text-align: center; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;" >Sign Up Now</a></p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">Don’t miss out on these amazing opportunities. Click the button above to join us today!</p>

                                                   <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support at <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>

                                                   </td>
                                             </tr>
                                             <tr>
                                                <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                                   <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                                      </b></p>
                                                   <p style="margin-bottom:0px; font-size: 15px;"><b>Propertyease Team</b></p>
                                                   <p style="margin-bottom: 10px; font-size: 15px;"><b>Propertyease.in</b></p>

                                                </td>
                                             </tr>
                                          </table>
                                       </td>
                                    </tr>

                                 </table>
                              </td>
                           </tr>
                           <tr>
                              <td style="font-size: 14px;text-align: center;line-height: 21px;letter-spacing: .3px; color: #155298; height: 68px;">

                                 <p style="line-height:22px;margin-bottom:0px;padding: 10px;  color:#000;font-size: 12px;">
                                    &copy; Copyright ${new Date().getFullYear()} All Rights Reserved.</p>
                              </td>
                           </tr>

                        </tbody>
                     </table>
                  </div>
               </div>
          `,
    });
    emailsRes[emailsList[i]] = res;
  }
  return emailsRes;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7d39c145a6e2ac3563a5517c0bc8f16091997e5f
};


export const getMailContent = (req, res) => {
  const q = `
   SELECT * FROM mail_content;`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
<<<<<<< HEAD
};
>>>>>>> 26689bff8e1eeb9b45f17db65e5ccbda5c80a153
=======
};
>>>>>>> 3ac534e5fe04cceae8919c5f3c1400eb71c175d3
=======
};
>>>>>>> 7d39c145a6e2ac3563a5517c0bc8f16091997e5f
