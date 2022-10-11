$(document).ready(function() {
    var api = 'cb70654f0346d026ba7d60b61233b3bb';

    loadnews();
    loadTech();
    $('#tinhot').click(function() {
        loadTopic('breaking-news');
    });
    $('#kinhte').click(function() {
        loadTopic('business');
    });
    $('#khoahoc').click(function() {
        loadTopic('sience');
    });
    $('#thegioi').click(function() {
        loadTopic('world');
    });
    $('#giaitri').click(function() {
        loadTopic('entertainment');
    });
    $('#suckhoe').click(function() {
        loadTopic('health');
    });

    //show hide loading 
    function loadnews() {
        $('.loading').show();
        fetch('https://gnews.io/api/v4/top-headlines?&token=' + api + '&lang=en')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendNews(data);
            })
            .then(function() {
                $('.loading').hide();
            });
    }


    function loadTopic(topic) {
        $(".loading").show();
        fetch('https://gnews.io/api/v4/top-headlines?topic=' + topic + '&token=' + api+ '&lang=en')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendNews(data);
            })
            .then(function() {
                $(".loading").hide();
            });
    }

    function appendNews(data) {
        $(".news-0 img").attr("src", data.articles[0].image);
        $(".news-0 a.tieude").attr("href", data.articles[0].url);
        $(".news-0 a.read-more").attr("href", data.articles[0].url);
        $(".news-0 a.tieude h5").text(data.articles[0].title);
        $(".news-0 p.noidung").text(data.articles[0].description);
        $(".news-0 .author").text(data.articles[0].source.name);
        $(".news").html(''); //Empty the Top News section
        for (let i = 1; i < 9; i++) {
            $(".news").append('<article class = "news-' + i + ' card col-3 d-inline-block"><div class = "col-12"><img src = "' + data.articles[i].image + '" class = "img-fluid"></div><div class = "col-12 text"><a href = "' + data.articles[i].url + ' " class = "headline" target="_blank"><h5>' + data.articles[i].title + '</h5></a><p class = "tacgia">Đăng bởi <span class = "author">' + data.articles[i].source.name + '</span></p><p class = "noidung">' + data.articles[i].description + '</p><div class = "link"><a href = "' + data.articles[i].url + '" class = "read-more" target="_blank">Đọc tiếp</a></div></div></article>');
        }
    }

    function loadTech() {
        $('.loadingcv').show();
        fetch('https://gnews.io/api/v4/top-headlines?&token=' +api +'&lang=en&topic=technology')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                appendTech(data);
            })
            .then(function() {
                $('.loadingcv').hide();
            });
    }

    function appendTech(data) {
        $('.tech').html('');
        for (let i = 1; i < 9; i++) {
            $('.tech').append('<article class = "tech' + i + ' card col-3 d-inline-block"><div class = "col-12"><img src = "' + data.articles[i].image + '" class = "img-fluid"></div><div class = "col-12 text"><a href = "' + data.articles[i].url + ' " class = "headline" target="_blank"><h5>' + data.articles[i].title + '</h5></a><p class = "tacgia">Đăng bởi <span class = "author">' + data.articles[i].source.name + '</span></p><p class = "noidung">' + data.articles[i].description + '</p><div class = "link"><a href = "' + data.articles[i].url + '" class = "read-more" target="_blank">Đọc tiếp</a></div></div></article>');
        }
    }

    //tìm kiếm
    $('.search-button').click(function() {
        var keyword = prompt('Nhập thông tin cần tìm');

        if (keyword != '') {
            request = 'https://gnews.io/api/v4/search?q=' + keyword + '&token=' + api + '&lang=en';
            $(".loading").show();
            fetch(request)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    appendNews(data);
                })
                .then(function() {
                    $(".loading").hide();
                });
        }
    });

});