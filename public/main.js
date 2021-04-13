

// PUT
// const update = document.querySelector('.completed')

// update.addEventListener('click', updateOne)

// function updateOne() => {
//     //send PUTrequest here
//     fetch('/todo' {
//         method: 'put'
//     })
// }


//DELETE

const deleteBtn = doocument.querySelectorAll("delete-btn")
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteToDo)
})

function deleteTodo() {
    alert("you clicked delete");
}
    
