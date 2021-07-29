const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initGrid(offices) {
    $("#jsGrid").jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: false,
        filtering: true,

        autoload: true,
        pageLoading: false,

        deleteConfirm: "Vuoi davvero eliminare questa prenotazione?",

        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: RESTAPI + "/reservations",
                    data: filter,
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Bearer " + keycloak.token
                    }
                });
            },

            deleteItem: function (item) {
                return $.ajax({
                    type: "DELETE",
                    url: RESTAPI + "/reservations/" + item.id,
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Bearer " + keycloak.token
                    }
                });
            }
        },

        onDataLoaded: function(args) {
            $("#jsGrid").jsGrid("sort", 2);
        },

        fields: [
            {name: "id", type: "text", title: "Id", visible: false},
            {name: "date", type: "text", title: "Data"},
            {name: "startHour", type: "number", title: "Ora Inizio"},
            {name: "finalHour", type: "number", title: "Ora Fine"},
            {name: "clients", type: "number", title: "Numero Clienti", filtering: false},
            {name: "officeId", type: "select", items: offices, valueField: "id", textField: "description", title: "Ufficio"},
            {name: "userId", type: "text", title: "Id Utente", visible: false},
            {type: "control"}
        ]
    });
}

function initJsGrid(){
    $.ajax({
        type: "GET",
        url: RESTAPI + "/offices",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + keycloak.token
        }
    }).then(function (offices) {
        offices.unshift("");
        initGrid(offices);
    });
}