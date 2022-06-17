const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.titan.email',
	port: 465,
	secure: true,
	auth: {
		user: "no-reply@atmos.systems",
		pass: "AtmosMail.123"
	}
});

function sendMail(recipient)
{
	transporter.sendMail({
		from: "Atmos Team <no-reply@atmos.systems>",
		to: `${recipient}`,
		subject: "Sending Email using Node.js",
		text: "That was easy!"
		}, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Email sent successfully to ${recipient}`);
		}
	})
}

module.exports = {
	sendMail
};