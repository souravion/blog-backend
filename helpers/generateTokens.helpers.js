const jwt = require("jsonwebtoken") 
const  UserToken = require('../models/userToken.model')


const generateTokens = async (user) => {
	try {
		const payload = user;
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "1m" }
		);
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);


		const userToken = await UserToken.findOne({ userId: user.userId });
		if (userToken) await UserToken.deleteOne();
	
		const newUserToken = new UserToken({
			userId:user.userId,token:accessToken
		})
       	await newUserToken.save()
		return {refreshToken}
	} catch (err) {
		return err
	}
};

module.exports = {
	generateTokens
}
;
