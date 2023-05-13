let urls = [
    "com", 
    "net", 
    "edu", 
    "info", 
    "me", 
    "travel", 
    "blog", 
    "tech", 
    "space", 
    "art", 
    "health", 
    "dev", 
    "guru", 
    "academy", 
    "marketing", 
    "fitness", 
    "news", 
    "review", 
    "solutions", 
    "style", 
    "science", 
    "cooking"
]

function checkBlogUrl(url){
    const parsedURL = new URL(url)
    const domainPart = parsedURL.hostname.split('.').pop()
    const isValid = urls.includes(domainPart)
    return isValid
}

module.exports={
    checkBlogUrl
}