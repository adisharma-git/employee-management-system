const nodemailer = require('nodemailer');

// 1. Configure the Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. The Universal Send Function
const sendMail = async ({ to, bcc, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Work Alignr" <${process.env.EMAIL_USER}>`,
      to: to || process.env.EMAIL_USER, // If using BCC, 'to' defaults to the sender
      bcc: bcc, 
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for: ${subject}`);
    return true;
  } catch (error) {
    console.error("Email Sending Error:", error);
    return false;
  }
};

// 3. The Email Templates
const emailTemplates = {
  leaveApproval: (status, leaveType, days) => ({
    subject: `Leave Request ${status.charAt(0).toUpperCase() + status.slice(1)}`,
    html: `<h3>Leave Update</h3>
           <p>Your request for <strong>${days} day(s)</strong> of <strong>${leaveType}</strong> has been <strong>${status}</strong>.</p>
           <p>Please log in to your dashboard to view the details.</p>`
  }),

  newAnnouncement: (title, content) => ({
    subject: `📢 New Announcement: ${title}`,
    html: `<h3>${title}</h3>
           <p>${content}</p>
           <hr/><p><small>Log in to the employee portal for more details.</small></p>`
  }),

  newMeeting: (title, date, link) => ({
    subject: `📅 New Meeting Scheduled: ${title}`,
    html: `<h3>Meeting: ${title}</h3>
           <p><strong>Date & Time:</strong> ${new Date(date).toLocaleString()}</p>
           ${link ? `<p><strong>Link:</strong> <a href="${link}">${link}</a></p>` : ''}
           <p>Please log in to your dashboard to view the schedule.</p>`
  }),

  forgotCheckIn: () => ({
    subject: `⚠️ Action Required: Missed Check-In`,
    html: `<h3>Missed Check-In Notice</h3>
           <p>We noticed you haven't checked in for work today yet.</p>
           <p>If you are working today, please log in to the dashboard and punch in immediately to avoid being marked absent.</p>`
  }),

  forgotCheckOut: () => ({
    subject: `⚠️ Action Required: Missed Check-Out`,
    html: `<h3>Missed Check-Out Notice</h3>
           <p>You are currently still clocked in, but standard working hours have ended.</p>
           <p>Please log in to your dashboard and click "Check Out" to accurately log your hours for today.</p>`
  })
};

module.exports = { sendMail, emailTemplates };