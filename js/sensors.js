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

        insertConfirm: "Vuoi davvero inserire questo item?",
        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: RESTAPI + "/sensors",
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
                    url: RESTAPI + "/sensors",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    dataType: "json",
                    headers: {
                        "Authorization": "Bearer " + keycloak.token
                    }
                });
            },
            updateItem: function (item) {
                return $.ajax({
                    type: "PUT",
                    url: RESTAPI + "/sensors",
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
                        url: RESTAPI + "/sensors/" + item.id,
                        contentType: "application/json",
                        headers: {
                            "Authorization": "Bearer " + keycloak.token
                        }
                    });

            }
        },

        fields: [
            {name: "id", type: "text", title: "Id", visible: false},
            {name: "descrizione", type: "text", title: "Descrizione",width:100},
            {name: "locale_id", type: "text", title: "Id Locale"},
            {type: "control"}
        ]
    });
}