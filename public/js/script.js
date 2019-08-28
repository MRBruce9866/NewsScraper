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

    })


})


$("#formSubmit").on("click", (event) => {
    
    let id = $(".articleDisplay .article").attr("data-id");
    if($("#inputNote").val().trim()){
        $.post(`/api/note/create/${id}`, {
            message: $("#inputNote").val().trim()
        }).then((res) => {

            $.getJSON(`/api/articles/${id}`).then((response) => {
                console.log(response);
                $(".notes").empty();
                if(response.notes.length > 0){
                    response.notes.forEach((note, index) => {
                        let $div = $("<div>").attr("class", "articleNote");
                        let $row = $("<div>").attr("class", "row").appendTo($div);
                        $row.append($("<div>").attr("class", "col-2 text-left articleNoteIndex").text(`#${index}`));
                        $row.append($("<div>").attr("class", "col-10 text-center articleNoteContent").text(`${note.message}`));
                        $(".notes").append($div);
                    });
                }
            })
            
        })
    }
    

})

  $("#scrapeBtn").on("click", (event) => {
    $.get("/api/scrape").then(() =>{
        location.reload();
    });
  });