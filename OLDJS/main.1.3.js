var cl = console.log.bind(console);
// var fileCount = 500***should get amount of files in folder;
var fileCount = 10;
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

//now that we know all the exdisting filenames;
//init duplicate obj and add keys with arrays.
var duplicateImages = {};
//compare each existing index vs all others

/****/
//var fileCount = 20;
var loop = 0;
var minID = 0;
for (let i = 0; i < existingFileArray.length; i++) {
    for (let j = 0; j < existingFileArray.length; j++) {
        //console.log(`${path}${existingFileArray[minID]}`, `${path}${existingFileArray[j]}`, j, i)
        compareImages(`${path}${existingFileArray[minID]}`, `${path}${existingFileArray[j]}`, duplicateImages);
        // iterator < existingFileArray.length ? iterator++ : '';
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
                comparable != compareCounterPart
            ) {
                if (typeof obj[comparable] === 'undefined' && obj[comparable] === null && !obj[comparable]) {
                    obj[comparable] = [];
                }
                cl(Object.keys(obj).includes(compareCounterPart) === false)
                if (Object.keys(obj).includes(compareCounterPart) === false) {

                    // cl(
                    //     // 'values', Object.values(obj),
                    //     'keys:', Object.keys(obj),
                    //     'find:', Object.keys(obj).find(function (key) {
                    //         cl('key find:', key, 'obj[key]:', obj[key])
                    //         return obj[key].includes(compareCounterPart)
                    //     }),
                    //     'compareCounterPart',
                    //     compareCounterPart
                    // )
                    obj[comparable].push(compareCounterPart)
                };
                //console.log(comparable, compareCounterPart)
            }
        });
}