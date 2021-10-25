let elUserList = document.querySelector(".user-list");
let elPostList = document.querySelector(".list-post");
let elComent = document.querySelector(".list-coment");
let userTemplate = document.querySelector("#js-user-template").content;


// ===============================================================
let postTemplate = document.querySelector("#js-post-template").content;
// let elPostBtn = document.querySelector(".post-btn");

// 1======================================================================
let commentTemplate = document.querySelector("#js-comment-template").content;




let elFragment = document.createDocumentFragment();


fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => appendUser(data))

let renderUser = function (object) {
    let userNameTemplate = userTemplate.cloneNode(true);

    userNameTemplate.querySelector(".js-name").textContent = object.name;
    userNameTemplate.querySelector(".js-user").textContent = object.username;
    userNameTemplate.querySelector(".name-btn").setAttribute("data-id", `${object.id}`)

    elFragment.appendChild(userNameTemplate);

};

elUserList.innerHTML = "";

let appendUser = function (array) {
    array.forEach(function (object) {

        renderUser(object);
    });

    elUserList.appendChild(elFragment);

};


// 2======================================================================


const test = function (id) {
    let elPostFragment = document.createDocumentFragment();

    let renderPost = function (objectPost) {
        let elpostTemplate = postTemplate.cloneNode(true);

        elpostTemplate.querySelector(".js-post-title").textContent = objectPost.title;
        elpostTemplate.querySelector(".js-post-body").textContent = objectPost.body;
        elpostTemplate.querySelector(".post-btn").setAttribute("data-id", `${objectPost.id}`)

        elPostFragment.appendChild(elpostTemplate);
    };

    let appenPost = function (postarray) {
        let nimadir = postarray.filter((el) => el.userId == id);
        nimadir.forEach(function (objectPost) {
            renderPost(objectPost);
        });
        elPostList.appendChild(elPostFragment);
    };

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => appenPost(data))

}


elUserList.addEventListener("click", function (e) {
    elPostList.innerHTML = "";
    let userId = e.target.dataset.id
    test(userId)
});



// 3===============================================================================

const commentsTest = function (idi) {

    let elCommentFragment = document.createDocumentFragment();

    let renderComment = function (objectComment) {
        let elCommentTemplate = commentTemplate.cloneNode(true);

        elCommentTemplate.querySelector(".comment-name").textContent = objectComment.name;
        elCommentTemplate.querySelector(".comment-email").textContent = objectComment.email;
        elCommentTemplate.querySelector(".comment-body").textContent = objectComment.body;

        elCommentFragment.appendChild(elCommentTemplate);
    };

    let appendComment = function (commentarr) {
        let some = commentarr.filter((elem) => elem.postId == idi);
        some.forEach(function (objectComment) {
            renderComment(objectComment);
        });
        elComent.appendChild(elCommentFragment);
    }


    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(data => appendComment(data))
}


elPostList.addEventListener("click", function (ev) {
    elComent.innerHTML = "";
    let postId = ev.target.dataset.id
    commentsTest(postId);
});
console.log();




// Change colors 

function userColors() {
  disco = setInterval(() => {
    elUserList.style.backgroundColor = "lightgreen";

    setTimeout(() => {
        elUserList.style.backgroundColor = "yellow";
    }, 1500);

    setTimeout(() => {
        elUserList.style.backgroundColor = "orange";
    }, 3000);

    setTimeout(() => {
        elUserList.style.backgroundColor = "lightblue";
    }, 4500);

    setTimeout(() => {
        elUserList.style.backgroundColor = "pink";
    }, 6000);

  }, 1000);
}

userColors();


function postsColors() {
  disco = setInterval(() => {
    elPostList.style.backgroundColor = "lightgreen";

    setTimeout(() => {
        elPostList.style.backgroundColor = "yellow";
    }, 1500);

    setTimeout(() => {
        elPostList.style.backgroundColor = "orange";
    }, 3000);

    setTimeout(() => {
        elPostList.style.backgroundColor = "lightblue";
    }, 4500);

    setTimeout(() => {
        elPostList.style.backgroundColor = "pink";
    }, 6000);

  }, 1000);
}

postsColors();


function commentsColors() {
  disco = setInterval(() => {
    elComent.style.backgroundColor = "lightgreen";

    setTimeout(() => {
        elComent.style.backgroundColor = "yellow";
    }, 1500);

    setTimeout(() => {
        elComent.style.backgroundColor = "orange";
    }, 3000);

    setTimeout(() => {
        elComent.style.backgroundColor = "lightblue";
    }, 4500);

    setTimeout(() => {
        elComent.style.backgroundColor = "pink";
    }, 6000);

  }, 1000);
}

commentsColors();