const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initJsGrid() {
    $("#jsGrid").jsGrid({
        width: "100%",

        inserting: false,
        editing: false,
        sorting: true,
        paging: true,
        filtering: true,

        autoload: true,
        pageLoading: false,

        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: RESTAPI + "/slots/" + getCookie("ufficioId"),
                    data: filter,
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Bearer " + keycloak.token
                    }
                });
            }
        },

        rowClick: function(args) {
            var $row = this.rowByItem(args.item);
            if(window.clickButton) {
                if (document.getElementById(args.item.orario + args.item.data).innerHTML == "Libera"){
                    if(confirm("Vuoi cancellare questa prenotazione?")) {
                        $.ajax({
                            type: "DELETE",
                            url: RESTAPI + "/slots/" + getCookie("ufficioId"),
                            data: JSON.stringify(args.item),
                            contentType: "application/json",
                            dataType: "json",
                            headers: {
                                "Authorization": "Bearer " + keycloak.token
                            },
                            success: function() {
                                $row.removeClass("green");
                                $row.toggleClass("white");
                                document.getElementById(args.item.orario + args.item.data).innerHTML = "Occupa"
                                document.getElementById(args.item.orario + args.item.data).style.background = "#198754";
                            },
                            error: function(){
                                alert("Si è verificato un errore. Riprovare.");
                            }
                        });
                    }
                }
                else {
                    var clienti = prompt("Clienti stimati:");
                    if(!(clienti == parseInt(clienti))) {// Allora non è un numero intero
                        alert("Inserisci un numero intero.");
                        return;
                    }
                    if(clienti > 4){
                        alert("Non si possono servire più di 4 clienti in un ora.");
                        return;
                    }

                    $.ajax({
                        type: "POST",
                        url: RESTAPI + "/slots/" + getCookie("ufficioId") + '/' + clienti,
                        data: JSON.stringify(args.item),
                        contentType: "application/json",
                        dataType: "json",
                        headers: {
                            "Authorization": "Bearer " + keycloak.token
                        },
                        success: function() {
                            $row.removeClass("white");
                            $row.toggleClass("green");
                            document.getElementById(args.item.orario + args.item.data).innerHTML = "Libera"
                            document.getElementById(args.item.orario + args.item.data).style.background = "brown";
                            alert("Prenotazione effettuata con successo.");
                        },
                        error: function(){
                            alert("Si è verificato un errore. Riprovare.");
                        }
                    });
                }
                window.clickButton = false;
            }
        },

        fields: [
            {name: "orario", type: "text", title: "Orario"},
            {name: "data", type: "text", title: "Data"},
            {name: "libero", type: "checkbox", title: "Prenota", visible: false},
            {
                /*
                 * itemTemplate è una funzione JavaScript che vi permette di definire che cosa deve comparire su ogni riga
                 * all'interno della cella riservata ai pulsanti di controllo
                 */
                itemTemplate: function (value, item) {
                    window.clickButton = false;
                    var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                    /*
                     * Aggiungo un pulsante custom che è un tag button, decorato in questo modo:
                     */
                    var $customButton = $("<button>")
                        // attributi che mi porto dietro da bootstrap, per lo stile
                        .attr({id: item.orario + item.data, class: "btn btn-success btn-sm"})
                        // Button con testo "Prenota"
                        .text("Occupa")
                        /*
                         * L'azione che deve essere fatta al click del pulsante
                         */
                        .click(function(e) {
                            window.clickButton = true;
                        });
                    return $result.add($customButton);
                }
            }
        ]
    });
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