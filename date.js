(function(){
    date = new Date(),
    dayofweek = date.getDay(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear();

    var pdayo = document.getElementById('dayofweek'),
    var pday = document.getElementById('day'),
    var pmonth = document.getElementById('month'),
    var pyear = document.getElementById('year');
    var week = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    pdayo.textContent = week[dayofweek];
    pday.textContent = day
    

    })
