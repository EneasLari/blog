var articlescontainer = document.getElementById("dynamiccontent")
// Simulate a mouse click:
//window.location.href = "./posts/post5.html";
getArticles();

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

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
            var articlepreview = '';
            for (i = response.data.length - 1; i >= 0; i--) {
                var datefromstr=new Date(response.data[i].DatePosted)
                var monthIndex = datefromstr.getMonth()
                console.log(datefromstr)
                var monthName = months[monthIndex]
                dateformated=monthName +' '+datefromstr.getDate()+', '+datefromstr.getFullYear();
                console.log(monthName)
                articlepreview = articlepreview + '<div class="row"><div class="col-lg-8 col-md-10 mx-auto"><div class="post-preview"><a href="posts/postTemplate.html?id='+response.data[i]._id+'"><h2 class="post-title">' + response.data[i].Title + '</h2><h3 class="post-subtitle">' + response.data[i].Description + '</h3></a> <p class="post-meta">Posted by <a href="https://twitter.com/EneasLari">Eneas Lari</a> on ' + dateformated + ' </p></div><hr></div></div>';
                console.log(response.data[i])
            }
            articlescontainer.innerHTML = articlepreview;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed

        });
}