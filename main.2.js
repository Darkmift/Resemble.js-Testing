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
          },
          // error: function(jqXHR, textStatus, errorThrown) {
          //     console.log('An error occurred... ', jqXHR, textStatus, errorThrown);
          // }
      });
  }
  console.log(existingFileArray);
  //now that we know all the exdisting filenames;
  var duplicateImages = {};
  //compare each existing index vs all others
  existingFileArray.forEach(element => {

      /***/
      // Object.keys(duplicateImages).map(function(key, index) {
      //     console.log(key)
      //     duplicateImages[key].map(function(item) {
      //         // if (item === element) {
      //         //     console.log('ERRORRR')
      //         // } else {
      //         //     // //assign a slot for each image in duplicates...those who have duplicate will not stay empty
      //         //     // duplicateImages[element] = [];
      //         //     // var comparable = `IMAGES/${existingFileArray[existingFileArray.indexOf(element)]}`;
      //         //     // var counter = existingFileArray.length - 1;
      //         //     // for (let index = 0; index < existingFileArray.length; index++) {
      //         //     //     compareCounterPart = `IMAGES/${existingFileArray[counter]}`;
      //         //     //     counter = counter - 1;
      //         //     //     if (String(comparable) !== String(compareCounterPart)) {
      //         //     //         fuckingComparator(comparable, compareCounterPart, duplicateImages[element]);
      //         //     //     }
      //         //     // }
      //         // }
      //     });
      // });
      /***/

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
  console.log('duplicateImages', duplicateImages);


  function fuckingComparator(comparable, compareCounterPart, param_array) {
      resemble(comparable)
          .compareTo(compareCounterPart)
          .ignoreColors()
          .onComplete(function(data) {
              //console.log(comparable, compareCounterPart, counter);
              // console.log(data.misMatchPercentage);
              if (data.misMatchPercentage < 1) {
                  console.log(comparable, compareCounterPart, param_array);
                  param_array.push(compareCounterPart);
              }
          });
  }

  // /***/
  // var file1 = 'IMAGES/1004.png';
  // var file2 = `IMAGES/${1005}.png`;
  // var diff = resemble(file1)
  //     .compareTo(file2)
  //     .ignoreColors()
  //     .onComplete(function(data) {
  //         console.log(data.misMatchPercentage);
  //     });

  //   if (!(
  //    duplicateImages.hasOwnProperty(comparable) &&
  //    duplicateImages[comparable].includes(compareCounterPart)
  // )) {}


  // duplicateImages.map(function(array) {
  //     if (array.includes("IMAGES/1005.png")) {
  //         alert('yes')
  //     }
  // });