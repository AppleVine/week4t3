const fs = require('fs');

// For testing in terminal
const testFile = "./students.txt"
const emptyFile = "./empty.txt"

// We're giving you this one - but make sure you understand what is happening in this function
function getData(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) {
              reject(error.message)
            }
            resolve(data);
        })
    })
}

// Given the string `data`, return an array of names
function createList(data) {
    return data.split("\n").filter((val) => val.length > 0)
}

function createGroup(list,size) {
    if((!list || list.length === 0) && size > 0) {
        throw new Error("List is empty. Cannot create a group of size " + size)
    }
    if(size > list.length){
        throw new Error("Group too large. Size limited to " + list.length)
    }
        
    let group = [];
    let listsplit = [...list];
    for (let i=0; i<size; i++) {
        random = Math.floor(Math.random() * listsplit.length)
        group.push(listsplit.splice(random, 1)[0]);
    }
    return group
}


function getStudentList(file, size) {
    return getData(file)
        .then((data) => createList(data))
        .then((array) => createGroup(array, size)) 
        .catch((error) => {
            throw error.message;
        });
}


// For testing in terminal
getStudentList(testFile, 2).then((list) => console.log(list))  // should print an array with 2 names
getStudentList(emptyFile, 2).then((data) => console.log(data)).catch((error) => console.log(error)) // should print List is empty error
getStudentList(testFile, 50).then((data) => console.log(data)).catch((error) => console.log(error)) // should print Group too large error


module.exports = {getData, getStudentList}