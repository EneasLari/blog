var titlesection=document.getElementById("postTitle")
var descriptionsection=document.getElementById("postDescription")
var bodysection=document.getElementById("postBody")
var id=document.getElementById("ArticleId")

console.log(titlesection);
console.log(descriptionsection);
console.log(bodysection);
console.log(id.innerHTML);

window.onload = function () {

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
            console.log(response.data);
            titlesection.innerHTML=response.data.Title;
            descriptionsection.innerHTML=response.data.Description;
            bodysection.innerHTML=response.data.Body;
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}
