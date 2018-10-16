  // var fileCount = 500;
  var fileCount = 20;
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
  //compare each existing index vs all others
  existingFileArray.forEach(element => {

      //assign a slot for each image in duplicates...those who have duplicate will not stay empty
      duplicateImages[element] = [];
      var comparable = `IMAGES/${existingFileArray[existingFileArray.indexOf(element)]}`;
      var counter = existingFileArray.length - 1;
      for (let index = 0; index < existingFileArray.length; index++) {
          compareCounterPart = `IMAGES/${existingFileArray[counter]}`;
          counter = counter - 1;
          if (String(comparable) !== String(compareCounterPart)) {
              fuckingComparator(comparable, compareCounterPart, duplicateImages[element]);
          }
      }
  });

  function fuckingComparator(comparable, compareCounterPart, param_array) {


      resemble(comparable)
          .compareTo(compareCounterPart)
          .ignoreColors()
          .onComplete(function(data) {
              var comparable_key = comparable.split("/")[1];
              var compareCounterPart_key = compareCounterPart.split("/")[1];

              if (typeof Object.values(duplicateImages[comparable_key])[0] === 'string') {
                  console.log(duplicateImages[comparable_key], compareCounterPart)
                  if (Object.values(duplicateImages[comparable_key])[0] === compareCounterPart) {
                      console.log(Object.values(duplicateImages[comparable_key])[0])
                  }
              }

              if (data.misMatchPercentage < 1) {
                  param_array.push(compareCounterPart);
              }
          });
  }