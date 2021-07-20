var keycloak = new Keycloak('./lib/keycloak.json');

function initKeycloak() {
    keycloak.init({ onLoad: 'check-sso' }).then(function(authenticated) {
        if(authenticated) {
            jQuery("#div_session_write").load("shared/session_write.php?authenticated=1");
            keycloak.loadUserProfile()
                .then(function(profile) {
                    document.getElementById("info_utente").innerHTML += " '" + profile.email + "'";
                }).catch(function() {
                alert('Failed to load user profile');
            });
        }
        else
            document.cookie = "authenticated=0";

        //alert(authenticated ? 'authenticated' : 'not authenticated');

        initJsGrid();
    }).catch(function() {
        //alert('failed to initialize');
    });
}

function login() {
    keycloak.login();
    document.cookie = "authenticated=1";
}

function logout() {
    keycloak.logout();
    document.cookie = "authenticated=0";
}