var cl = console.log.bind(console);
// var fileCount = 500***should get amount of files in folder;
var fileCount = 100;
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
//init duplicate dupeArr and add keys with arrays.
var duplicateImages = [];
//compare each existing index vs all others
var ExistingfilesAmount = existingFileArray.length;
cl(existingFileArray)

for (let index = 0; index < ExistingfilesAmount; index++) {
    var a = existingFileArray[0],
        b = existingFileArray[1],
        imageA = `${path}${existingFileArray[0]}`,
        imageB = `${path}${existingFileArray[1]}`;
    if (
        //check array has indexes a and b
        ((typeof a != 'undefined' || a != null) &&
            (typeof b != 'undefined' || b != null))
    ) {
        comparePics(imageA, imageB, duplicateImages);
        //remove imageA index for next iteration
        var removeIndex = existingFileArray.indexOf(existingFileArray[0]);
        if (removeIndex > -1) {
            existingFileArray.splice(removeIndex, 1);
        }
    }
}
cl(duplicateImages)


function comparePics(comparable, compareCounterPart, dupeArr) {
    //console.log(comparable, compareCounterPart)

    resemble(comparable)
        .compareTo(compareCounterPart)
        .ignoreColors()
        .onComplete(function (data) {
            // if images are duplicates and NOT same file
            if (
                data.misMatchPercentage < 1
            ) {
                //set a key in duplicates
                if (typeof dupeArr[comparable] === 'undefined') {
                    var comparableExistsInDupes = dupeArr.findIndex(obj => obj.b.includes(comparable));
                    //cl(comparableExistsInDupes, comparable, dupeArr);
                    if (comparableExistsInDupes > -1) {
                        dupeArr[comparableExistsInDupes].b.push(compareCounterPart);
                    } else {
                        //comparable not in dupes
                        var duplicateOfOrigArr = [];
                        duplicateOfOrigArr.push(compareCounterPart);
                        dupeArr.push({
                            a: comparable,
                            b: duplicateOfOrigArr
                        });
                    }
                }
            }
        });
}





//dupeArrect.values(duplicateImages).filter((array)=>array.includes("IMAGES/1030.png"))
// dupeArrect.keys(duplicateImages).find(key => duplicateImages[key] === dupeArrect.values(duplicateImages).filter((array) => array.includes("IMAGES/1030.png")))
// pos = duplicateImages.map(function (e) {
//     return e.hello;
// }).indexOf('stevie');

// var comparableExistsInDupes = duplicateImages.map(function (obj) {
//     cl(obj.b, obj.b.indexOf("IMAGES/1030.png"));
//     return obj.b.indexOf("IMAGES/1030.png");
// }).indexOf("IMAGES/1030.png");

// index = duplicateImages.findIndex(obj => obj.b.includes("IMAGES/1030.png"));


// var comparableExistsInDupes = duplicateImages.filter(function (obj) {
//     cl(obj.b, obj.b.indexOf("IMAGES/1030.png"));
//     return obj.b.indexOf("IMAGES/1030.png");
// }).indexOf("IMAGES/1030.png");





//BU
// function comparePics(comparable, compareCounterPart, dupeArr) {
//     //console.log(comparable, compareCounterPart)

//     resemble(comparable)
//         .compareTo(compareCounterPart)
//         .ignoreColors()
//         .onComplete(function(data) {
//             // cl(dupeArrect.values(duplicateImages))
//             if (
//                 data.misMatchPercentage < 1 &&
//                 comparable != compareCounterPart &&
//                 typeof dupeArr[compareCounterPart] === 'undefined' || dupeArr[compareCounterPart] === null
//             ) {
//                 if (
//                     (typeof dupeArr[comparable] === 'undefined' ||
//                         dupeArr[comparable] === null) &&
//                     dupeArrect.values(dupeArr).filter((array) => array.includes(comparable)).length === 0
//                 ) {
//                     dupeArr[comparable] = [];
//                 }
//                 if (
//                     dupeArrect.keys(dupeArr).includes(compareCounterPart) === false &&
//                     (dupeArrect.values(dupeArr).filter((array) => array.includes(comparable)).length === 0 &&
//                         dupeArrect.values(dupeArr).filter((array) => array.includes(compareCounterPart)).length === 0)
//                 ) {
//                     //check if comparable matches existing key
//                     dupeArrect.keys(dupeArr).forEach((key) => {
//                         resemble(key)
//                             .compareTo(comparable)
//                             .ignoreColors()
//                             .onComplete(function(data) {
//                                 if (
//                                     data.misMatchPercentage < 1 &&
//                                     key != comparable &&
//                                     dupeArr[key].includes(comparable) === false
//                                 ) {
//                                     dupeArr[key].push(comparable);
//                                 } else {
//                                     if (dupeArr[comparable].includes(compareCounterPart) === false) {
//                                         dupeArr[comparable].push(compareCounterPart);
//                                     }
//                                 }
//                                 cl(dupeArr[key], dupeArr[comparable], key, comparable, compareCounterPart)
//                             })
//                     });
//                 };
//             }
//         });
// }