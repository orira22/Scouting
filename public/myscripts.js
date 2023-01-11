var currentPage = 1;

function nextPage() {
  if (currentPage < 4) {
    document.getElementById("page" + currentPage).style.display = "none";
    currentPage++;
    document.getElementById("page" + currentPage).style.display = "block";
  }
}

function prevPage() {
  if (currentPage > 1) {
    document.getElementById("page" + currentPage).style.display = "none";
    currentPage--;
    document.getElementById("page" + currentPage).style.display = "block";
  }
}

// Show the first page when the form loads
document.getElementById("page1").style.display = "block";

//form submit function
function submitForm() {
  alert("Form Submitted!");
}

//adding submitForm() as an onsubmit event to the form
document.getElementById("myForm").onsubmit = submitForm;


function increment(id_) {
  var input = document.getElementById(id_);
  input.value = parseInt(input.value) + 1;
}

function decrement(id_) {
  var input = document.getElementById(id_);
  input.value = parseInt(input.value) - 1;
}
