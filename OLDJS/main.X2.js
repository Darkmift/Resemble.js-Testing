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
var duplicateImages = [];
//compare each existing index vs all others

var ExistingfilesAmount = existingFileArray.length;
cl(existingFileArray)

for (let i = 0; i < ExistingfilesAmount; i++) {
    var imageA = `${path}${existingFileArray[i]}`;

    for (let j = 0; j < existingFileArray.length; j++) {
        var imageB = `${path}${existingFileArray[j]}`;
        if (imageA != imageB) {
            compareImages(imageA, imageB, duplicateImages)
        }
    }
    var removeIndex = existingFileArray.indexOf(existingFileArray[0]);
    if (removeIndex > -1) {
        existingFileArray.splice(removeIndex, 1);
    }
}

function compareImages(comparable, compareCounterPart, arrDupes) {
    //console.log(comparable, compareCounterPart)
    resemble(comparable)
        .compareTo(compareCounterPart)
        .ignoreColors()
        .onComplete(function (data) {
            if (
                data.misMatchPercentage < 1
            ) {
                arrDupes.push({
                    comparable: compareCounterPart
                })
            }
        });
}