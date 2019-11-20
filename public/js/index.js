// =====================================================
// PRINTS SCRAPED ARTICLES
// =====================================================
$.getJSON("/scrape", data => {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    let card = $('<div class="card">');
    let cardBody = $('<div class="card-body">');
    let cardTitle = $('<h5 class="card-title">');
    cardTitle.text(data[i].headline);
    let cardSummary = $('<p class="card-text">');
    cardSummary.text(data[i].summary);
    let cardArticleLink = $('<a class="card-link">Article Link</a>');
    cardArticleLink.attr('href', data[i].url);
    let cardNoteLink = $('<button class="btn btn-secondary float-right save-btn">Save Article</button>'); 
    cardNoteLink.attr('data-id', data[i]._id)
    cardBody.append([cardTitle, cardSummary, cardArticleLink, cardNoteLink]);
    card.append(cardBody);
    $('#articles').append(card);
  };
});
// =====================================================
// SAVES SCRAPED ARTICLE TO 'MY ARTICLES'
// =====================================================
$(document).on('click', ".save-btn", function() {
  let thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      saved: true
    }
  })
});
// =====================================================