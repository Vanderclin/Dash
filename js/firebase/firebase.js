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

var account_state;
var display_email;
var display_name;
var display_picture;
var display_verified;
var display_uid;

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		display_email = user.email;
		display_name = user.displayName;
		display_picture = user.photoURL;
		display_uid = user.uid;
		display_verified = user.emailVerified;
		account_state = true;
		getData();
		
		document.getElementById("modal-profile-title-name").innerText = display_name;
		document.getElementById("modal-profile-title-email");
		document.getElementById("modal-profile-verified");
		document.getElementById("modal-profile-verified-description");
		
		
	} else {
		account_state = false;
	}

});

$("#navbar-display-picture").on("click", function () {
	if (account_state) {
		$("#static_profile").modal("show");
	} else {
		$("#static_signin").modal("show");
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

$("#button-signout").on("click", function () {
	firebase.auth().signOut().then(function () {
		window.location.reload();
	});
});



function getData() {
	var rescue = firebase.database().ref('rescue');
	rescue.orderByChild("withdraw_request_date").on('child_added', function (snapshot) {

		var wd_amount = snapshot.child("withdraw_request_amount").val();
		var wd_date = snapshot.child("withdraw_request_date").val();
		var wd_email = snapshot.child("withdraw_request_email").val();
		var wd_name = snapshot.child("withdraw_request_username").val();
		var wd_pix = snapshot.child("withdraw_request_pix").val();

		if (wd_amount === null || wd_amount === "") {
			wd_amount = "R$00,00";
		} else {
			wd_amount = wd_amount;
		}
		if (wd_date === null || wd_date === "") {
			wd_date = "00/00/0000";
		} else {
			wd_date = wd_date;
		}
		if (wd_email === null || wd_email === "") {
			wd_email = "não definido";
		} else {
			wd_email = wd_email;
		}
		if (wd_name === null || wd_name === "") {
			wd_name = "não definido,";
		} else {
			wd_name = wd_name;
		}
		if (wd_pix === null || wd_pix === "") {
			wd_pix = "não definido";
		} else {
			wd_pix = wd_pix;
		}

		var card = "";
		card += '<div class="col">';
		card += '<div class="card border-dark mb-3">';
		card += '<div class="card-header d-flex">';
		card += '<span class="me-auto d-block">Solicitação de transferência</span>';
		card += '<img class="payment-verification" src="assets/icons/user_verified.png" alt="">';
		card += '</div>';
		card += '<div class="card-body">';
		card += '<span class="d-block"><strong>Usuário: </strong>'+wd_name+'</span>';
		card += '<span class="d-block"><strong>E-mail: </strong>'+wd_email+'</span>';
		card += '<span class="d-block"><strong>Solicitado: </strong>'+wd_date+'</span>';
		card += '<span class="d-block"><strong>Valor: </strong>'+wd_amount+'</span>';
		card += '<span class="d-block"><strong>Chave Pix: </strong>'+wd_pix+'</span>';
		card += '</div>';
		card += '</div>';
		card += '</div>';
		$("#content-private").html($("#content-private").html() + card);
	});
}
