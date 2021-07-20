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
                    url: RESTAPI + "/offices",
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
                    url: RESTAPI + "/offices",
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
                    url: RESTAPI + "/offices",
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
                    url: RESTAPI + "/offices/" + item.id,
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
            {
                /*
                 * itemTemplate è una funzione JavaScript che vi permette di definire che cosa deve comparire su ogni riga
                 * all'interno della cella riservata ai pulsanti di controllo
                 */
                itemTemplate: function (value, item) {
                    var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                    /*
                     * Aggiungo un pulsante custom che è un tag button, decorato in questo modo:
                     */
                    var $customButton = $("<button>")
                        // attributi che mi porto dietro da bootstrap, per lo stile
                        .addClass("btn btn-success btn-sm")
                        // Button con testo "Prenota"
                        .text("Prenota")
                        /*
                         * L'azione che deve essere fatta al click del pulsante
                         */
                        .click(function(e) {
                            document.cookie = "ufficioId=" + item.id;
                            window.location.href = '/coworkoffice_web/slots.php';
                        });
                    return $result.add($customButton);
                }
            },
            {type: "control"}
        ]
    });
}
