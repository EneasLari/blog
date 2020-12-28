var articlescontainer=document.getElementById("dynamiccontent")
getArticles();



function getArticles() {
    // Make a request for a user with a given ID
    articlescontainer.innerHTML = "";
    axios.get('https://articlecommentsapi.herokuapp.com/articles', {
            // params: {
            //     ArticleId: articleID
            // }
        })
        .then(function (response) {
            
            // handle success
            var i;
            var articlepreview='';
            for (i = response.data.length - 1; i >= 0; i--) {
                articlepreview=articlepreview+'<div class="row"><div class="col-lg-8 col-md-10 mx-auto"><div class="post-preview"><a href="posts/post5.html"><h2 class="post-title">'+response.data[i].Title+'</h2><h3 class="post-subtitle">'+response.data[i].Body+'</h3></a> <p class="post-meta">Posted by<a href="https://twitter.com/EneasLari">Eneas Lari</a>on December 8, 2020</p></div><hr></div></div>';
                console.log(response.data[i])
            }
            articlescontainer.innerHTML=articlepreview;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed

        });
}


console.log(articlescontainer)