const {SerialPort, ReadlineParser} = require('serialport')

const { autoDetect } = require('@serialport/bindings-cpp');
const Binding = autoDetect();
var port;
function connect(){
    port = new SerialPort({
        path: '/dev/pts/3',
        baudRate: parseInt(document.getElementById("baudrate-selector").value),
    });
    port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
        }
    });

    const parser = port.pipe(new ReadlineParser())
    parser.on('data', function(dataInput){
        console.log('Data:', (dataInput));
        // Isso... ou talvez criar um evento
        // var data_obj = JSON.parse(dataInput);
        addData(parseInt(dataInput)); // look at myChart.js

    });
};
function close()
{
    port.close(() => {
     connected = false
        console.log("SerialPort closed")
    });
}

// Inicialize serialport select
var serialSelect = document.getElementById('serial-selector');

function checkPorts(){
    Binding.list().then((ports) =>
    {
        // Remove every Children
        while (serialSelect.firstChild) {
            serialSelect.removeChild(serialSelect.firstChild);}
        console.log("All children removed");
        ports.forEach(function (port)
        {
            // console.log('Port: ' + port.path);
            const option = document.createElement('option');
            option.innerHTML = port.path;
            // console.log("hasChildNodes: " + serialSelect.hasChildNodes());
            serialSelect.appendChild(option);
        });
    },
        (fail) => {
            console.log("No ports are available.")
        });
};
checkPorts();

// Event for Run/stop button
var runBtn = document.getElementById('run-stop');
runBtn.addEventListener("click", function(){
    if (runBtn.innerHTML == "Run")
    {
        runBtn.innerHTML = "Stop";
        // Initialize data capture
        connect();
    }else
    {
        runBtn.innerHTML = "Run";
        // Stops data capture
        close();
    }
});

// Worker for serialportfunction startWorker() {
// var w;
//   if(typeof(Worker) !== "undefined") {
//     if(typeof(w) == "undefined") {
//       w = new Worker("demo_workers.js");
//     }
//     w.onmessage = function(event) {
//       document.getElementById("result").innerHTML = event.data;
//     };
//   } else {
//     document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
//   }
// }

// function stopWorker() {
//   w.terminate();
//   w = undefined;
// }

var timerSerial = setInterval(checkPorts, 10000);
