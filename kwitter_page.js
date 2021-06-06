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
room_name = localStorage.getItem("room_name");
function send() {
      msg = document.getElementById("input_message").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("input_message").value = "";
}
function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name1 = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                        message1 = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        like1 = "<span class='glyphicon glyphicon-thumbs-up'>Like :" + like + "</span> </button> <hr>"
                        row = name1 + message1 + like_button + like1;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();
function updateLike(message_id) {
      console.log("clicked on like button" + message_id);
      button_id = message_id;
      console.log("button_id" + button_id);
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
