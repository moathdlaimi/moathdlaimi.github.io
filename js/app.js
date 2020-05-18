
// *************
// *************
$(() => {

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
           const $p = $('<p>').html(`The temperature in ${cit} is ${parseInt(fahrenheit)} fahrenheit \n with ${description} `).addClass('paragraph').appendTo('.reports').hide().fadeIn(2000);
           const $img = $('<img>').attr(`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`).appendTo('.reports');


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
     const $p = $('<p>').html(`The temperature in ${cit} is ${parseInt(fahrenheit)} fahrenheit \n with ${description}`).addClass('paragraph').appendTo('.reports').hide().fadeIn(2000);
     const $img = $('<img>').attr(`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`).appendTo('.reports');

       // ****************







  },
  ()=>{
    console.log('error');
  })



  }



})// event closing

}) //onload closing
