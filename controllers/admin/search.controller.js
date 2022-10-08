const treebank = require('talisman/tokenizers/words/treebank')
const doubleMetaphone = require('talisman/phonetics/double-metaphone')
const searchService = require('../../services/admin/serarch.service')


exports.SerachAlgo = async(req, res)=>{

const data = treebank(req.body.name)
 let result = []
 data.forEach(element => {
    const doubleMetaphoneResult = doubleMetaphone(element)
    doubleMetaphoneResult.forEach(doubleMetaphoneElement => {
        if(!result.includes(doubleMetaphoneElement)){
            result.push(doubleMetaphoneElement)
        }
    });
 });
 
 const searchResult  = await searchService.search(result)
 if(Object.keys(searchResult).length){
    res.json({
        status:200,
        message:'Fetch sucessfully!',
        data:searchResult
    })
 }else{
    return  appResponse(res, 404, MESSAGE.NOTFOUND)
 }
}