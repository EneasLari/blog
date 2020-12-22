var commentssection = "";
var alreadyloadedcomments = [];
var respondButton = "";

var articleID = document.getElementById("ArticleId").innerHTML.trim();
console.log(articleID)

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
    if (commentform != undefined && loadcommentsbutton != undefined && commentssection != undefined) {
        commentform.addEventListener("submit", function (event) {
            event.preventDefault();
            var existing = submitbutton.getAttribute("style")
            submitbutton.setAttribute("style", existing + "outline: none;box-shadow: none;");
            postComment(commentform)
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

function createBootstrapAlert(comment) {
    var alertdiv = document.createElement('div');
    alertdiv.classList.add("alert");
    alertdiv.classList.add("alert-danger");
    alertdiv.setAttribute("role", "alert");
    alertdiv.innerHTML = comment;
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

    //     <div class="card">
    //     <div class="card-header">
    //       <h5 style="margin-bottom: 0px;">Name</h5>
    //     </div>
    //     <div class="card-body">
    //       <p style="margin-bottom: 0px;margin-top: 0px;font-size: 18px;padding-left: 20px;">
    //       </p>
    //   <div class='text-center'>
    //     <button type='button' class='btn btn-success btn-sm'
    //       style='margin-top: 20px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;'>Respond</button>
    //   </div>
    //     </div>
    //   </div>
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

    var responsstring = "<div style='text-align:right'>" + "<button type='button' class='btn btn-success btn-light btn-sm respondbutton'" +
        "style='margin-top: 20px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;'>" +
        "Respond</button></div>" + "<div  id='commentresponse' ></div> ";
    var responseelement = document.createElement("div")
    responseelement.innerHTML = responsstring;
    var cardbodydiv = document.createElement('div');
    cardbodydiv.classList.add("card-body");

    var paragraph = document.createElement('p');
    paragraph.setAttribute("style", "margin-bottom: 0px;margin-top: 0px;font-size: 15px;padding-left: 20px;font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;");
    paragraph.innerHTML = message; // response.data[i].Message;

    cardbodydiv.appendChild(paragraph);
    cardbodydiv.appendChild(responseelement)
    carddiv.appendChild(cardheaderdiv);
    carddiv.appendChild(cardbodydiv);
    respondButton = carddiv.querySelector("button")
    respondButton.addEventListener("click", RespondToMessage)
    console.log(respondButton)
    return carddiv;
}

function RespondToMessage(){
    var commentFForm=document.getElementById("commentform").cloneNode(true);
    document.getElementById("commentresponse").appendChild(commentFForm)
    commentFForm.id="responseid"
    commentFForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("FORM POSTED")
        // var existing = submitbutton.getAttribute("style")
        //submitbutton.setAttribute("style", existing + "outline: none;box-shadow: none;");
        postComment(commentFForm)
    });
    //here i must make the post of comment(postComment) and then delete the form
}

function postComment(form) {
    var commentobject = "";
    //get element like in the css
    var CommentValue = form.querySelector("textarea[name=Comment]").value
    var NameValue = form.querySelector("input[name=Name]").value
    var alertelement = document.getElementById("alertElementParent")
    alertelement.innerHTML = null;
    if (CommentValue == "" || CommentValue == null) {
        alertelement.appendChild(createBootstrapAlert("Please fill a Comment"))
        return;
    }
    var articlename = document.getElementsByTagName("title")[0].innerText
    commentobject = {
        Name: NameValue,
        Comment: CommentValue,
        ArticleId: articleID,
        ArticleName: articlename
    }
    form.querySelector("textarea[name=Comment]").value = "";
    axios.post('https://articlecommentsapi.herokuapp.com/comments', commentobject)
        .then(function (response) {
            if(document.getElementById("responseid") && document.getElementById("responseid").parentElement.id=="commentresponse"){
                document.getElementById("responseid").parentElement.prepend(createBootstrapCard(NameValue, CommentValue))
                form.remove();
            }else{
                commentssection.prepend(createBootstrapCard(NameValue, CommentValue));
            }
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getComments() {
    // Make a request for a user with a given ID
    commentssection.innerHTML = "";
    axios.get('https://articlecommentsapi.herokuapp.com/comments', {
            params: {
                ArticleId: articleID
            }
        })
        .then(function (response) {
            // handle success
            var i;
            for (i = response.data.length - 1; i >= 0; i--) {
                if (alreadyloadedcomments.length == 0) {
                    alreadyloadedcomments.push(response.data[i]._id)
                    commentssection.appendChild(createBootstrapCard(response.data[i].Name, response.data[i].Comment));
                } else {
                    var j = 0;
                    var found = false;
                    for (j = 0; j < alreadyloadedcomments.length; j++) {
                        if (response.data[i]._id == alreadyloadedcomments[j]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        commentssection.appendChild(createBootstrapCard(response.data[i].Name, response.data[i].Comment));
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