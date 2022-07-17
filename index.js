var first = document.getElementById("options-container");
var second = document.getElementById("chart-container");
var dragger = document.getElementById("dragger");

const drag = (e) =>{
    document.selection ? document.selection.empty() :
        window.getSelection().removeAllRanges();
    const height = window.innerHeight;
    const width = window.innerWidth;
    if (width > height)
    {
        first.style.width = (e.pageX - dragger.offsetWidth / 2 )+ 'px';
        second.style.width = (width - e.pageX - dragger.offsetWidth / 2 )+ 'px';
    }
    else if (window.innerWidth <= height)
    {
        first.style.height = height - e.pageY - (dragger.offsetHeight / 2) + 'px';
        second.style.width = (e.pageY - dragger.offsetWidth / 2 )+ 'px';
    }
}


dragger.addEventListener('mousedown', ()=>
    {
        document.addEventListener('mousemove', drag);
    });

dragger.addEventListener('mouseup', ()=>
    {
        document.removeEventListener('mousemove', drag);
    });


const chart_labels = {}
const charts ={};
// add new plot
const plot_label_input = document.getElementById('plot-label-input')
const plot_label_btn = document.getElementById('plot-label-btn')
const plot_list = document.getElementById('plot-list')
function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function append_chart()
{
    var new_label = plot_label_input.value;
    console.log("new label: " + new_label );
    if (isEmptyOrSpaces(new_label))
    {   // Do nothing
        console.log("Do nothing")
        return;
    }
    // chart_labels[plot_label_btn.innerHTML] = [];
    // const new_plot_menu = document.createElement('div');
    chart_labels[new_label] = document.createElement('div');
    chart_labels[new_label].classList.add("flex-vertical");
    let new_label_id = "menu-" + new_label;
    console.log("new_label_id: " + new_label_id)
    chart_labels[new_label].setAttribute('id', new_label_id);
    chart_labels[new_label].innerHTML='\
          <div class="flex-horizontal"> \
          <label>' + new_label + '</label> \
          <i class="fa fa-close" style="font-size:24;color:red"></i> \
          </div> \
          <div class="flex-horizontal"> \
          <label> x range: </label> \
          <input type="number" value="200" class="inline-input" /> \
          </div> \
          <div class="flex-horizontal"> \
          <label> y range: </label> \
          <div> \
            <input type="checkbox" value="true" /> \
            <label> Auto mode </label> \
          </div> \
          </div> \
          <div class="center-horizontal"> \
            <input type="number" value="0" class="inline-input"/> \
            <label> to </label> \
            <input type="number" value="200" class="inline-input"/> \
          </div>';
    chart_labels[new_label].addEventListener('click', ()=>{
        chart_labels[new_label].remove();
        delete chart_labels[new_label];
    });
    plot_list.appendChild(chart_labels[new_label]);
    console.log("new child added to menu")
    plot_label_input.value = '';
    // Add new chart on second panel
    // var chart_container = document.getElementById('chart-container')
    // var new_chart = document.createElement('canvas')
    // new_chart.classList.add('m')
};

    plot_label_btn.addEventListener("click", append_chart);
    plot_label_input.onkeypress = function (event)
    {
        if(event.keyCode ===  13){ // Press Enter
            event.preventDefault();
            append_chart();
        }
    }
