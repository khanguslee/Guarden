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

function render_temp_chart(sensor_data_array){
    var date_array = [];
    var temp_array = [];

    for(var i=0; i<sensor_data_array.length; i++){
        var data_entry = sensor_data_array[i]
        var sensor_data = JSON.parse(data_entry.sensor_data);
        date_array.push(data_entry.date + ' ' + data_entry.time);
        temp_array.push(sensor_data.temperature);
    }

    var options = {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 30 === 0 ? value : null;
          }
        }
    };

    Chartist.Line(".temp-chart", {
        labels: date_array,
        series: [temp_array]
      }, options);
}

function render_humidity_chart(sensor_data_array){
    var date_array = [];
    var humid_array = [];

    for(var i=0; i<sensor_data_array.length; i++){
        var data_entry = sensor_data_array[i]
        var sensor_data = JSON.parse(data_entry.sensor_data);
        date_array.push(data_entry.date + ' ' + data_entry.time);
        humid_array.push(sensor_data.humidity);
    }

    var options = {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 30 === 0 ? value : null;
          }
        }
    };

    Chartist.Line(".humid-chart", {
        labels: date_array,
        series: [humid_array]
      }, options);
}

function render_soil_chart(sensor_data_array){
    var date_array = [];
    var soil_array = [];

    for(var i=0; i<sensor_data_array.length; i++){
        var data_entry = sensor_data_array[i]
        var sensor_data = JSON.parse(data_entry.sensor_data);
        date_array.push(data_entry.date + ' ' + data_entry.time);
        soil_array.push(sensor_data.soil);
    }

    var options = {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 30 === 0 ? value : null;
          }
        }
    };

    Chartist.Line(".soil-chart", {
        labels: date_array,
        series: [soil_array]
      }, options);
}

var options = { method: 'GET', headers:{"Content-Type": "application/json"}};
fetch('http://guarden.herokuapp.com/api/sensor', options
).then((response) => {
    return response.json();
  })
  .then((output_json) => {
      console.log(output_json);
    render_temp_chart(output_json);
    render_humidity_chart(output_json);
    render_soil_chart(output_json);
  });





