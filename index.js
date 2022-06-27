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

