var firebaseConfig = {
      apiKey: "AIzaSyDOE0ZDbapTYVYkiGUNdHPwOW50cEp5hJo",
      authDomain: "kwitter-edb71.firebaseapp.com",
      databaseURL: "https://kwitter-edb71-default-rtdb.firebaseio.com",
      projectId: "kwitter-edb71",
      storageBucket: "kwitter-edb71.appspot.com",
      messagingSenderId: "173797673656",
      appId: "1:173797673656:web:c5aca7ba5f361eedc4824d",
      measurementId: "G-WRW6DH8J02"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " ! ";
function add_room() {
      room_name = document.getElementById("room_input").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("room_name - " + Room_names);
                  row = "<div class='room_name' id = " + Room_names + " onclick='redirect(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();
function redirect(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
function logout()
{
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}