$(document).ready(function(){
    $.getJSON("http://localhost:3000/flightenquiry/fetchallcities",function(data){
        data.result.map((item)=>{
            $('#sourcecity').append($('<option>').text(item.cityname).val(item.cityid))
            $('#destinationcity').append($('<option>').text(item.cityname).val(item.cityid))

        })
    })
})