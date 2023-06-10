const form = document.querySelector("#book-form")
const tableList = document.querySelector("#book-list")
window.addEventListener("DOMContentLoaded",(e)=>{
    let books = JSON.parse(localStorage.getItem("books"))
    books.forEach(kitaab => createRow(kitaab.title,kitaab.author, kitaab.isbn));
})
//console.log(form)
//console.log(tableList)



form.addEventListener("submit", (e)=> {
    e.preventDefault()
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value
    //console.log(title, author, isbn)

    if (title==='' || author==='' || isbn===''){
        alert("Pls fill all the credentials")
    }

    const book = {title:title,author,isbn}
    clearAllFields()
    createRow(title,author,isbn)
    addRow(book)
    

   

})


tableList.addEventListener("click",(e) =>{
    removeRow(e)
    let books = JSON.parse(localStorage.getItem("books"))
    const isbn = e.target.parentElement.previousElementSibling.textContent
    const newbooks = books.filter(book => book.isbn!==isbn)
    localStorage.setItem("books",JSON.stringify(newbooks))

})






function clearAllFields(){
    document.querySelector("#title").value =''
    document.querySelector("#author").value =''
    document.querySelector("#isbn").value =''
    //console.log(book)
}


function createRow(title,author,isbn){
    let tr = document.createElement("tr")

    tr.innerHTML=`
    <td>${title}</td>
    <td>${author}</td>
    
    <td>${isbn}</td>
    <td><a href="#" class="btn btn-danger float-right delete">X</td>
    `

    tableList.appendChild(tr)
}

function addRow(book){
    let newBook;
    if (localStorage.getItem("books")===null){
        newBook = []

    }
    else{
        newBook= JSON.parse(localStorage.getItem("books"))
    }
    newBook.push(book)
    localStorage.setItem("books" ,JSON.stringify(newBook))

}

function removeRow(e){
    if(e.target.classList.contains("delete"))
    {
        tableList.removeChild(e.target.parentElement.parentElement)
    }
}

