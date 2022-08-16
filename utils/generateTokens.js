const jwt = require("jsonwebtoken") 
const  UserToken = require('../models/UserToken')


const generateTokens = async (user) => {
	try {
		const payload = { _id: user.userId};
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "10d" }
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);


		const userToken = await UserToken.findOne({ userId: user.userId });
		if (userToken) await UserToken.deleteOne();
	
		const newUserToken = new UserToken({
			userId:user.userId,token:refreshToken
		})
       	await newUserToken.save()
		return {accessToken, refreshToken}
	} catch (err) {
		return err
	}
};

module.exports = {
	generateTokens
}
;
