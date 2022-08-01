$(function () {
  //Kết nối tới server socket đang lắng nghe
  var socket = io.connect("http://localhost:3000/");

  //Socket nhận data và append vào giao diện
  socket.on("send", function (data) {
    console.log(data);
    $("#content").append(
      "<p class='message'>" +
        "<span class='username'>" +
        data.username +
        "</span>" +
        ": " +
        data.message +
        "</p>"
    );
  });

  //Bắt sự kiện click gửi message
  $("#sendMessage").on("click", function () {
    const username = $("#username").val();
    const message = $("#message").val();

    if (username == "" || message == "") {
      alert("Please enter name and message!!");
    } else {
      //Gửi dữ liệu cho socket
      socket.emit("send", { username: username, message: message });
      $("#message").val("");
    }
  });

  $("#message").on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      const username = $("#username").val();
      const message = $("#message").val();
      if (username == "" || message == "")
        alert("Please enter name and message!!");
      else {
        socket.emit("send", { username: username, message: message });
        $("#message").val("");
      }
    }
  });
});
