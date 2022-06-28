  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
      document.getElementById('myChart'),
      config
  );

// Event listener
window.addEventListener("myTestEvent", (value) => {
  let label_array = myChart.data.labels;
  label_array.push(value.detail);
  myChart.data.labels = label_array.slice(1);
  let data_array = myChart.data.datasets[0].data;
  data_array.push(value.detail);
  myChart.data.datasets[0].data = data_array.slice(1);
  myChart.update();
});


// Save png
pngBtn = document.getElementById("png-button");
let fileNamePNG = "data.png";
pngBtn.addEventListener("click", function(){
  console.log("Saving to file: " + fileNamePNG);
  // download(myChart.toBase64Image(),
  //          fileNamePNG, "image/png");
  let buff = new Buffer.from(myChart.toBase64Image(), 'base64');
  fs.writeFileSync(fileNamePNG, buff);

});

// Save csv
var fs = require('node:fs');
let fileNameCSV = "data.csv";
csvBtn = document.getElementById("csv-button");
csvBtn.addEventListener("click", function(){
  // let table = myChart.data.labels.map(function (value, index){
  //   return [value, myChart.data.datasets[0].data[index]];
  // });
  let data = "";
  myChart.data.labels.forEach(function(value,index){
    data += (value + ',' + myChart.data.datasets[0].data[index] + "\r\n");
  })

  console.log("Saving to file: " + fileNameCSV);
  fs.writeFile(fileNameCSV, data, function (err, file){
    if (err) throw err;
    console.log('Saved!');
  });
});

//equal_x_and_y
function equal_x_and_y(x, y)
{
  if (x.length() > y.length()) {
    while (x.length() > y.length()) {x.shift();}};
  if (x.length() < y.length()) {
    while (x.length() < y.length()) {y.shift();}};
};
