/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
    let row1="qwertyuiop";
    let row2="asdfghjkl";
    let row3="zxcvbnm";
    
    let result=[];
    for(let word of words){
        let lowerCaseWord=word.toLowerCase();
        let firstLetter=lowerCaseWord[0];
        if(row1.includes(firstLetter)){
            if(lowerCaseWord.split("").every(letter=>row1.includes         (letter))) 
            {
                result.push(word);
            }
        }else if(row2.includes(firstLetter)){
            if(lowerCaseWord.split("").every(letter=>row2.includes(letter)))
            {
                result.push(word);
            }
        }else if(row3.includes(firstLetter)){
            if(lowerCaseWord.split("").every(letter=>row3.includes(letter)))
            {
                result.push(word);
            }
        }
    }
    return result;
};

