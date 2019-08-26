$(document).on("click", ".articleContainer .article", function (event) {
    const $article = $(this).clone();

    $("#articleModal .articleDisplay").empty();
    $("#articleModal .links").empty();
    $("#articleModal .notes").empty();

    $.getJSON(`/api/articles/${$article.attr("data-id")}`).then((response) => {
        console.log(response);

        if(response.notes.length > 0){
            response.notes.forEach((note, index) => {
                let $div = $("<div>").attr("class", "articleNote");
                let $row = $("<div>").attr("class", "row").appendTo($div);
                $row.append($("<div>").attr("class", "col-2 text-left articleNoteIndex").text(`#${index}`));
                $row.append($("<div>").attr("class", "col-10 text-center articleNoteContent").text(`${note.message}`));
                $(".notes").append($div);
            });
        }else{
            $(".notes").append($("<div>").attr("class", "articleNote").text("No notes for the article"))
        }

        $("#articleModal .links").append($("<a>").attr("href", response.link).text("Full Article"));
        $("#articleModal .articleDisplay").empty();
        $("#articleModal .articleDisplay").prepend($article);
        $("#articleModal").modal("show")



        $("#formSubmit").on("click", (event) => {
            if($("#inputNote").val().trim()){
                $.post(`/api/note/create/${response._id}`, {
                    message: $("#inputNote").val().trim()
                }).then((res) => {
                    $("#articleModal .notes").empty();
                    $("#inputNote").val("");
                    response.notes.push(res)
                    response.notes.forEach((note, index) => {
                        let $div = $("<div>").attr("class", "articleNote");
                        let $row = $("<div>").attr("class", "row").appendTo($div);
                        $row.append($("<div>").attr("class", "col-2 text-left articleNoteIndex").text(`#${index}`));
                        $row.append($("<div>").attr("class", "col-10 text-center articleNoteContent").text(`${note.message}`));
                        $(".notes").append($div);
                    });
                })
            }
            

        })

    })


})

$(document).click((event) => {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest("#articleModal").length) {
        $("#articleModal .articleDisplay").empty();
    $("#articleModal .links").empty();
    $("#articleModal .notes").empty();
        $("#articleModal").hide();
    }
  });

  $("#scrapeBtn").on("click", (event) => {
    $.get("/api/scrape").then(() =>{
        location.reload();
    });
  });