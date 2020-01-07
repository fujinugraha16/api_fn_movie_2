function searchMovie() {
    $('#movie-list').html(''); //mengosongkan movie list ketika di tombol search di klik / input search di enter

    $.ajax({ //jalankan ajax
        url: 'http://omdbapi.com', //http://omdapi.com?apikey=950fe7fb&s=('#search-input').val()
        type: 'get', //method get
        dataType: 'json', //tipe data json
        data: { //parameter yang dikirim
            'apikey': '950fe7fb', //apikey
            // 'i' untuk id
            // 't' untuk judul
            // 's' untuk mencari
            's': $('#search-input').val() //mengambil data dari search input untuk dikirm di url
        },
        success: function (data) {
            if (data.Response == "True") { //jika data.Response = true
                let movies = data.Search;

                $.each(movies, function (i, data) { //lakukan pengulangan i = index, data = data yang diambil
                    //append / tambahkan ke dalam movie list
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id=` + data.imdbID + `>See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val(''); //kosongkan search input setelah input selesai
            } else { //jika data tidak ditemukan
                // $('#movie-list').html('<h1 class="text-center">Movie Not Found</h1>');
                $('#movie-list').html(` 
                    <div class="col">
                        <h1 class="text-center">` + data.Error + `</h1>
                    </div>
                `);
            }
        }
    });
}

$('#search-button').on('click', function () { //ketika search button diklik
    // $.getJSON('http://omdbapi.com?apikey=950fe7fb&');
    searchMovie();
});

$('#search-input').on('keyup', function (event) { //ketika keyCode 13 / enter di klik
    if (event.keyCode === 13) { //which
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () { //ketika see detail yang ada di dalam movie list (sudah ada/belum ada) di klik
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '950fe7fb',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Released: ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre: ` + movie.Genre + `</li>
                                    <li class="list-group-item">Director: ` + movie.Director + `</li>
                                    <li class="list-group-item">Actor: ` + movie.Actors + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});