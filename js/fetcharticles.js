var articlescontainer=document.getElementById("dynamiccontent")
getArticles();

function getArticles() {
    // Make a request for a user with a given ID
    commentssection.innerHTML = "";
    axios.get('https://articlecommentsapi.herokuapp.com/articles', {
            // params: {
            //     ArticleId: articleID
            // }
        })
        .then(function (response) {
            articlescontainer.innerHTML.response.data;
            // handle success
            var i;
            for (i = response.data.length - 1; i >= 0; i--) {
                console.log(response.data[i])
            }
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