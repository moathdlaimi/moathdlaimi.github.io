
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
            url:`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=80dd0dc92d5ff0e086d4ae0eeb8918a9`,

        }).then((data) => {

           let cit = data.name
           const kelvin = data.main.temp;
           const celsius = kelvin - 273;
           let fahrenheit = celsius * (9/5) + 32;
           const $p = $('<p>').html(`The temperature in ${cit} is ${parseInt(fahrenheit)}`).addClass('paragraph').appendTo('.reports');


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
      url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=80dd0dc92d5ff0e086d4ae0eeb8918a9`,

  }).then((data) => {

     let cit = data.name
     const kelvin = data.main.temp;
     const celsius = kelvin - 273;
     let fahrenheit = celsius * (9/5) + 32;
     const $p = $('<p>').html(`The temperature in ${cit} is ${parseInt(fahrenheit)}`).addClass('paragraph').appendTo('.reports');



  },
  ()=>{
    console.log('error');
  })



  }



})// event closing

}) //onload closing
