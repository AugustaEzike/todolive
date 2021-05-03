//PUT request is sent when the edit-btn is clicked. enter event listeners

// const editBtn = document.querySelectorAll(".fa-pen")

const deleteBtn = document.querySelectorAll(".fa-trash")

const completedMission = document.querySelectorAll(".mission span")
const uncompletedMission = document.querySelectorAll(".mission span.completed")

//trigger PUT request with fetch API. fetch(endpoint, options)
// edit.addEventListener('click', update => {{
//     //everytime i click the edit-btn, it creates a new form and updates previous item
    
// })

//DELETE added event listener to the delete elements

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteMission)
})

async function deleteMission(){
    const missionText = this.parentNode.childNodes[0].mission
    try {
        const response = await fetch('deleteMission', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'allMissions': missionText
            })
        })
        const data = await response.json()
        console.log(missionText)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}


//to mark mission completed 

Array.from(completedMission).forEach((el) => {
    el.addEventListener('click', markComplete)
})

async function markComplete(){
    const missionText = this.parentNode.childNodes[0].mission
    try {
        const response = await fetch('completeMission', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'allMissions': missionText
            })
        })
        const data = await response.json()
        console.log(missionText)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}


//to mark uncompleted
Array.from(uncompletedMission).forEach((el) => {
    el.addEventListener('click', undo)
})

async function undo(){
    const missionText = this.parentNode.childNodes[0].mission
    try {
        const response = await fetch('undo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'allMissions': missionText
            })
        })
        const data = await response.json()
        console.log(missionText)
        location.reload()
    } catch (error) {
        console.log(error)
    }
}