let fs = require('fs');
// let tesseract = require('node-tesseract-ocr')

const { createWorker } = require('tesseract.js');
let isReady = false;




const filePaths = {
    imgSavePath: './BotScripts/img/FitBitLogTemp.jpg',
    outFile: './BotScripts/img/FitBitLog.txt'
}
// Emoji List
// \:muscle: \:thumbsup:   \:tada:  \:carrot: \:broccoli: \:fire:  \:star: \:100:


// Text Processing for ** Fitbit Specific Food Log **
// Test out regex for best s
// Key words
// Nice words, regex to find
let regexMatch = {
    CaloriesIn: `.......cals\. in`,
    CaloriesOut: `—.*cals\. out`,
    Budget: ` .* .* your budget`,
    Carbs: `carbs.*`,
    Fat: `fat.*`,
    Protein: `protein.*`
}
var essentialCalories = new Object;


// Image Processing for ** Fitbit Specific Food Log **
function processImageToText(msg, callback) {
    const worker = createWorker();

    let isReady = false;
    // Called as early as possible
    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        isReady = true;
    })();
    // Do other stuffs
    // (async (img) => {
    //     if (isReady) {
    //         const { data: { text } } = await worker.recognize(img);
    //         console.log(text);
    //         getEssentials(text);
    //         sendInfoBackToUser(msg);
    //     }
    // })(filePaths.imgSavePath);

    const doOCR = (img) => {
        const timer = setInterval(async () => {
            if (isReady) {
                clearInterval(timer);
                console.log("ready");
                const { data: { text } } = await worker.recognize(img);
                console.log(text);
                getEssentials(text);
                sendInfoBackToUser(msg);
            } else {
                console.log("not ready");
            }
        }, 500)
    };
    doOCR(filePaths.imgSavePath);

}


// Parse Saved Text Image
function sendInfoBackToUser(msg) {
    console.log("sendBack:")
    msg.reply('\nIt looks like: ' +
        '\nCaloriesIn ' + essentialCalories.CaloriesIn +
        '\nCaloriesOut ' + essentialCalories.CaloriesOut +
        '\nBudget ' + essentialCalories.Budget +
        '\nCarbs ' + essentialCalories.Carbs +
        '\nFat ' + essentialCalories.Fat +
        '\nProtein ' + essentialCalories.Protein
    )
}
// CaloriesIn
// CaloriesOut
// Budget
// Carbs
// Fat
// Protein

function getEssentials(data) {

    // !TODO add checks for other types of food logs such as Fitbit, LoseIt, etc.

    // if(FitBitLog)
    // !TODO add datasafe/error protections here
    for (const property in regexMatch) {
        console.log('here')
        let number = parseFloat(data.match(regexMatch[property])[0].replace(/\D/g, ''))
        console.log(number)
        if (property === 'Budget' && data.match(regexMatch[property])[0].includes('over')) {
            essentialCalories[property] = number.toString() + 'over'
        }
        else if (property === 'Budget' && data.match(regexMatch[property])[0].includes('under'))
            essentialCalories[property] = number.toString() + 'over'
        else
            essentialCalories[property] = number
    }
}

// Parse Saved Text Image
function findValuableInfo() {
    fs.readFile(filePaths.outFile, 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}

// processImageToText()
// module.exports.filePaths = filePaths;
module.exports = {
    filePaths,
    processImageToText,
    sendInfoBackToUser,
    findValuableInfo
};