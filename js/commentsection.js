var commentssection = document.getElementById("getcomments");
var commentform=document.getElementById("commentform");
var submitbutton=document.getElementById("submitbutton");

submitbutton.addEventListener("click",function(){
    var existing =submitbutton.getAttribute("style")
    submitbutton.setAttribute("style",existing+"outline: none;box-shadow: none;");
    postComment()
});

commentform.addEventListener("submit",function(event){
    event.preventDefault();
    getComments();
})

function postComment(){
    var commentobject="";
    commentobject={
        Name:"Test",
        Message:"PUSH ME",
        Email:"enen@gmail.com"
    }
    axios.post('https://contactmeinfosapi.herokuapp.com/contactme/comments', commentobject)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function getComments() {
    console.log(submitbutton)
    // Make a request for a user with a given ID
    commentssection.innerHTML="";
    axios.get('https://contactmeinfosapi.herokuapp.com/contactme/comments')
        .then(function (response) {
            // handle success
            var i;
            for (i = 0; i < response.data.length; i++) {

                var carddiv = document.createElement('div');
                carddiv.classList.add("card");
                carddiv.setAttribute("style", "margin-bottom:20px");

                var cardheaderdiv = document.createElement('div');
                cardheaderdiv.classList.add("card-header");
                var h5 = document.createElement('h5')
                h5.setAttribute("style", "margin-bottom:0px;")
                cardheaderdiv.appendChild(h5)
                h5.innerHTML = response.data[i].Name;

                var cardbodydiv = document.createElement('div');
                cardbodydiv.classList.add("card-body");

                var paragraph = document.createElement('p');
                paragraph.setAttribute("style", "margin-bottom: 0px;margin-top: 0px;font-size: 15px;padding-left: 20px;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;");
                paragraph.innerHTML = response.data[i].Message;

                cardbodydiv.appendChild(paragraph);
                carddiv.appendChild(cardheaderdiv);
                carddiv.appendChild(cardbodydiv);
                commentssection.appendChild(carddiv);
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