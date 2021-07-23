const RESTAPI = "http://127.0.0.1:4567/api/v1.0";

function initJsGrid() {
    $("#jsGrid").jsGrid({
        width: "100%",

        inserting: false,
        editing: false,
        sorting: true,
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

        onDataLoaded: function(args) {
            args.data.forEach( function(item){
                var $row = $("#jsGrid").jsGrid("rowByItem", item);
                if (!item.free) {
                    $row.find("td").css("background-color", "#90EE90");
                }
            })
        },

        fields: [
            {name: "schedule", type: "text", title: "Orario"},
            {name: "date", type: "text", title: "Data"},
            {name: "free", type: "checkbox", title: "Libero", visible: false},
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
                    var $customButton;

                    var $row = $("#jsGrid").jsGrid("rowByItem", item);
                    if (!item.free){
                        $row.find("td").css("background-color", "#90EE90");
                        $customButton = $("<button>")
                            // attributi che mi porto dietro da bootstrap, per lo stile
                            .attr({id: item.schedule + item.date, class: "btn btn-success btn-sm", style: "background-color: brown"})
                            // Button con testo "Prenota"
                            .text("Libera")
                            /*
                             * L'azione che deve essere fatta al click del pulsante
                             */
                            .click(function(e) {
                                manageReservations(item);
                            });
                    } else {
                        $customButton = $("<button>")
                            // attributi che mi porto dietro da bootstrap, per lo stile
                            .attr({id: item.schedule + item.date, class: "btn btn-success btn-sm"})
                            // Button con testo "Prenota"
                            .text("Occupa")
                            /*
                             * L'azione che deve essere fatta al click del pulsante
                             */
                            .click(function (e) {
                                manageReservations(item);
                            });
                    }

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

function manageReservations(item){
    var $row = $("#jsGrid").jsGrid("rowByItem", item);
    if (document.getElementById(item.schedule + item.date).innerHTML == "Libera"){
        if(confirm("Vuoi cancellare questa prenotazione?")) {
            $.ajax({
                type: "DELETE",
                url: RESTAPI + "/slots/" + getCookie("ufficioId"),
                data: JSON.stringify(item),
                contentType: "application/json",
                dataType: "json",
                headers: {
                    "Authorization": "Bearer " + keycloak.token
                },
                success: function() {
                    $row.find("td").css("background-color", "#fcfcfc");
                    document.getElementById(item.schedule + item.date).innerHTML = "Occupa"
                    document.getElementById(item.schedule + item.date).style.backgroundColor = "#198754";
                },
                error: function(){
                    alert("Si è verificato un errore. Riprovare.");
                }
            });
        }
    }
    else {
        var clients = prompt("Clienti stimati:");
        if(!(clients == parseInt(clients))) {// Allora non è un numero intero
            alert("Inserisci un numero intero.");
            return;
        }
        if(clients > 4){
            alert("Non si possono servire più di 4 clienti in un ora.");
            return;
        }

        $.ajax({
            type: "POST",
            url: RESTAPI + "/slots/" + getCookie("ufficioId") + '/' + clients,
            data: JSON.stringify(item),
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            },
            success: function() {
                $row.find("td").css("background-color", "#90EE90");
                document.getElementById(item.schedule + item.date).innerHTML = "Libera"
                document.getElementById(item.schedule + item.date).style.backgroundColor = "brown";
                alert("Prenotazione effettuata con successo.");
            },
            error: function(){
                alert("Si è verificato un errore. Riprovare.");
            }
        });
    }
}