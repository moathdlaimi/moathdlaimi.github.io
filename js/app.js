$(() => {

  // ******************
  // ******************
  // ******************
  //this is harmless infinte loop to keep updating the time by the second
  let x = 0;
  const dateLoop = () => {
    setTimeout(function(){
      $('.date').html(Date());
      x++;
      if(x < 2){
        dateLoop()
      } else {
        x = 0;
        dateLoop();
      }

    },100)
  }
  dateLoop()

  // ******************
  // ******************
  // ******************

  $('.btn').on('click', (event) =>{
    event.preventDefault();


    if($(event.currentTarget).attr('id') === 'location' ){
    if ("geolocation" in navigator){
    	navigator.geolocation.getCurrentPosition(function(position){
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

          $.ajax({
            url:`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=80dd0dc92d5ff0e086d4ae0eeb8918a9`,

        }).then((data) => {

           let cit = data.name
           const kelvin = data.main.temp;
           const celsius = kelvin - 273;
           let fahrenheit = celsius * (9/5) + 32;
           let description = data.weather[0].description;
           let icon = data.weather[0].icon
           let kelvinMax = data.main.temp_max;
           let celsiusMax = kelvinMax - 273;
           let maxTemp = celsiusMax * (9/5) + 32;

           const $div = $('<div>').addClass('sub-reports').appendTo('.reports');
           const $img = $('<img>').attr(`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`).appendTo($div);
           const $h1 = $('<h1>').html(parseInt(fahrenheit)).addClass('h1temp').appendTo($div)
           const $p = $('<p>').html(description +'\n in '+ cit +' with a high of '+ parseInt(maxTemp)).addClass('paragraph').appendTo($div).hide().fadeIn(2000);



        },
        ()=>{
          console.log('error');
        })
    		});
    }else{
    	alret("Browser doesn't support geolocation!");
    }

  }
  else {
    let city = $('input[type="text"]').val()

    $.ajax({
      url:`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${city}&APPID=80dd0dc92d5ff0e086d4ae0eeb8918a9`,

  }).then((data) => {

     let cit = data.name
     const kelvin = data.main.temp;
     const celsius = kelvin - 273;
     let fahrenheit = celsius * (9/5) + 32;
     let description = data.weather[0].description;
     let icon = data.weather[0].icon
     let kelvinMax = data.main.temp_max;
     let celsiusMax = kelvinMax - 273;
     let maxTemp = celsiusMax * (9/5) + 32;

     const $div = $('<div>').addClass('sub-reports').appendTo('.reports');
     const $img = $('<img>').attr(`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`).appendTo($div);
     const $h1 = $('<h1>').html(parseInt(fahrenheit)).addClass('h1temp').appendTo($div)
     const $p = $('<p>').html(description +'\n in '+ cit+ ' with a high of '+ parseInt(maxTemp)).addClass('paragraph').appendTo($div).hide().fadeIn(2000);

  },
  ()=>{
    console.log('error');
  })


  }

})// event closing
// ******************
// ******************
// ******************
//this is the news banner loop

$.ajax({
  url:'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=eb5f2fddb8254262bfb0e34db0ba6f8d',
})
.then((data)=> {
  const $bannerdiv = $('.banner');
  let i = 0;
  const newsArray = ['first report','second report','third report']
  const newsLoop = () => {
    setTimeout(function(){
      // $bannerdiv.html(data.articles[i].title).fadeIn(1000);
      $bannerdiv.html(newsArray[i]).fadeIn(100);
      i++;
      if(i <= 2){
        newsLoop()
      } else {
        i = 0;
        newsLoop();
        // this will make it an infinte loop
      }

    },3000)
  }
  newsLoop()


},
()=> {
  console.log('News Server Down');
})


// ******************
// ******************
// ******************

}) //onload closing
