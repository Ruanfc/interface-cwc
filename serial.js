const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')


var port;
function connect(){
    port = new SerialPort({
        path: '/dev/pts/1',
        baudRate: document.getElementById("baudrate-selector").innerHTML,
    });
};
function close()
{
    serialport.close(() => {
     connected = false
     sh.success('disconnected.')
     em.emit('disconnect')
     resolve()
    });
}

// Inicialize serialport select
var serialSelect = document.getElementById('serial-selector');

function checkPorts(){
    SerialPort.SerialPort.list().then((ports) =>
    {
        // Remove every Children
        while (ports.firstChild) {
            ports.removeChild(ports.firstChild);}
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

//Todo:
// serialport.on('data', function (data) {
//   console.log('Data: ' + data);
// });


// const parser = port.pipe(new Readline());

// const parser = new Readline();
// port.pipe(parser);

// parser.on('data', (line) =>
//     {
//         console.log(line);
//         // window.graph1.incData(Number(line));
//         // window.graph2.incData(100 - Number(line));
//     });

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)
