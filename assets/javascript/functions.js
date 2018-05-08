
// VARIABLES:
//     SEARCH API
//     SEARCH QUERY
var apiButtons = {
    giphy : [],
    omdb : [],
    api2 : []
};

var apiIndex = {
    giphy : {
        url : "http://api.giphy.com/v1/gifs/search?",
        query : "q",
        parameters : {
            apiKey : "ih2IbJeuF1j03d7wJ5MpKRi13l3cXBAp",
            limit : "100"
        }
    },
    omdb : {
        url: "http://www.omdbapi.com/?",
        query: "t",
        parameters : {
            apikey : "817c84de"
        }
    },
    api2 : {


    }
}
//     VAR APIINDEX = {
//         API {
//             BASE URL : "",
//             PARAMETERS : {

//             }

//         }
//     }

//     ADDED BUTTONS
//     CLEAR BUTTONS


//     WHEN ADD BUTTON IS CLICKED
//         VAR API = THIS.ATTR(DATA-API)
//         NEW BUTTON IS CREATED 
//         DATA-API IS ADDED
//         DATA API SET TO EQUAL SELECTED RADIO BUTTON
//         FUNCTION APPENDBUTTON(API)
//             BUTTON IS APPENED TO SECTION WITH CLASS "buttons-" + X
function addButton(event){
    event.preventDefault();
    var query = $(".add-input").val();
    var api = $("input[name=API]:checked").attr("data-api");
    var apiArr = apiButtons[api];
    var used = false;

    for(var i = 0; i < apiArr.length; i++){
        if(query == apiArr[i]){
            alert("Already added!");
            return;
        }
    }

    if(query){
        var apiButton =$("<button>").attr({"class": 'search '+ api +"-search" , "data-api" : api}).text(query);
        $(".button-bank.buttons-" + api).prepend(apiButton);
        console.log(apiButton);
        apiButtons[api].push(query);
        $(".add-input").val("");
    } else {
        alert("Please add a value");
    }
}



//     WHEN CLEAR BUTTON IS CLICKED
//         FUNCTION CLEAR DIV
//             THIS.PARENT EMPTY
//             CORRESPONDING ARRAY CLEARED
                
function random(array){
    return Math.floor(Math.random()*array.length)
}  
function placeholderText () {
    if($(this).attr("data-api") === "giphy"){
        $(".add-input").attr("placeholder", "Add a GIF button");
    } else if ($(this).attr("data-api")  === "omdb"){
        $(".add-input").attr("placeholder", "Down for maintenance");
        console.log("omdb");
    }
}

function clearContainer(){
    var api = $(this).attr("data-api");
    var target = $(this).attr("data-target");
    //eval($(this).attr("data-object"))[api] = [];
    $("."+target+"-"+api).empty();
    console.log(target);
}
function animate(){
    if($(this).attr("data-toggle") === "still"){
        $(this).attr({"src": $(this).attr("data-animate"), "data-toggle" : "animate"});
    } else {
        $(this).attr({"src": $(this).attr("data-still"), "data-toggle" : "still"});
    }
}

function apiSearch(){
    var api = $(this).attr("data-api");
    var querySearch = $(this).text();
    var query = apiIndex[api].query;
    apiIndex[api].parameters[query] = querySearch;
    var queryURL = apiIndex[api].url + $.param(apiIndex[api].parameters);
    console.log(queryURL);

    $.ajax({
        url : queryURL,
        method : "get"
    }).then(function (response){
        var data = response.data;
        console.log(data)
        for(var i = 0; i<10; i++){
            var card = $("<div class='card " +api +"-card'>").attr("data-api",api);
            var j = random(data);
            var imgWrap = $("<div class='img-wrap'>");
            var infoWrap = $("<div class='info-wrap'>").html('<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.29 73.29"><defs><style>.cls-1{fill:#1a1a1a;stroke:#fff;stroke-miterlimit:10;}</style></defs><title>Untitled-1</title><path class="cls-1" d="M86.15,50A36.15,36.15,0,1,1,50,13.85,36.16,36.16,0,0,1,86.15,50Zm-18.1-3.87H54V32.07a4,4,0,1,0-8,0V46.13H32a4,4,0,1,0,0,8H46V68.18a4,4,0,0,0,8,0V54.13h14a4,4,0,0,0,0-8Z" transform="translate(-13.35 -13.35)"/></svg>');
            
            card.append(imgWrap,infoWrap);



            if(api == "giphy"){
                var img = $("<img class='gif'>").attr({"src" : data[j].images.fixed_height_still.url , "data-animate" : data[j].images.fixed_height.url, "data-still" : data[j].images.fixed_height_still.url, "data-toggle" : "still"});
                imgWrap.append(img);
            }


            $(".main-bank").prepend(card);
            data.splice(j,1);
            console.log("hi");
        }
    });



}
$("body").on("click", "input[name=API]", placeholderText);
$("body").on("click", ".search", apiSearch);
$("body").on("click", ".clear-button", clearContainer);
$("body").on("click", ".add-button", addButton);
$("body").on("click", ".gif", animate);
$("body").on("click", "svg", addFavorite);


//     WHEN API BUTTTON IS CLICKED
//         FUNCTION CALLAPI (THIS.ATTR(DATA-API))
//             PULLS API INFO FROM SECTION OF APIINDEX OBECT THAT MATCHES FUNCTION PARAMETER

//             FUNCTION (RESPONSE){
//                 FOR I < 10  APPENDS API OBJECT INFO FOR FIRST 10 RESULTS
//                     IF API = X (
//                         CREATE HTML TAGS THAT POPULATE WITH X DATA

//                     )
//                     IF API = Y (
//                         CREATE HTML TAGS THAT POPULATE WITH Y DATA

//                     )
        
//             }
    
//     IF CARD IS CLICKED
//             FUNCTION ADD TO FAVORITES
//                 CLONE HTML VALUE OF "THIS"
//                 PREPEND "THIS" IN FAVORITES
    function addFavorite(){
        var card = $(this).parent().parent();
        $(".favorites-bank").prepend(card);
    }
        




