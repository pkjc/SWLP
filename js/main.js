function source(e){
  // we are calling an eventhandler to handle the videos by IDs associated with them
  console.log("inside source " + e);
  $("#back").show();
  $("#front").hide();
  $("#dev").hide();
  $("#contact").hide();
  var myVal = event.target.value;
  console.log('myVal' + myVal);
  //defining the variables
  var lecture_data = '';
  var vid_tag = '';
  var related_resources = '';
  console.log('myVal 2 ' + myVal);
  url = "https://swlp-lecture-service.herokuapp.com/api/lectures/";
  var NewUrl = url + myVal;
  //calling the lectures service restapi by adding the ID retrived from the eventhandler to its url and calling data particular to that ID
  console.log('NewUrl ' + NewUrl);
  //Making a AJAX getJSON function call with the new URL
  $.getJSON(NewUrl,function(data){
    console.log("inside getjson");
    lecture_data += '<div id="vid" class="embed-responsive embed-responsive-16by9 mt-3 mb-4">';
    lecture_data += '<iframe width="560" height="315" src="'+data.taggedSections.VideoURL+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>></iframe>';
    lecture_data += '</div>';
    lecture_data += '<h5 id="name" style="font-weight:bold">'+data.taggedSections.VideoName+'</h5>';
    lecture_data += '<p id="desc" class="text-muted">'+data.lectureDesc+'</p>';
    console.log(lecture_data);
    $('#lec_frame').append(lecture_data);
    // appending the acquired data to lecture material area in the thin client
    // Start of Tag call
    $.each(data.taggedSections.Tags, function(index, value){
      console.log("VAL " + value.tagName);
      $.each(data.taggedSections.Tags[index].Appearances, function(index1, value1){
        console.log("VAL " + value1.startTime);
        vid_tag += '<li class="list-group-item"><a href="">'+value1.startTime+'-'+value1.endTime+'</a> #'+value.tagName+'</li>' ;
      });
    });

    console.log(vid_tag);
    // Start of Related Resources
    $.each(data.RelatedResources.media, function(index, value){
      console.log("VAL " + value.tagName);
      related_resources +=  '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
      related_resources +=  '<div class="d-flex w-100 justify-content-between">';
      related_resources +=  '<h5 class="mb-1">'+value.title+'</h5>';
      related_resources +=  '<small>'+value.mediaType+'</small>';
      related_resources +=  '</div>';
      related_resources +=  '<p class="mb-1">'+value.description+'</p>';
      related_resources +=  '<small>'+value.image+'</small>';
      related_resources +=  '</a>';
    });
    console.log(related_resources);
    // appending the acquired data to lecture material area in the thin client
    $('#related_rsrc').append(related_resources);
    $('#vtag').append(vid_tag);
  });

}


function getUrl(url){
  //this function helps in dynamically calling all the course and asign appropriate IDs to buttons. These IDs are carry forwarded using source(this)
  // defining the variables
  var lec_d = '';
  var lec_n = '';
  var lec_data = '';
  url = url;
  // making the ajax call using getJSON
  $.getJSON(url,function(data){
    // Looping through data from the service and getting lectureImage, lectureDescription, lectureName, IDs
    $.each(data, function(key, value){
      lec_data += '<div class="col-md-4">';
      lec_data += '<div class="card mb-4 box-shadow">';
      lec_data += '<img id="limg" class="card-img-top" data-src="" src="http://i2.ytimg.com/vi/'+value.lectureImage+'/mqdefault.jpg"alt="Card image cap">';
      lec_data += '<div id="lbody" class="card-body">';
      lec_data += '<h5 class="card-title">'+value.lectureDesc+'</h5>';
      lec_data += '<p class="card-text">'+value.lectureName+'</p>';
      lec_data += '<div class="d-flex justify-content-between align-items-center">';
      lec_data += '<div class="btn-group">';
      lec_data += '<button type="button" id="'+value.id+'" onclick="source(this)" value="'+value.id+'"  class="lbtn btn btn-sm btn-outline-primary">Start Learning</button>';
      // When the button is clicked its going to source function which displays lectures materials such as lectureVideo,name and description, tags, RelatedResources
      lec_data += '<button type="button" class="btn btn-sm btn-outline-primary">Bookmark</button>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
    });
    console.log(lec_data);
    // appending the acquired data to all course area in the thin client
    $('#row').append(lec_data);
  });
}
function about(){
$("#back").hide();
$("#front").hide();
$("#dev").show();
$("#contact").hide();
}
function course(){
$("#back").hide();
$("#front").show();
$("#dev").hide();
$("#contact").hide();
}
function home(){
$("#back").hide();
$("#front").show();
$("#dev").hide();
$("#contact").hide();
}
function contact(){
$("#back").hide();
$("#front").hide();
$("#dev").hide();
$("#contact").show();
}
$("document").ready(function(){
  $("#back").hide();
  $("#dev").hide();
  $("#contact").hide();
  // as the page loads go to getUrl function and carry forward the lecture service restapi url to make a ajax call
  getUrl("https://swlp-lecture-service.herokuapp.com/api/lectures/");
});
