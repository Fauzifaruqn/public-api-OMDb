function seacrhMovie(){
   
    $('#movie-list').html('');
    $.ajax({
        // parameter objeknya url
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'e9bd91fd',
            's': $('#search-input').val()
        },
        success: function (result){
            if(result.Response == "True"){

                let movies = result.Search;
                // console.log(movies);
                $.each(movies, function(i,data) {
                    $('#movie-list').append(`

                    <div class= "col-md-3">

                        <div class= "card">
                            <img class= "card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                            <div class= "card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModalLong" data-id="`+ data.imdbID +`">See Detail</a>
                            </div>
                        </div>
                    </div>
                    
                    `);

                });

                $('#search-input').val('');

            }
            else{
                $('#movie-list').html(`

                <div class="col">
                    <h1 class="text-center">` + result.Error + `</h1>
                </div>
                
                `)
            }

        }

    });
}

$('#search-button').on('click', function () {
    seacrhMovie();

});


// menangani enter
$('#search-input').on('keyup', function(e){
    if(e.keyCode === 13){
        seacrhMovie();
    }
    
    
});


$('#movie-list').on('click', '.see-detail', function(){
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey' : 'e9bd91fd',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if(movie.Response === "True"){
                $('.modal-body').html(`
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img  class="img-fluid" src="`+ movie.Poster +`">
                        </div>

                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                <li class="list-group-item">`+ movie.Year +`</li>
                                <li class="list-group-item">`+ movie.Released +`</li>
                                <li class="list-group-item">`+ movie.Genre +`</li>
                                <li class="list-group-item">`+ movie.Director +`</li>
                                <li class="list-group-item">`+ movie.Actors +`</li>
                              
                            </ul>
                        </div>

                    </div>

                </div>
                
                `);
            }
        }
    })
});