function source(e){
  console.log("inside source " + e);
  $("#back").show();
  $("#front").hide();
  var myVal = event.target.value;
  console.log('myVal' + myVal);
  var lecture_data = '';
  var vid_tag = '';
  var related_resources = '';
  console.log('myVal 2 ' + myVal);
  url = "https://swlp-lecture-service.herokuapp.com/api/lectures/";
  var NewUrl = url + myVal;
  console.log('NewUrl ' + NewUrl);
  $.getJSON(NewUrl,function(data){
    console.log("inside getjson");
    lecture_data += '<div id="vid" class="embed-responsive embed-responsive-16by9 mt-3 mb-4">';
    lecture_data += '<iframe width="560" height="315" src="'+data.taggedSections.VideoURL+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>></iframe>';
    lecture_data += '</div>';
    lecture_data += '<h5 id="name" style="font-weight:bold">'+data.taggedSections.VideoName+'</h5>';
    lecture_data += '<p id="desc" class="text-muted">'+data.lectureDesc+'</p>';
    console.log(lecture_data);
    $('#lec_frame').append(lecture_data);
    console.log("THIS " + data.taggedSections.Tags[0]);
    // Start of Tag call
      vid_tag += '<li class="list-group-item"><a href=""></a>  </li>';
    // Start of Related Resources
    related_resources +=  '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">';
    related_resources +=  '<div class="d-flex w-100 justify-content-between">';
    related_resources +=  '<h5 class="mb-1">'+data.RelatedResources.media.title+'</h5>';
    related_resources +=  '<small>'+data.RelatedResources.media.mediaType+'</small>';
    related_resources +=  '</div>';
    related_resources +=  '<p class="mb-1">'+data.RelatedResources.media.description+'</p>';
    related_resources +=  '<small>'+data.RelatedResources.media.resourceURL+'</small>';
    related_resources +=  '</a>';
    console.log(related_resources);
    $('#related_rsrc').append(related_resources);
    $('#vtag').append(vid_tag);
  });

}


function getUrl(url){
  var lec_d = '';
  var lec_n = '';
  var lec_data = '';
  url = url;
  $.getJSON(url,function(data){
    console.log(data);
    $.each(data, function(key, value){
      lec_data += '<div class="col-md-4">';
      lec_data += '<div class="card mb-4 box-shadow">';
      lec_data += '<img id="limg" class="card-img-top" data-src="" src="'+value.lectureImage+'" alt="Card image cap">';
      lec_data += '<div id="lbody" class="card-body">';
      lec_data += '<h5 class="card-title">'+value.lectureDesc+'</h5>';
      lec_data += '<p class="card-text">'+value.lectureName+'</p>';
      lec_data += '<div class="d-flex justify-content-between align-items-center">';
      lec_data += '<div class="btn-group">';
      lec_data += '<button type="button" id="'+value.id+'" onclick="source(this)" value="'+value.id+'"  class="lbtn btn btn-sm btn-outline-primary">Start Learning</button>';
      lec_data += '<button type="button" class="btn btn-sm btn-outline-primary">Bookmark</button>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
      lec_data += '</div>';
    });
    console.log(lec_data);
    $('#row').append(lec_data);
  });
}

$("document").ready(function(){
  $("#back").hide();
  getUrl("https://swlp-lecture-service.herokuapp.com/api/lectures/");
});
