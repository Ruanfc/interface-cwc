const {SerialPort} = require('serialport');

const serialport = new SerialPort({
    path: '/dev/pts/1',
    baudRate: 9600,
});

// Inicialize serialport select
var serialSelect = document.getElementById('serial-selector');

SerialPort.list().then((ports) =>
{
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


// Event for Run/stop button
var runBtn = document.getElementById('run-stop');
runBtn.addEventListener("click", function(){
    if (runBtn.innerHTML == "Run")
    {
        runBtn.innerHTML = "Stop";
        // Initialize data capture
    }else
    {
        runBtn.innerHTML = "Run";
        // Stops data capture
    }
});
