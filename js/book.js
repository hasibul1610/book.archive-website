// Arrow function to load the collection of books 
const loadBooks = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value ;

    // Clear the Input field 
    searchField.value = '';

    // Loading the search result giving book name dynamically 
    const url = `https://openlibrary.org/search.json?q=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data));
}

// Arrow function to display the search result in the Client side 
const displayResult = data =>{  
    // Getting the field to display Result Counter 
    const resultCounter = document.getElementById('result-counter');
    resultCounter.textContent = '';

    // Getting the field to display Error Message 
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent ='';

    if(data.docs.length===0){
        //Displaying Error Message
        const h3 = document.createElement('h3');
        h3.classList.add('text-center');
        h3.innerHTML=`Result not Found! Try with vaild book name`;
        errorMessage.appendChild(h3);
        
    }else{
        //Displaying the Result Counter
        const div = document.createElement('div');
        div.classList.add('text-center');
        div.innerHTML = `
            <h3>Showing First ${data.docs.length} Results from total founded ${data.numFound} results</h3>
        `;
        resultCounter.appendChild(div);
    }
    
    // Displaying The Search Result 
    const books = data.docs;

    //console.log(books);

    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent='';
    books.forEach(book =>{ 

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Book Title: ${book.title}</h5>
                  <h6> Author Name: ${book.author_name}</h6>
                  <h6> Publisher: ${book.publisher}</h6>
                  <h6> First Publish Year: ${book.first_publish_year}</h6>
                </div>
              </div>
        `;
        resultContainer.appendChild(div);
        
    });
    

    // console.log(data);
}