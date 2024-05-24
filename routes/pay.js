import express from "express";
import { db } from "../connect.js";
import Razorpay from "razorpay";
import "dotenv/config";
import crypto from "crypto";
import { transporter } from "../nodemailer.js";

const router = express.Router();

const razorpay1 = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});



router.post("/proListingPay", async (req, res) => {
  console.log(req.body.amount);
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_1",
    payment_capture: 1,
  };

  try {
    const order = await razorpay1.orders.create(options);
    console.log("orderdata : ", order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/paymentVerification", async (req, res) => {
  console.log("req.body : ", req.body);
  const {
    orderCreationId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    list_plan_id,
    plan_name,
    tran_amt,
    list_plan_valid_for_days,
    user_id,
    pro_plan_added_slots,
    plan_status,
    payment_status,
    discount,
    original_price,
    login_email,
    login_number,

  } = req.body;

  const body = orderCreationId + "|" + razorpayPaymentId;
  console.log("body : ", body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (isAuthentic) {
    
    const q =
    "INSERT INTO list_plan_transactions ( list_plan_id, plan_name, tran_amt, user_id, list_plan_valid_for_days, pro_plan_added_slots, plan_status, order_id, payment_id, payment_status, payment_discount, original_price) Values (?)";
  const values = [
    list_plan_id,
    plan_name,
    tran_amt,
    user_id,
    list_plan_valid_for_days,
    pro_plan_added_slots,
    plan_status,
    orderCreationId,
    razorpayPaymentId,
    payment_status,
    discount,
    original_price
  ];
    db.query(q, [values], (err, data) => {
      const insertId = data.insertId;
      console.log(values);
      if (err) return res.status(500).json(err);
      //return res.status(200).json(1);
      let info = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        //to: data[0].login_email,
        to: "harshgupta.calinfo@gmail.com",
        //to: "propertyease.in@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        //to: req.body.pro_user_email,
        subject: `Thank You for Subscribing!`, // Subject line
        html: `<div style="margin:0px;padding:0px;">
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
                                        <p style="color:#404040; margin-bottom: 10px;"> Dear User,</b>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">Thank you for choosing us. we're committed to providing you with the best services possible. </p>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">If you have any questions or feedback, please don't hesitate to reach out to us. We're here to help.</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You may also contact our support at <a href="https://wa.me/919996716787">+91-99967-16787</a> anytime for any information related to this enquiry.</p>
                                        </td>
                                  </tr>
                                  <tr>
                                     <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                           </b></p>
                                        <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
                                        <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>
    
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
    </div>`,
      };
      let info2 = {
        from: '"Propertyease " <noreply@propertyease.in>', // sender address
        //to: data[0].login_email,
        to: "harshgupta.calinfo@gmail.com",
        //to: "propertyease.in@gmail.com,dhamija.piyush7@gmail.com", // list of receivers
        //to: req.body.pro_user_email,
        subject: `Subscription Sold`, // Subject line
        html: `<div style="margin:0px;padding:0px;">
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
                                        <p style="color:#404040; margin-bottom: 10px;"> Dear Admin,</b>
                                        
                                        <p style="margin-bottom: 10px; font-size: 16px;">${login_email} has purchased ${plan_name} plan.</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Transaction Id: ${9000 + parseInt(insertId)}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Subscriber Id: ${user_id}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Name: ${plan_name}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Amount: ${tran_amt}</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">Plan Valid For: ${list_plan_valid_for_days} Days</p>
                                        <p style="margin-bottom: 10px; font-size: 16px;">You can Contact him/her on <a href="https://wa.me/${"91"+login_number}">+91-${login_number}</a>.</p>
                                        </td>
                                  </tr>
                                  <tr>
                                     <td height="10px" style="font-size: 15px;line-height: 24px;letter-spacing:.3px;">
                                        <p style="color:#404040; margin-bottom:0px;"> <b>Thanks & Regards,
                                           </b></p>
                                        <p style="margin-bottom:0px; font-size: 15px;">Admin Team</p>
                                        <p style="margin-bottom: 10px; font-size: 15px;">Propertyease.in</p>
    
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
    </div>`,
      };
      transporter.sendMail(info, (err, data) => {
        if (err) return res.status(500).json(err);
        transporter.sendMail(info2, (err, data) => {
          if (err) return res.status(500).json(err);
        
          return res.status(200).json(1);
        });
        //return res.status(200).json(insertId);
      });
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

export default router;
