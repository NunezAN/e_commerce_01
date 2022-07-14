let books; //gloabl variable to hold all book objects once loaded

//function to display all books in all books section
async function renderBrowseBooks(filter) {
  const booksWrapper = document.querySelector(".main__books"); //access the class where want to add books html

  if (!books) {
    booksWrapper.classList += " books__loading";
    books = await getBooks(); //get variable for the array of books mock data
    booksWrapper.classList.remove("books__loading");
  }

  //filter the array of books by filter value
  //.sort() does not return a new array!!!!
  if (filter === "LOW_TO_HIGH") {
    books.sort((a, b) =>
      (a.salePrice || a.originalPrice) > (b.salePrice || b.originalPrice)
        ? 1
        : -1
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort((a, b) =>
      (a.salePrice || a.originalPrice) < (b.salePrice || b.originalPrice)
        ? 1
        : -1
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => (a.rating < b.rating ? 1 : -1));
  }
  //sort by title alphabetically
  else {
    books.sort((a, b) => (a.title > b.title ? 1 : -1));
  }

  const htmlbooks = books.map((book) => {
    //create a new array and map the mock data into html

    return `<div class="book">   
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
    ${getRatingHTML(book)}
    </div>
    <div class="book__price">
    ${getSalesPrice(book)}
    </div>
  </div>`; //toFixed() to turn num into 2 decimal places
  });
  booksWrapper.innerHTML = htmlbooks.join(""); //.join to remove array , separator and turn array into a long string
}

//function to display the book details for featured books section
async function renderFeatureBooks(BookIds) {
  const featurebooksWrapper = document.querySelector(".featured__books"); //access the class where want to add books html

  //check if books are alredy loaded, if not display loading animation until loaded
  if (!books) {
    featurebooksWrapper.classList += " books__loading";
    books = await getBooks(); //get variable for the array of books mock data
    featurebooksWrapper.classList.remove("books__loading");
  }
  //create an array of filtered objects containing onlt the ids that were passed by *BookIds*
  const filteredBooks = books.filter((book) => {
    if (BookIds.indexOf(book.id) !== -1) {
      return book;
    }
  });
  //create a new array and map the mock data into html
  const featuredBooks = filteredBooks.map((book) => {
    return `<div class="book">   
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
    ${getRatingHTML(book)}
    </div>
    <div class="book__price">
    ${getSalesPrice(book)}
    </div>
  </div>`; //toFixed() to turn num into 2 decimal places
  });
  featurebooksWrapper.innerHTML = featuredBooks.join(""); //.join to remove array , separator and turn array into a long string
}

//function to let elements load before running the function to populate books
setTimeout(() => {
  renderBrowseBooks();
  renderFeatureBooks([1, 2, 12, 7]);
});

//function to filter the books displayed according to filter event
function filterBooks(event) {
  const value = event.target.value; //getting the selected value from filter dropdown
  renderBrowseBooks(value);
}

//function that returns the html string for the stars element for the rating
function getRatingHTML(book) {
  let htmlString = ""; //variable to hold the html string

  //loop through the whole number of stars in rating and add element to html string
  for (i = 0; i < Math.floor(book.rating); i++) {
    htmlString += `<i class="fas fa-star"></i>`;
  }
  //check if rating is whole number, if not add half star element to html string
  if (book.rating % 1) {
    htmlString += `<i class="fas fa-star-half-alt"></i>`;
  }
  return htmlString; //return string
}

//function to return saleprice html string
function getSalesPrice(book) {
  //if book has an on sale price, display both originalPrice and salePrice
  if (book.salePrice) {
    return `<span class="book__price--normal">$${book.originalPrice.toFixed(2)}
    </span>$${book.salePrice.toFixed(2)}`;
  }
  //display only originalprice if there is no on-salePrice
  return `$${book.originalPrice.toFixed(2)}`;
}
// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "./assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "./assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "./assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 10.99,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "./assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "./assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "./assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "./assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "./assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "./assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "./assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 3.5,
        },
        {
          id: 11,
          title: "Mastery",
          url: "./assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 12,
          title: "Can't Hurt Me",
          url: "./assets/david goggins.jpeg",
          originalPrice: 19.99,
          salePrice: 17.99,
          rating: 5,
        },
      ]);
    }, 1000);
  });
}
