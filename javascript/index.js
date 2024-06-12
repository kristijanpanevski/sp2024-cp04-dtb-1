// Data url
const dataURL = "/data/posts.json";

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((i) => i.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Function to open the login popup
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

// Function to close the login popup
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// Function to open the newsletter popup
function openNewsletter() {
  document.querySelector(".newsletterPopup").style.display = "flex";
}

// Function to close the newsletter popup
function closeNewsletter() {
  document.querySelector(".newsletterPopup").style.display = "none";
}

// Event listeners for login popup
document
  .querySelector(".open-button")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    openForm();
  });

// Event listeners for newsletter popup
document
  .getElementById("NewsletterPopUp")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openNewsletter();
  });

document
  .querySelector(".newsletterPopup .close-button")
  .addEventListener("click", closeNewsletter);

// Close the login popup when clicking outside of it
window.addEventListener("click", function (event) {
  const form = document.getElementById("myForm");
  if (
    event.target !== form &&
    !form.contains(event.target) &&
    form.style.display === "block"
  ) {
    closeForm();
  }
});

// Selctors
const postsContainer = document.querySelector(".main-posts-container");

const fetchPosts = async () => {
  try {
    const response = await fetch("/javascript/data/posts.json");
    const data = await response.json();

    console.log(data);
    renderPosts(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Render function for newest posts
const renderPosts = (posts) => {
  let postHTML = "";

  posts.map((post) => {
    postHTML += `<div class="post-container">
            <div class="blog-post">
              <div class="blog-post_img">
                <img
                  src=${post.image}
                  alt=""
                  height="45px"
                />
              </div>
              <div class="blog-post_info">
                <h1 class="blog-post_title">${post.title}</h1>
                <p class="blog-post_text">
                ${post.description}
                </p>
                <div class="blog-post_button_and_date">
                  <div>
                    <button class="blog-post_button">Read More</button>
                  </div>
                  <div class="blog-post_date">
                    <small>${post.author}</small>
                    <small>${post.date}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

    postsContainer.innerHTML = postHTML;
  });
};

fetchPosts();
