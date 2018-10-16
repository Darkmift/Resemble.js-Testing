  // var fileCount = 500;
  var fileCount = 50;
  var arrayCount = 0;
  var existingFileArray = [];
  for (let index = 0; index < fileCount; index++) {

      $.ajax({
          type: "GET",
          url: `IMAGES/${1000+index}.png`,
          async: false,
          success: function(response) {
              existingFileArray[arrayCount] = `${1000+index}.png`;
              arrayCount++;
          }
      });
  }
  console.log(existingFileArray);
  //now that we know all the exdisting filenames;
  var duplicateImages = {};
  existingFileArray.forEach(element => {

      duplicateImages_ArrayIndex = element.split('.')[0];
      duplicateImages[duplicateImages_ArrayIndex] = [];
      //console.log(element, duplicateImages[element.split('.')[0]]);
      $.ajax({
          type: "GET",
          url: `IMAGES/${element}`,
          async: false,
          success: function(response) {
              var counter = 1;
              for (let index = 0; index < existingFileArray.length; index++) {
                  var comparable = `IMAGES/${existingFileArray[index]}`;
                  var compareToFile = `IMAGES/${existingFileArray[index+counter]}`;
                  counter++;
                  console.log(comparable, compareToFile);
                  resemble(comparable)
                      .compareTo(compareToFile)
                      .ignoreColors()
                      .onComplete(function(data) {
                          //console.log(data.misMatchPercentage);
                          if (data.misMatchPercentage < 1) {
                              duplicateImages.duplicateImages_ArrayIndex.duplicates.push(compareToFile);
                          }
                          // console.log(duplicateImages);
                      });
              }
          }
      });
  });
  //console.log(duplicateImages);

  /***/
  var file1 = 'IMAGES/1004.png';
  var file2 = `IMAGES/${1005}.png`;
  var diff = resemble(file1)
      .compareTo(file2)
      .ignoreColors()
      .onComplete(function(data) {
          console.log(data.misMatchPercentage);
      });