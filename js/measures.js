const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initGrid(locals, sensors) {
    $("#jsGrid").jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        filtering: true,

        autoload: true,
        pageLoading: false,

        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: RESTAPI + "/measures",
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
                    url: RESTAPI + "/measures",
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
                    url: RESTAPI + "/measures",
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
                    url: RESTAPI + "/measures/" + item.id,
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Bearer " + keycloak.token
                    }
                });
            }
        },

        onDataLoaded: function(args) {
            $("#jsGrid").jsGrid("sort", 3);
            $("#jsGrid").jsGrid("sort", 3); // Ordine decrescente
        },

        fields: [
            {name: "id", type: "text", title: "Id", visible: false},
            {name: "type", type: "text", title: "Tipo"},
            {name: "measurement", type: "text", title: "Misurazione"},
            {name: "dateTime", type: "text", title: "Data e ora"},
            {name: "sensorId", type: "select", items: sensors, valueField: "id", textField: "description", title: "Sensore", filtering: false},
            {name: "localId", type: "select", items: locals, valueField: "id", textField: "description", title: "Locale"},
            {type: "control"}
        ]
    });
}

function initJsGrid(){
    $.ajax({
        type: "GET",
        url: RESTAPI + "/locals",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + keycloak.token
        }
    }).then(function (locals) {
        locals.unshift("");
        $.ajax({
            type: "GET",
            url: RESTAPI + "/sensors",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            }
        }).then(function (sensors) {
            sensors.unshift("");
            initGrid(locals, sensors);
        });
    });
}