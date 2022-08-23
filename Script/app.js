import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import {
    getDatabase, ref, set, push, onValue,
    child, update, remove,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAD8PW00wyNI60J-VGNzx2SewFozFrG06Y",
    authDomain: "todo-app-60121.firebaseapp.com",
    projectId: "todo-app-60121",
    storageBucket: "todo-app-60121.appspot.com",
    messagingSenderId: "322270565225",
    appId: "1:322270565225:web:00d294e80cc092943e63f8",
    measurementId: "G-PZETFS7P73"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databs = getDatabase();
const auth = getAuth();




var userinput = document.getElementById('userinput');
window.additems = function () {
    console.log(userinput.value)
    var time = new Date();
    var obj = {
        text: userinput.value,
        dt: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    }
    var refrence = ref(databs, 'todolist/')
    var newref = push(refrence)
    obj.id = newref.key;
    set(newref, obj);
}

var tododata;

var parent = document.getElementById('parent');
function renderlist() {
    parent.innerHTML = "";
    for (var i = 0; i < tododata.length; i++) {
        parent.innerHTML += ` <div class="d-flex justify-content-center align-items-center p-3">
        <div>
        
            <span class="bg-warning text-white fw-bold w-50  p-2 ">${tododata[i].text}</span><span
                class="bg-warning text-white fw-bold w-50  p-2 ">${tododata[i].dt} </span>
        </div>
        <button type="button" class="btn btn-danger ms-3" onclick="Edititem('${tododata[i].id}')">Edit</button> 
        <button type="button" class="btn btn-danger ms-3" onclick="Delitem('${tododata[i].id}')">Delete</button>

    </div>`;
        userinput.value = "";

    }
};
function getAllTodo() {
    var refrence = ref(databs, 'todolist/');
    onValue(refrence, function (data) {
        tododata = Object.values(data.val())
        renderlist();
    })
}
getAllTodo();

window.Edititem = function (i) {
    var a = prompt("Enter Text" , i)
    var refrence = ref(databs, `todolist/${i}`);
    update(refrence,{text:a})
}

window.Delitem = function (i) {
    var refrence = ref(databs, `todolist/${i}`);
    remove(refrence)
    // onValue(refrence, function (data) {
    //     tododata = Object.values(data.val())
    //     renderlist();
    // })
    
    // console.log(i)
}

window.DelAll = function () {
    var refrence = ref(databs, 'todolist/')
    remove(refrence);
    parent.innerHTML = "";
}



var username = document.getElementById('Username');
var email = document.getElementById('Email');
var password = document.getElementById('Password');
window.btn = function (e) {
    e.preventDefault()
    var obj = {
        username: username.value,
        email: email.value,
        password: password.value,
    }
    console.log(obj)
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("User Created");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User Not Created");
            // ..
        });

};
var emails = document.getElementById('Email2');
var passwords = document.getElementById('Password2');
window.btns = function (e) {
    e.preventDefault()
    var objs = {
        emails: emails.value,
        passwords: passwords.value,
    }
    console.log(objs)
    signInWithEmailAndPassword(auth, objs.emails, objs.passwords)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("User Logedin");
            window.open('./pages/index.html')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User Not Logedin");
            // ..
        });

};

