import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import{ ref, uploadBytes , getDownloadURL} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js"

import { auth , storage, } from "./config.js";
import { db } from "./config.js";


const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const profileImage = document.querySelector("#profileimg")


form.addEventListener('submit' , async (event)=>{
    event.preventDefault();
    // console.log(firstName.value);
    // console.log(lastName.value);
    // console.log(email.value);
    // console.log(password.value);
    // console.log(profileImage.files[0]);

    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });

  const profileUploadImg = await showUrl(profileImage.files[0]);
  console.log(profileUploadImg);
    


try {
    const docRef = await addDoc(collection(db, "users"), {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      profileImage: profileUploadImg
      
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(firstName.value , lastName.value , email.value , profileImage.files[0]);
      
} catch (e) {
    console.error("Error adding document: ", e);
  }

    
})






﻿

async function showUrl(files) {
const storageRef = ref(storage, email.value); 
try {
const uploadImg = await uploadBytes(storageRef, files);
const url = await getDownloadURL(storageRef);
console.log(url);
return url;
} catch (error) { console.log(error);
}
}

profileImage.addEventListener('click' , showUrl());







