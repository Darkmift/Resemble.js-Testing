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

var base64Array = [];
for (let index = 0; index < existingFileArray.length; index++) {
    var imageBase64 = new Image();
    imageBase64.src = `${path}${existingFileArray[index]}`;
    // cl(imageBase64);
    base64Array.push({
        'src': imageBase64.src.split(path)[1],
        'hash': toDataURL(imageBase64.src)
    });
}

cl('base64Array', base64Array);

var hashArray = base64Array.map((obj) => obj.hash);
cl('hashArray', hashArray);

// usage example:
var unique = hashArray.filter(onlyUnique);

cl('unique', unique);





function toDataURL(url) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then(blob => {
            return URL.createObjectURL(blob);
        });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}