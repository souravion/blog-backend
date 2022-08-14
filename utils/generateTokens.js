const jwt = require("jsonwebtoken") 
const  UserToken = require('../models/UserToken')


const generateTokens = async (user) => {
	try {
		const payload = { _id: user.userId};
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "14m" }
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);

		const userToken = await UserToken.findOne({ userId: user.userId });
		if (userToken) await UserToken.remove();
	
		const newUserToken = new UserToken({
			userId:user.userId,token:refreshToken
		})
       	await newUserToken.save()
		return {accessToken, refreshToken}
		// return Promise.resolve({ accessToken, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = {
	generateTokens
}
;
