var commentssection = "";
var alreadyloadedcomments = [];


var articleID = document.getElementById("ArticleId").innerHTML.trim();

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
            postComment(commentform, null, false)
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
    var bootstrapAlertstr = "<div class='alert alert-danger' role='alert'></div>";

}

function createBootstrapAlert(comment) {
    var div = document.createElement('div');
    div.innerHTML=bootstrapAlertstr;
    div.children[0].innerHTML = comment;
    return div;
}

bootstrapCardStr =
    "<div class='card'>" +
    "<div title='Id' style='display: none;'></div>" +
    "<div title='ParentId' style='display: none;'></div>" +
    "<div class='card-header'>" +
    "  <h5 title='Name' style='margin-bottom: 0px;'></h5>" +
    "</div>" +
    "<div class='card-body'style='padding-bottom: 10px;'>" +
    "  <p title='Comment' style='margin-bottom: 0px;margin-top: 0px;font-size: 18px;padding-left: 20px;'>" +
    "  </p>" +
    "  <div style='text-align:right'>" +
    "    <button type='button' class='btn btn-success btn-light btn-sm '" +
    "      style='padding-bottom:0px;margin-bottom: 0px;margin-top: 10px; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;'>Respond...</button>" +
    "  </div>" +
    "</div>" +
    "</div>" +
    "<div class='commentresponse'></div>"

function createBootstrapCard(Id, parentId, name, message) {
    var carddiv = document.createElement('div');
    carddiv.innerHTML = bootstrapCardStr;

    var nameEl = carddiv.querySelector("[title=Name]");
    nameEl.innerHTML = name;

    var commentEl = carddiv.querySelector("[title=Comment]");
    commentEl.innerHTML = message;

    var idEl = carddiv.querySelector("[title=Id]");
    idEl.id = Id;

    var parentidEl = carddiv.querySelector("[title=ParentId]");
    parentidEl.innerHTML = parentId;

    var respondButton = carddiv.querySelector("button")
    respondButton.addEventListener("click", function () {
        console.log(carddiv)
        RespondToMessage(carddiv,respondButton);
        respondButton.style.visibility="hidden";
    })
    return carddiv;
}

function RespondToMessage(card,button) {
    //take a clone of general post comment form
    var commentFForm = document.getElementById("commentform").cloneNode(true);
    console.log(commentFForm.id)
    commentFForm.id = card.querySelector("[title=Id]").id;
    console.log(commentFForm.id)
    //get the div where the post comment will be rendered
    var responsearea=card.querySelector(".commentresponse")
    responsearea.prepend(commentFForm)

    commentFForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // var existing = submitbutton.getAttribute("style")
        //submitbutton.setAttribute("style", existing + "outline: none;box-shadow: none;");
        postComment(commentFForm, card.querySelector(".commentresponse"), true)
        commentFForm.remove();
        button.style.visibility="visible"
    });
    //here i must make the post of comment(postComment) and then delete the form
}

function postComment(form, cardresponse, hasparent) {
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
    var parent = null;
    if (hasparent) {
        parent = form.id;
    }
    commentobject = {
        Name: NameValue,
        Comment: CommentValue,
        ArticleId: articleID,
        ArticleName: articlename,
        ParentId: parent
    }
    form.querySelector("textarea[name=Comment]").value = "";
    axios.post('https://articlecommentsapi.herokuapp.com/comments', commentobject)
        .then(function (response) {
            console.log(response.data._id, response.data.ParentId, )
            if (form.id != "commentform") {
                cardresponse.prepend(createBootstrapCard(response.data._id, response.data.ParentId, NameValue, CommentValue))

            } else {
                commentssection.prepend(createBootstrapCard(response.data._id, response.data.ParentId, NameValue, CommentValue));
            }
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
                    commentssection.appendChild(createBootstrapCard(response.data[i]._id, response.data[i].ParentId, response.data[i].Name, response.data[i].Comment));
                } else {
                    var j = 0;
                    var found = false;
                    for (j = 0; j < alreadyloadedcomments.length; j++) {
                        if (response.data[i]._id == alreadyloadedcomments[j]) {
                            found = true;
                        }
                    }
                    if (!found) {
                        
                        commentssection.appendChild(createBootstrapCard(response.data[i]._id, response.data[i].ParentId, response.data[i].Name, response.data[i].Comment));
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
            for (i = commentssection.children.length - 1; i >= 0; i--) {
                var child = commentssection.children[i];
                var parentof = document.getElementById(child.querySelector("[title=ParentId]").innerHTML)
                if (parentof) {
                    parentcard = parentof.parentElement;
                    if (parentcard) {
                        containerofcard = parentcard.parentElement;
                        if (containerofcard) {
                            containerofcard.querySelector("[class=commentresponse]").prepend(child)
                        }
                    }
                }


            }
        });
}