'use strict';

const usersContainer = document.querySelector('.users-card');
let displayModel = document.querySelector('.modal-body');
let userName = document.querySelector('.model-user-name');
let userEmail = document.querySelector('.model-user-email');
let userImg = document.getElementsByClassName('model-user-image');
let messagePopUp = document.querySelector('.mes');

let markup;
const renderMarkup = function(data){
    data.data.forEach(data => {
        markup = `
        <div class="col">
            <div class="card shadow-sm">
            <div class="card-body">
                <p class="card-text fw-bold ">${data.first_name}</p>
                <p class="card-email fw-light">${data.email}</p>
                <img src="${data.avatar}" alt="users" class="img-thumbnail" />
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group text-center">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="viewChange(${data.id === 10 ? 101 : data.id})">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onClick="deleteChange(${data.id})">Delete</button>
                    </div>  
                </div>
            </div>
            </div>
        </div>
    `;
    usersContainer.insertAdjacentHTML('beforeend',markup);
    });   
};

function hideloader() {
    document.getElementById('loading')
        .style.display = 'none';
}

var getUsersresult = function() {
fetch('https://reqres.in/api/users?delay=3')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        if(data){
            hideloader();
        } ;
        renderMarkup(data);
        return fetch('https://reqres.in/api/users/?page=2');
    })
    .then((response) => response.json())
    .then((data1) => renderMarkup(data1))
    .catch((error) => console.error('Error', error))
};
getUsersresult();

const viewChange = function(id) {
    fetch(`https://reqres.in/api/users/${id}`)
    .then((response) => response.json())
    .then(function (data) {
        displayModel.style.display = 'block';
        messagePopUp.style.display = "none";

        userName.innerHTML = data.data.first_name;
        userEmail.innerHTML = data.data.email;
        userImg[0].src = data.data.avatar;
    })
    .catch(function (error) {
        displayModel.style.display = 'none';
        messagePopUp.style.display = 'block';
        messagePopUp.innerHTML = `User can not found :)`;
    });
}

// const deleteChange = function(id) {
//     console.log(id);
//     fetch(`https://reqres.in/api/users/${id}`)
//     .then((response) => response.json())
//     .then(function (data) {
//         console.log(data);
//     })
//     .catch((error) => console.error('Error',error))
// }