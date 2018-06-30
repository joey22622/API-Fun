
//=====================  GLOBAL VARIABLES ==========================
var apiButtons = {
    giphy : [],
    omdb : [],
};

var apiIndex = {
    giphy : {
        url : "https://api.giphy.com/v1/gifs/search?",
        query : "q",
        parameters : {
            apiKey : "ih2IbJeuF1j03d7wJ5MpKRi13l3cXBAp",
            limit : "100"
        }
    },
    omdb : {
        url: "https://www.omdbapi.com/?",
        query: "t",
        parameters : {
            apikey : "817c84de"
        }
    }
}

//=====================  CALLBACKS ==========================

//limits the length of string
function stringLimit(str, max){
    let newStr = "";
    if(str.length > max){
        newStr = str.substring(0,max) + "...";
    } else {
        newStr = str;
    }
    return newStr;
}

//grabs random index of array
function random(array){
    return Math.floor(Math.random()*array.length)
}  


// adds button to section that matches the active radio button
function addButton(event){
    event.preventDefault();
    var query = $(".add-input").val();
    var api = $("input[name=API]:checked").attr("data-api");
    var apiArr = apiButtons[api];
// checks if this button has already been added
    for(var i = 0; i < apiArr.length; i++){
        if(query == apiArr[i]){
            alert("Already added!");
            return;
        }
    }
//if user enters info, 
    if(query){
        var apiButton =$("<button>").attr({"class": 'search '+ api +"-search" , "data-api" : api}).text(query);
        $(".button-bank.buttons-" + api).prepend(apiButton);
        apiButtons[api].push(query);
        $(".add-input").val("");
    } else {
        alert("Please add a value");
    }
}

//mananges placeholder text that appears in search input
function placeholderText () {
    if($(this).attr("data-api") === "giphy"){
        $(".add-input").attr("placeholder", "Add a GIF button");
    } else if ($(this).attr("data-api")  === "omdb"){
        $(".add-input").attr("placeholder", "Add movie/show");
    }
}

//clears buttons, cards from clicked container
function clearContainer(){
    var api = $(this).attr("data-api");
    var target = $(this).attr("data-target");
    $("."+target+"-"+api).empty();
}
// toggles GIF img source from still image to animated image
function animate(){
    if($(this).attr("data-toggle") === "still"){
        $(this).attr({"src": $(this).attr("data-animate"), "data-toggle" : "animate"});
    } else {
        $(this).attr({"src": $(this).attr("data-still"), "data-toggle" : "still"});
    }
}

// handles all API CALLS
function apiSearch(){
    var api = $(this).attr("data-api");
    var querySearch = $(this).text();
    var query = apiIndex[api].query;
    apiIndex[api].parameters[query] = querySearch;
    var queryURL = apiIndex[api].url + $.param(apiIndex[api].parameters);
    
    $.ajax({
        url : queryURL,
        method : "get"
    }).then(function (response){
        const data = api === "giphy" ? response.data :("");
        //prints out 10 results from API query
        for(var i = 0; i<10; i++){
            var card = $("<div class='card " +api +"-card'>").attr("data-api",api);
            var contentWrap = $("<div class='card-content-wrap'>");
            var imgWrap = $("<div class='img-wrap'>");
            var infoWrap = $("<div class='info-wrap'>")
            //svg that creates ADD TO FAVORITES button
            var favWrap = $("<div class='fav-button'>").html('<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.29 73.29"><defs><style>.cls-1{fill:#1a1a1a;stroke:#fff;stroke-miterlimit:10;}</style></defs><title>Untitled-1</title><path class="cls-1" d="M86.15,50A36.15,36.15,0,1,1,50,13.85,36.16,36.16,0,0,1,86.15,50Zm-18.1-3.87H54V32.07a4,4,0,1,0-8,0V46.13H32a4,4,0,1,0,0,8H46V68.18a4,4,0,0,0,8,0V54.13h14a4,4,0,0,0,0-8Z" transform="translate(-13.35 -13.35)"/></svg>');
            //builds basic card properties by appending variables declared above
            contentWrap.append(imgWrap,infoWrap,favWrap);
            card.append(contentWrap);
            //handles cards' unique details when the api source is giphy
            if(api == "giphy"){
                var j = random(data);
                var img = $("<img class='gif'>").attr({"src" : data[j].images.fixed_height_still.url , "data-animate" : data[j].images.fixed_height.url, "data-still" : data[j].images.fixed_height_still.url, "data-toggle" : "still"});
                imgWrap.append(img);
                data.splice(j,1);
            //handles cards' unique details when the api source is omdb
            } else if(api === "omdb"){
                var img = $("<img>").attr({"src" : response.Poster});
                var title = $("<h3>").text(response.Title);
                var subhead = $("<h4>").text("CAST")
                var cast = $("<p class='cast'>").html(response.Actors);
                var plot = $("<p>").text(stringLimit(response.Plot, 100));
                var info = $("<div class='info'>").append(subhead,cast,plot);
                imgWrap.append(img);
                infoWrap.append(title,info);
                i= 10;
            }
            //adds new card to the start of the main bank
            $(".main-bank").prepend(card);
        }
    });

}

//======================DOCUMENT EVENTS=======================

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
        var card = $(this).parent().parent().parent();
        $(".favorites-bank").prepend(card);
    }
        




