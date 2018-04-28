function refresh(node)
{
   var times = 10000; // gap in Milli Seconds;

   (function startRefresh()
   {
      var address;
      if(node.src.indexOf('?')>-1)
       address = node.src.split('?')[0];
      else 
       address = node.src;
      node.src = address+"?time="+new Date().getTime();

      setTimeout(startRefresh,times);
   })();

}

window.onload = function()
{
  var node = document.getElementById('main-image');
  refresh(node);
  // you can refresh as many images you want just repeat above steps
}

var options = { method: 'GET', headers:{"Content-Type": "application/json"}};
fetch('http://guarden.herokuapp.com/api/sensor', options
).then((response) => {
    console.log(response);
}).then((response) => {
    console.log(response);
    const reader = body;
});



var ctx_temp_chart = document.getElementById("temp_chart");
var temp_line_chart = new Chart(ctx_temp_chart, {
    type: 'line',
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [{
        label: 'apples',
        data: [12, 19, 3, 17, 6, 3, 7],
        backgroundColor: "rgba(153,255,51,0.4)"
      }, {
        label: 'oranges',
        data: [2, 29, 5, 5, 2, 3, 10],
        backgroundColor: "rgba(255,153,0,0.4)"
      }]
    }
  });