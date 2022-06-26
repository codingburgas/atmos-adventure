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
				subject: '👋 Please verify your email!',
				html: `
				<!DOCTYPE html>
					<html lang="en">

					<head>
						<meta charset="UTF-8" />
						<meta http-equiv="X-UA-Compatible" content="IE=edge" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<title>Verification email</title>
						<link rel="preconnect" href="https://fonts.googleapis.com" />
						<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
						<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
							rel="stylesheet" />
						<style>
							* {
								text-align: center;
							}
							body {
								text-align: center;
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
							}

							.logo>img {
								margin-top: 10vh;
								height: 15vh;
							}

							.banner>img {
								margin-top: 5vh;
								height: 15vh;
							}

							.text {
								max-width: 65vw;
								font-family: "Inter", sans-serif;
								text-align: center;
							}

							.text>p {
								text-align: center;
							}



							span {
								font-weight: bold;
							}

							@font-face {
								font-family: "Dreamscape Sans";
								src: url("Dreamscape Sans.ttf");
							}

							button {
								border: none;
								outline: none;
								background-color: #4140b0;
								color: white;
								padding: 1rem;
								border-radius: 40px;
								font-family: "Dreamscape Sans";
								font-size: 1rem;
							}

							button:hover {
								background-color: #2e2c9e;
								cursor: pointer;
							}

							@media (min-width: 1023px) {
								.logo>img {
									margin-top: 10vh;
									height: 20vh;
								}

								.banner>img {
									margin-top: 5vh;
									height: 20vh;
								}

								.text {
									max-width: 65vw;
									font-family: "Inter", sans-serif;
									text-align: center;
									font-size: 1.2rem;
								}

								button {
									padding: 1rem;
									border-radius: 40px;
									font-family: "Dreamscape Sans";
									font-size: 1.7rem;
									margin-top: 2rem;
								}

								button:hover {
									background-color: #2e2c9e;
									cursor: pointer;
								}
							}

							@media (min-width: 1281px) {
								.logo>img {
									margin-top: 5vh;
									height: 25vh;
								}

								.banner>img {
									margin-top: 5vh;
									height: 25vh;
								}

								.text {
									max-width: 60vw;
									font-family: "Inter", sans-serif;
									text-align: center;
									font-size: 1.4rem;
								}

								button {
									padding: 1rem;
									border-radius: 40px;
									font-family: "Dreamscape Sans";
									font-size: 1.8rem;
									margin-top: 2rem;
								}

								button:hover {
									background-color: #2e2c9e;
									cursor: pointer;
								}
							}
						</style>
					</head>

					<body>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td style="text-align: center;">
									<div class="logo">
										<img src="https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png" alt="logo" />
									</div>
									<div class="banner">
										<img src="https://i.pinimg.com/originals/3b/7c/93/3b7c9391b0dba6a892abd4c244e4f8c6.jpg" alt="banner" />
									</div>
									<div class="text">
										<p>
											<span>Welcome on board!</span> *cue the confetti 🎉* You’ve recently
											registered into the <span>ATMOS platform</span>, which now makes you an
											official user!
										</p>
										<p>
											Please confirm your email by
											<span>pressing the button below!</span> Don’t recall signing up? Message
											us at support@atmos.systems 📭! 
										</p>
									</div>
									<a href="http://localhost:3001/api/confirm/${token}"><button>Confirm email</button></a>
								</td>
							</tr>
						</table>
					</body>

				</html>`
			}
			
			transporter.sendMail(mailOptions, (err) => {
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