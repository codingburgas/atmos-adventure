const nodemailer = require('nodemailer');
const db = require('../db/db_config.js');

const transporter = nodemailer.createTransport({
	host: 'smtp.titan.email',
	port: 465,
	secure: true,
	auth: {
		user: "no-reply@atmos.systems",
		pass: "AtmosMail.123"
	}
});

function sendConfirmationEmail(uuid, token)
{
	db.query('SELECT * FROM users WHERE uuid = (?)', [uuid], (err, result) => {
		if (err)
		{
			console.error("Something went wrong");
		}
		else if (result.length > 0)
		{
			const mailOptions = {
				from: 'Atmos Team <no-reply@atmos.systems>',
				to: result[0].email,
				subject: 'Atmos Account Confirmation',
				html:`<h1>Welcome to Atmos</h1>
				<p>Please click the link below to confirm your email address.</p>
				<a href="http://localhost:3001/api/confirm/${token}">Confirm Email</a>`
			}
			
			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.error("Something went wrong");
				} 
				else 
				{
					console.log(`Email sent successfully to ${mailOptions.to}`);
				}
			});
		}
	});
				
}

function sendForgotPasswordEmail(email, token)
{
	const mailOptions = {
		from: 'Atmos Team <no-reply@atmos.systems>',
		to: email,
		subject: 'Atmos Password Reset',
		html:`<h1>Atmos Password Reset</h1>
		<p>Please click the link below to reset your password.</p>
		<a href="http://localhost:3001/api/reset/${token}">Reset Password</a>`
	}
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.error("Something went wrong");
		} 
		else
		{
			console.log(`Email sent successfully to ${mailOptions.to}`);
		}
	});
}

module.exports = {
	sendConfirmationEmail,
	sendForgotPasswordEmail
};