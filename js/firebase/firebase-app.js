// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyA7Gvw4_5p-C07ExQcHCoe5wsek5vX83vs",
	authDomain: "pix-reward-android.firebaseapp.com",
	databaseURL: "https://pix-reward-android-default-rtdb.firebaseio.com",
	projectId: "pix-reward-android",
	storageBucket: "pix-reward-android.appspot.com",
	messagingSenderId: "538818403648",
	appId: "1:538818403648:web:6787f172da4ac7229deea5",
	measurementId: "G-502KH1W2C1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		window.location.replace("/home/");
	}

});

$("#button-signin").on("click", function () {

	var email = document.getElementById('input-email').value;
	var password = document.getElementById('input-password').value;


	if (email === "" || email.length === 0) {
		document.getElementById("input-email").classList.add("is-invalid");
		return;
	}
	if (password === "" || password.length === 0) {
		document.getElementById("input-password").classList.add("is-invalid");
		return;
	} else {
		firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
			$("#static_signin").modal("hide");
		}).catch(function (error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Senha incorreta.');
			} else if (errorCode === 'auth/user-not-found') {
				alert('Usuário não registrado.');
			} else {
				alert(errorMessage);
			}
			alert(error);
			document.getElementById('button-signin').disabled = false;
		});
		document.getElementById('button-signin').disabled = true;
	}
});
