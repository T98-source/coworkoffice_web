var keycloak = new Keycloak('./lib/keycloak.json');

function initKeycloak() {
    keycloak.init({ onLoad: 'check-sso' }).then(function(authenticated) {
        if(authenticated) {
            var ricarica = false;

            if(getCookie("authenticated") == 0) ricarica = true;
            document.cookie = "authenticated=1";

            if(keycloak.realmAccess.roles.includes("admin")) {
                if(getCookie("admin") == 0) ricarica = true;
                document.cookie = "admin=1";
            } else {
                if(getCookie("admin") == 1) ricarica = true;
                document.cookie = "admin=0";
            }
        }
        else{
            if(getCookie("authenticated") == 1) ricarica = true;
            document.cookie = "authenticated=0";
        }

        if(ricarica) window.location.reload(); // Ricarico la pagina per applicare eventuali modifiche

        //alert(authenticated ? 'authenticated' : 'not authenticated');
        if(authenticated) {
            keycloak.loadUserProfile()
                .then(function (profile) {
                    document.getElementById("info_utente").innerHTML += " '" + profile.username + "'";
                }).catch(function () {
                alert('Failed to load user profile');
            });
            initJsGrid();
        }
        else addLinkLogin();

    }).catch(function() {
        //alert('failed to initialize');
    });
}

function login() {
    keycloak.login();
}

function logout() {
    keycloak.logout();
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addLinkLogin(){
    var a = document.createElement('a');
    a.setAttribute("href", "#");
    var h2 = document.createElement('h2');
    h2.addEventListener("click", login);
    h2.innerHTML = "Effettua il login per visitare il sito.";
    a.appendChild(h2);
    var footer = document.getElementById("footer");
    document.body.insertBefore(a, footer);
}