var cl = console.log.bind(console);
// var fileCount = 500***should get amount of files in folder;
var fileCount = 50;
var path = 'IMAGES/';
var arrayCount = 0;
var existingFileArray = [];
//loop from lowest id up until file count and log into array existing filenames.
for (let index = 0; index <= fileCount; index++) {
    $.ajax({
        type: "GET",
        url: `${path}${1000+index}.png`,
        async: false,
        success: function (response) {
            existingFileArray[arrayCount] = `${1000+index}.png`;
            arrayCount++;
        }
    });
}

//now that we know all the existing filenames;
//init duplicate obj and add keys with arrays.
var duplicateImages = {};
//compare each existing index vs all others

/****/
//var fileCount = 20;
var loop = 0;
var minID = 0;
for (let i = 0; i < existingFileArray.length; i++) {
    for (let j = 0; j < existingFileArray.length; j++) {
        var imageA = `${path}${existingFileArray[minID]}`;
        var imageB = `${path}${existingFileArray[j]}`;
        // Object.keys(duplicateImages).includes(imageA) ||
        //     Object.keys(duplicateImages).includes(imageB) ?
        //     // cl(Object.keys(duplicateImages).includes(imageA) ||
        //     //     Object.keys(duplicateImages).includes(imageB)) /**if they are do nothing **/ :
        //     '' :
        compareImages(imageA, imageB, duplicateImages);
    }
    minID < existingFileArray.length ? minID++ : '';
}

/****/

function compareImages(comparable, compareCounterPart, obj) {
    //console.log(comparable, compareCounterPart)
    resemble(comparable)
        .compareTo(compareCounterPart)
        .ignoreColors()
        .onComplete(function (data) {
            //console.log(comparable, compareCounterPart, obj);
            if (
                data.misMatchPercentage < 1 &&
                comparable != compareCounterPart &&
                typeof obj[compareCounterPart] === 'undefined' || obj[compareCounterPart] === null
            ) {
                cl(data)
                if (typeof obj[comparable] === 'undefined' || obj[comparable] === null) {
                    obj[comparable] = [];
                }
                if (
                    Object.keys(obj).includes(compareCounterPart) === false
                ) {
                    obj[comparable].push(compareCounterPart)
                };
            }
        });
}