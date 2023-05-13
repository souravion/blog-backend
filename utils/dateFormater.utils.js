function dateFormatter(date){
    let newdate = new Date (date)
    let dateString = newdate.toUTCString()
    return dateString
}
module.exports={
    dateFormatter
}