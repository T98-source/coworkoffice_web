const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initJsGrid() {
    $("#jsGrid").jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: false,
        filtering: true,

        autoload: true,
        pageLoading: false,


        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete data?",
        insertConfirm: "Vuoi davvero inserire questo item?",


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
            insertItem: function (item) {
                return $.ajax({
                    type: "POST",
                    url: RESTAPI + "/reservations",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    dataType: "json",
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
        fields: [
            {name: "id", type: "text", title: "Id", visible: false},
            {name: "descrizione", type: "text", title: "Descrizione"},
            {name: "data", type: "text", title: "Data"},
            {name: "ora_inizio", type: "text", title: "Ora Inizio"},
            {name: "ora_fine", type: "text", title: "Ora Fine"},
            {name: "clienti", type: "text", title: "Numero Clienti"},
            {name: "ufficio_id", type: "text", title: "Id Ufficio"},
            {name: "utente_id", type: "text", title: "Id Utente"},
            {type: "control"}
        ]
    });
}