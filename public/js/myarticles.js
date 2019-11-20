// =====================================================
// PRINTS SAVED ARTICLES
// =====================================================
$.getJSON("savedarticles", data => {
  for (var i in data) {
    console.log(data[i]);
    let card = $('<div class="card">');
    card.attr('id', 'card-' + data[i]._id);

    let cardBody = $('<div class="card-body">');

    let cardTitle = $('<h5 class="card-title">');
    cardTitle.text(data[i].headline);

    let cardSummary = $('<p class="card-text">');
    cardSummary.text(data[i].summary);

    let cardArticleLink = $('<a class="card-link">Article Link</a>');
    cardArticleLink.attr('href', data[i].url);

    let cardAddCommentBtn = $('<button type="submit" class="btn btn-secondary new-note float-right">Add Comment</button>');
    cardAddCommentBtn.attr('data-id', data[i]._id);

    let cardViewCommentBtn = $('<button type="submit" class="btn btn-secondary view-note float-right">View Comment(s)</button>');
    cardViewCommentBtn.attr('data-id', data[i]._id);

    cardBody.append([cardTitle, cardSummary, cardArticleLink, cardAddCommentBtn, cardViewCommentBtn]);
    card.append([cardBody]);
    $('#articles').append(card);
  }
}); 
// =====================================================
// ADD NEW COMMENT
// =====================================================
$(document).on('click', ".new-note", function() {
  var thisId = $(this).attr("data-id");
  
  let miniForm = $('<form>');
  
  let textbox = $('<textarea class="form-control" rows="5"></textarea>');
  
  let noteSave = $('<button type="submit" class="btn btn-secondary save-note float-right">Save</button>');
  noteSave.attr('data-id', thisId);
  
  miniForm.append([textbox, noteSave]);
  $(this).parent().append(miniForm);
});
// =====================================================
// SAVE NEW COMMENT
// =====================================================
$(document).on('click', ".save-note", function(e) {
  e.preventDefault();

  var thisId = $(this).attr("data-id");
  let noteText = $(this).parent().find("textarea").val();

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId + "/comments",
    data: {
      body: noteText
    }
  }).then(data => {
    console.log(data);
    $(".form-control").empty();
  });
});
// =====================================================
// VIEW ALL PREVIOUS COMMENTS
// =====================================================
$(document).on('click', '.view-note', function() {
  $(".comment-container").empty();
  var thisId = $(this).attr("data-id");
  var card = $("#card-" + thisId);
  var commentContainer = $("<div>");
  commentContainer.addClass("container comment-container");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId + "/comments"
  }).then(result => {
    for (var i in result) {
      let cardSummary = $('<p class="card-text"></p>');
      cardSummary.text(result[i].body);
      commentContainer.append(cardSummary);
    }
    card.append(commentContainer);
  })
});
// =====================================================