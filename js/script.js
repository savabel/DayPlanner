function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
    
        // creating a a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // creatting the e a column
        var firstcol = $('<div class="col-sm-2"> <p class="hour">' + formatTime(i) + '</p>');

        //create column 2
        var sndcol = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
       
        //create column 3
        var thirdcol = $(`<div class="col-sm-2"><button class="RecordBtn" id=${i}><i class="fas fa-save"></i></button>`)
        
        // append col to row
        row.append(firstcol);
        row.append(sndcol);
        row.append(thirdcol);

        // last step add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }

    function formatTime(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatTime();

function updateColors(){
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) { 
        console.log(currentTime, $(`#${i}`).data("time"));
         if ($(`#${i}`).data("time") == currentTime){
            $(`#text${i}`).addClass( "present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
        }
    }
}

setInterval(function() {
    updateColors();
}, 1000);

var RecordBtn = $('.RecordBtn');
RecordBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});