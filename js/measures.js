const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initJsGrid() {
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

        fields: [
            {name: "id", type: "text", title: "Id", visible: false},
            {name: "tipo", type: "text", title: "Tipo",width:100},
            {name: "misurazione", type: "text", title: "Misurazione"},
            {name: "data", type: "text", title: "Data"},

            /*  serve se volessimo fare la scelta a tendina con valori obbligati
            items:[{Name:"",Id:''}, {Name:"1", Id:'1'},{Name:"0", Id:'0'}],
            valueField: "Id",
            textField: "Name", },*/
            {name: "sensore_id", type: "text", title: "Id Sensore"},
            {type: "control"}
        ]
    });
}