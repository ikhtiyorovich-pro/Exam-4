let elUsersList = document.querySelector(".list-users");
let elPostsList = document.querySelector(".list-posts");
let elCommentsList = document.querySelector(".list-comments");


// ===============================================================
let usersTemplate = document.querySelector("#js-user-template").content;
let postsTemplate = document.querySelector("#js-post-template").content;
let commentsTemplate = document.querySelector("#js-comment-template").content;


// Users======================================================================


let elFragment = document.createDocumentFragment();

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => appendUsersList(data));

let renderUsersList = function (object) {
  let usersNameTemplate = usersTemplate.cloneNode(true);

  usersNameTemplate.querySelector(".js-name").textContent = object.name;
  usersNameTemplate.querySelector(".js-user").textContent = object.username;
  usersNameTemplate.querySelector(".js-email").textContent = object.email;
  usersNameTemplate.querySelector(".js-street").textContent = object.address.street;
  usersNameTemplate.querySelector(".js-suite").textContent = object.address.suite;
  usersNameTemplate.querySelector(".js-city").textContent = object.address.city;
  usersNameTemplate.querySelector(".name-btn").value = object.id;

  elFragment.appendChild(usersNameTemplate);
};

elUsersList.innerHTML = "";

let appendUsersList = function (array) {
  array.forEach(function (object) {
    renderUsersList(object);
  });

  elUsersList.appendChild(elFragment);
};

// Posts======================================================================

const testUsersList = function (id) {
  let elPostsFragment = document.createDocumentFragment();

  let renderPostsList = function (objectPost) {
    let elPostsTemplate = postsTemplate.cloneNode(true);

    elPostsTemplate.querySelector(".js-post-title").textContent =
      objectPost.title;
    elPostsTemplate.querySelector(".js-post-body").textContent = objectPost.body;
    elPostsTemplate
      .querySelector(".post-btn")
      .value = objectPost.id;

    elPostsFragment.appendChild(elPostsTemplate);
  };
  // elUsersList.innerHTML = "";

  let appendPostsList = function (postArray) {
    let postChanges = postArray.filter(elementUser => elementUser.userId == id);
    postChanges.forEach(function (objectPost) {
      renderPostsList(objectPost);
    });
    elPostsList.appendChild(elPostsFragment);
  };

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => appendPostsList(data));
};

elUsersList.addEventListener("click", function (evtUser) {
  if (evtUser.target.className == "name-btn") {
    elPostsList.innerHTML = "";
    elCommentsList.innerHTML = "";
    let userId = evtUser.target.value;
    testUsersList(userId);
  }
});

// 3===============================================================================

const commentsFunction = function (postId) {
  let elCommentsFragment = document.createDocumentFragment();

  let renderCommentsList = function (objectComment) {
    let elCommentsTemplate = commentsTemplate.cloneNode(true);

    elCommentsTemplate.querySelector(".comment-name").textContent =
      objectComment.name;
    elCommentsTemplate.querySelector(".comment-email").textContent =
      objectComment.email;
    elCommentsTemplate.querySelector(".comment-body").textContent =
      objectComment.body;

    elCommentsFragment.appendChild(elCommentsTemplate);
  };

  let appendCommentsFunction = function (commentsArray) {
    let postFunction = commentsArray.filter(elementComment => elementComment.postId == postId);
    postFunction.forEach(function (objectComment) {
      renderCommentsList(objectComment);
    });
    elCommentsList.appendChild(elCommentsFragment);
  };

  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(response => response.json())
    .then(data => appendCommentsFunction(data));
};

elPostsList.addEventListener("click", function (evtPost) {
    if(evtPost.target.className == "post-btn"){
        elCommentsList.innerHTML = "";
        let postId = evtPost.target.value;
        commentsFunction(postId);
    }
 
});
