import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: +process.env.MAIL_PORT!,
	secure: false,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});
export const sendMailToRegisterUser = async (email: string, token: string) => {
	return await transporter.sendMail({
		from: '"School" <admin@school.com>',
		to: email,
		subject: 'School diary',
		text: `Hi! Register account on your electronic school diary using your email and this token: ${token}`,
	});
};
