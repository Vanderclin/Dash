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
		getProfile(display_name, display_email, display_verified);
	} else {
		account_state = false;
		window.location.replace("/");
	}

});

$("#navbar-display-picture").on("click", function () {
	if (account_state) {
		$("#static_profile").modal("show");
	}
});

$("#button-signout").on("click", function () {
	firebase.auth().signOut().then(function () {
		window.location.reload();
	});
});



function getData() {
	var rescue = firebase.database().ref('rescue');
	rescue.orderByChild("withdraw_request_date")limitToFirst(10).on('child_added', function (snapshot) {

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
			wd_email = "N/A";
		} else {
			wd_email = wd_email;
		}
		if (wd_name === null || wd_name === "") {
			wd_name = "N/A";
		} else {
			wd_name = wd_name;
		}
		if (wd_pix === null || wd_pix === "") {
			wd_pix = "N/A";
		} else {
			wd_pix = wd_pix;
		}

		var card = "";
		card += '<div class="col">';
		card += '<div class="card border-dark mb-3">';
		card += '<div class="card-header d-flex">';
		card += '<span class="me-auto d-block">Solicitação de transferência</span>';
		card += '<img class="payment-verification" src="../assets/icons/user_error.png" alt="">';
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


function getProfile(u_name, u_email, u_verified) {
	var modalProfileName = document.getElementById("modal-profile-title-name");
	var modalProfileEmail = document.getElementById("modal-profile-title-email");
	var modalProfileVerified = document.getElementById("modal-profile-verified");
	var modalProfileVerifiedDescription = document.getElementById("modal-profile-verified-description");
	
	if (u_name === null || u_name === "") {
		modalProfileName.innerText = "Não definido";
	} else {
		modalProfileName.innerText = u_name;
	}
	
	if (u_email === null || u_email === "") {
		modalProfileEmail.innerText = "Não definido";
	} else {
		modalProfileEmail.innerText = u_email;
	}
	
	if (u_verified === true) {
		modalProfileVerified.src = "../assets/icons/user_verified.png";
		modalProfileVerifiedDescription.innerText = "Verificado";
	} else {
		modalProfileVerified.src = "../assets/icons/user_unverified.png";
		modalProfileVerifiedDescription.innerText = "Não verificado";
	}
	
}
