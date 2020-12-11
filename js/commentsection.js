var commentssection = "";
var alreadyloadedcomments=[];

window.onload = function () {
    axios.get('commentsectionrow.html')
        .then(function (response) {
            var doc = new DOMParser().parseFromString(response.data, 'text/html');
            var rowelement = doc.body.firstChild;
            document.getElementById("commentsContainer").appendChild(rowelement);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            Initialize(); 
        });
}


function Initialize() {
    // always executed
    var commentform = document.getElementById("commentform");
    var loadcommentsbutton = document.getElementById("loadcomments");
    commentssection = document.getElementById("getcomments");
    if(commentform!=undefined && loadcommentsbutton!=undefined && commentssection!=undefined){
        commentform.addEventListener("submit", function (event) {
            event.preventDefault();
            var existing = submitbutton.getAttribute("style")
            submitbutton.setAttribute("style", existing + "outline: none;box-shadow: none;");
            postComment()
        });
    
        loadcommentsbutton.addEventListener("click", function () {
            getComments();
            loadcommentsbutton.remove();
        })
    }
}



{
    /* <div class="alert alert-danger" role="alert">
      This is a danger alert—check it out!
    </div> */
}

function createBootstrapAlert(message) {
    var alertdiv = document.createElement('div');
    alertdiv.classList.add("alert");
    alertdiv.classList.add("alert-danger");
    alertdiv.setAttribute("role", "alert");
    alertdiv.innerHTML = message;
    return alertdiv;
}

{
    /* <div class="card">
    <div class="card-header">
      <h5 style="margin-bottom: 0px;">Name</h5>
    </div>
    <div class="card-body">
      <p style="margin-bottom: 0px;margin-top: 0px;font-size: 18px;padding-left: 20px;"></p>
    </div>
    </div> */
}

function createBootstrapCard(name, message) {
    var carddiv = document.createElement('div');
    carddiv.classList.add("card");
    carddiv.setAttribute("style", "margin-bottom:20px");

    var cardheaderdiv = document.createElement('div');
    cardheaderdiv.classList.add("card-header");
    var h5 = document.createElement('h5')
    h5.setAttribute("style", "margin-bottom:0px;")
    cardheaderdiv.appendChild(h5)
    h5.innerHTML = name; // response.data[i].Name;

    var cardbodydiv = document.createElement('div');
    cardbodydiv.classList.add("card-body");

    var paragraph = document.createElement('p');
    paragraph.setAttribute("style", "margin-bottom: 0px;margin-top: 0px;font-size: 15px;padding-left: 20px;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;");
    paragraph.innerHTML = message; // response.data[i].Message;

    cardbodydiv.appendChild(paragraph);
    carddiv.appendChild(cardheaderdiv);
    carddiv.appendChild(cardbodydiv);
    return carddiv;
}

function postComment() {
    var commentobject = "";
    //get element like in the css
    var MessageValue = commentform.querySelector("textarea[name=Message]").value
    var NameValue = commentform.querySelector("input[name=Name]").value
    var alertelement = document.getElementById("alertElementParent")
    alertelement.innerHTML = null;
    if (MessageValue == "" || MessageValue == null) {
        alertelement.appendChild(createBootstrapAlert("Please fill e message"))
        return;
    }

    commentobject = {
        Name: NameValue,
        Message: MessageValue,
        Email: "enen@gmail.com"
    }
    commentform.querySelector("textarea[name=Message]").value = "";
    axios.post('https://contactmeinfosapi.herokuapp.com/contactme/comments', commentobject)
        .then(function (response) {
            commentssection.prepend(createBootstrapCard(NameValue, MessageValue));
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getComments() {
    //console.log(submitbutton)
    // Make a request for a user with a given ID
    commentssection.innerHTML = "";
    axios.get('https://contactmeinfosapi.herokuapp.com/contactme/comments')
        .then(function (response) {
            // handle success
            var i;
            for (i = response.data.length-1; i >= 0; i--) {               
                if(alreadyloadedcomments.length==0){
                    alreadyloadedcomments.push(response.data[i]._id)
                    commentssection.appendChild(createBootstrapCard(response.data[i].Name, response.data[i].Message));
                }else{
                    var j=0;
                    var found=false;
                    for (j = 0; j < alreadyloadedcomments.length; j++) {
                        if(response.data[i]._id==alreadyloadedcomments[j]){
                            found=true;
                        }
                    }
                    if(!found){
                        commentssection.appendChild(createBootstrapCard(response.data[i].Name, response.data[i].Message));
                        alreadyloadedcomments.push(response.data[i]._id)
                    }
                }
                
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