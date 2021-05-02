// DON'T USE THIS FILE FOR ANYTHING, THIS WAS ONLY TO TEST SMALLER PARTS OF CODE INSTEAD OF USING THE BOT





let fs = require('fs');
let tesseract = require('node-tesseract-ocr')

const filePaths = {
    imgSavePath: './img/FitBitLogTemp.jpg',
    outFile: './img/FitBitLog.txt'
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

let sections = [
    `TODAY`,
    `MACRONUTRIENTS`,
    `NUTRITION FACTS`,
    `DINNER`,
    `AFTERNOON SNACK`,
    `LUNCH`,
    `MORNING SNACK`,
    `BREAKFAST`
]
let sectionMap = new Map()


// Parse Saved Text Image
function findValuableInfo() {
    fs.readFile(filePaths.outFile, 'utf8', function (err, data) {
        if (err) throw err;
        getEssentials(data)
        // console.log(data);
    });
}

function getEssentials(data) {
    for (const property in regexMatch) {
        // console.log(`${property} : `);
        let number = parseFloat(data.match(regexMatch[property])[0].replace(/\D/g, ''))
        console.log(number)
        if (property === 'Budget' && data.match(regexMatch[property])[0].includes('over')) {
            essentialCalories[property] = number.toString() + 'over'
        }
        else if (property === 'Budget' && data.match(regexMatch[property])[0].includes('under'))
            essentialCalories[property] = number.toString() + 'over'
        else
            essentialCalories[property] = number
        // console.log(number) // replace non numbers with nothing, parse float
    }
}

function getSections(data) {
    sections.forEach(function (item, index) {
        console.log("Current: " + item);
        data.indexOf(item)

        var startindex = data.indexOf(item);
        if (sections.length - 1 === index)
            var endindex = data.length;
        else
            var endindex = data.indexOf(sections[index + 1], startindex);
        console.log("startindex: " + startindex);
        console.log("endindex: " + endindex);

        console.log('*******START DATA*********')
        if (startindex != -1 && endindex != -1 && endindex > startindex) {
            console.log(data.substring(startindex, endindex))
            console.log('******')
            console.log(data.match(item + "(.*?)" + sections[index + 1]))
        }
        console.log('********END********')
        // data.indexOf(item)

        // console.log("Next: " + ((sections.length - 1 === index) ? "END" : sections[index + 1]));
        // data.substr(addy, 0, index(addy, '.'))
        // sectionMap.set(item,)
    })
}

function arrayMapPair(data) {
    regexMatch.forEach(element => {
        // data.substr(addy, 0, index(addy, '.'))
        // keywordMap.set(element,)
    })
}

findValuableInfo()
// arrayMapPair()
