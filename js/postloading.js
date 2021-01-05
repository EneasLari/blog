var titlesection = document.getElementById("postTitle")
var pagetitle=document.getElementById("pagetitle")
var descriptionsection = document.getElementById("postDescription")
var bodysection = document.getElementById("postBody")
var id = document.getElementById("ArticleId")
var dateposted=document.getElementById("dateposted")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
id.innerHTML=urlParams.get('id')

window.addEventListener("load",function () {
    getPost();
})

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

function getPost() {
    // Make a request for a user with a given ID
    commentssection.innerHTML = "";
    axios.get('https://articlecommentsapi.herokuapp.com/articlebyid', {
        params: {
            id: id.innerHTML
        }
    })
        .then(function (response) {
            // handle success
            titlesection.innerHTML = response.data.Title;
            pagetitle.innerHTML=response.data.Title;
            descriptionsection.innerHTML = response.data.Description;
            bodysection.innerHTML = response.data.Body;

            var datefromstr=new Date(response.data.DatePosted)
            var monthIndex = datefromstr.getMonth()
            var monthName = months[monthIndex]
            dateformated=monthName +' '+datefromstr.getDate()+', '+datefromstr.getFullYear();

            dateposted.innerHTML='Posted by <a href="https://twitter.com/EneasLari">Eneas Lari</a> on '+dateformated

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}
