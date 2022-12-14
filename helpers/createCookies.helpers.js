// This below function only responsible for create cookies 
exports.createCookies = async(req, res)=>{
    const {accessToken,  refreshToken} = req
    res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME,accessToken,{
        httpOnly: true,
    })
    res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME,refreshToken,{
        httpOnly: true,
    })
}