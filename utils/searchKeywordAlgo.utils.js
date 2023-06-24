const treebank = require('talisman/tokenizers/words/treebank')
const doubleMetaphone = require('talisman/phonetics/double-metaphone')

function generateSerachKeyWord(keyWord){
    const data = treebank(keyWord)
    let result = []
    data.forEach(element => {
        const doubleMetaphoneResult = doubleMetaphone(element)
        doubleMetaphoneResult.forEach(doubleMetaphoneElement => {
            if(!result.includes(doubleMetaphoneElement)){
                result.push(doubleMetaphoneElement)
            }
        });
       
    });
    return result;
};
module.exports={
    generateSerachKeyWord
}
