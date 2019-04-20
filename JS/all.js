// 記錄地圖資訊
var map;
// 紀錄從遠端撈下來的資料
var data;
//記錄目前載入的 marker
var markers = [];
//記錄當前點擊 google window
var currentInfoWindow = '';

//載入地圖資訊
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 23.858906, lng: 120.918994 },
    mapTypeControlOptions: {
      //style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    //定義地圖樣式
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4f2700"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#603000"
          },
          {
            "weight": 6.5
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  });
  //圖例legend
  var legend = document.getElementById('mapLegend');
  var ul = document.createElement('ul');
  ul.innerHTML = `
       <li>圖例</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png">良好</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png">普通</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png">對敏感族群不健康</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/red-dot.png">對所有族群不健康</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png">非常不健康</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png">危害</li>
       <li><img src="http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png">設備維護
       `;
  legend.appendChild(ul);
  //Push Legend to LEFT BOTTOM
  map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

  //navbar position 
  var nav = document.getElementById('nav');
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(nav);
  //取得遠端資料並渲染
  getData();
}
function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', 'https://cors-anywhere.herokuapp.com/http://opendata2.epa.gov.tw/AQI.json');
  //https://cors-anywhere.herokuapp.com/http://opendata2.epa.gov.tw/AQI.json  
  xhr.send(null);
  xhr.onload = function () {
    data = JSON.parse(xhr.responseText);
    console.log(data);
    for (var i = 0; i < data.length; i++) {

      loadData(data[i].Latitude, data[i].Longitude, data[i].SiteName,
        `${data[i].County}-${data[i].SiteName}
<span style="background-color:${filterColor(data[i].Status)};">color bar</span><br>        
        AQI：${data[i].AQI}-${data[i].Status}<br>
        <strong>細懸浮微粒</strong><small>PM2.5(μg/m3)</small>：${data[i]['PM2.5']}<br>
        <strong>懸浮微粒</strong><small>PM10(μg/m3)</small>：${data[i]['PM10']}<br>
        <strong>臭氧</strong><small>O3(ppb)</small>：${data[i].O3}<br>
        <strong>一氧化碳</strong><small>CO(ppm)</small>：${data[i].CO}<br>
        <strong>二氧化硫</strong><small>SO2(ppb)</small>：${data[i].SO2}<br>
        <strong>二氧化氮</strong><small>NO2(ppb)</small>：${data[i].NO2}
        `, data[i].PublishTime, filterColor(data[i].Status));
    }
    //過濾縣市
    let county = [];
    let str = '';
    let str2 = '';
    data.forEach(function (el) {
      county.push(el.County);
    })
    console.log(county);
    county.filter(function (item, index, arr) {
      if (arr.indexOf(item) === index) {
        console.log(item);
        str = `<option value="請選擇縣市">請選擇縣市</option>`;
        str2 += `<option value="${item}">${item}</option>`;
        area2.innerHTML = str + str2;
      }
    })

  }
}
//color bar
function filterColor(status) {
  //console.log(data);
  for (var i = 0; i < data.length; i++) {
    if (status == '良好') {
      return 'green';
    } else if (status == '普通') {
      return 'yellow';
    } else if (status == '對敏感族群不健康') {
      return 'orange';
    } else if (status == '對所有族群不健康') {
      return 'red';
    } else if (status == '非常不健康') {
      return 'purple';
    } else if (status == '危害') {
      return 'blue';
    } else { return 'ltblue'; }
  }
}

// 變更地區，並進行監聽
var area2 = document.querySelector('.area2');
area2.addEventListener('change', changeArea);
function changeArea(e) {
  // 清除資料
  for (i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  infoWindows = [];
  // 載入資料
  for (var i = 0; i < data.length; i++) {
    if (data[i].County == e.target.value || '請選擇縣市' == e.target.value) {

      loadData(data[i].Latitude, data[i].Longitude, data[i].SiteName,
        `${data[i].County}-${data[i].SiteName}
<span style="background-color:${filterColor(data[i].Status)};">color bar</span><br>        
        AQI：${data[i].AQI}-${data[i].Status}<br>        
        <strong>細懸浮微粒</strong><small>PM2.5(μg/m3)</small>：${data[i]['PM2.5']}<br>
        <strong>懸浮微粒</strong><small>PM10(μg/m3)</small>：${data[i]['PM10']}<br>
        <strong>臭氧</strong><small>O3(ppb)</small>：${data[i].O3}<br>
        <strong>一氧化碳</strong><small>CO(ppm)</small>：${data[i].CO}<br>
        <strong>二氧化硫</strong><small>SO2(ppb)</small>：${data[i].SO2}<br>
        <strong>二氧化氮</strong><small>NO2(ppb)</small>：${data[i].NO2}
        `, data[i].PublishTime, filterColor(data[i].Status));
    }

  }
}

function loadData(lat, lng, title, txt, time, colorMarker) {
  //infowindow
  var infowindow = new google.maps.InfoWindow({
    content: txt
  });
  //publish time
  document.querySelector('#time').innerHTML = `更新時間：${time}`;
  //colorMarker  
  var url = "http://maps.google.com/mapfiles/ms/icons/";
  url += colorMarker + "-dot.png";

  var marker = new google.maps.Marker({
    position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    title: title,
    map: map,
    icon: {
      url: url
    },
  });
  marker.addListener('click', function () {
    if (currentInfoWindow != '') {
      currentInfoWindow.close();
      currentInfoWindow = '';
    }
    infowindow.open(map, marker);
    currentInfoWindow = infowindow;
  });
  markers.push(marker);
}



