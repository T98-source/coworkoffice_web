<header class="p-3 bg-dark text-white">
    <div class="container-head">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul id="nav" class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="index.php" class="nav-link px-2 text-secondary">Home</a></li>
                <?php
                if($_COOKIE["authenticated"] == 1 && $_COOKIE["admin"] == 0) { ?>
                    <li><a href="offices.php" class="nav-link px-2 text-white">Uffici</a></li>
                <?php } ?>
                <?php
                if($_COOKIE["authenticated"] == 1 && $_COOKIE["admin"] == 1) { ?>
                    <li><a href="locals.php" class="nav-link px-2 text-white">Locali</a></li>
                <?php } ?>
                <li><a href="reservations.php" class="nav-link px-2 text-white">Prenotazioni</a></li>
                <?php
                if($_COOKIE["authenticated"] == 1 && $_COOKIE["admin"] == 1) { ?>
                    <li><a href="sensors.php" class="nav-link px-2 text-white">Sensori</a></li>
                    <li><a href="actuators.php" class="nav-link px-2 text-white">Attuatori</a></li>
                    <li><a href="measures.php" class="nav-link px-2 text-white">Misure</a></li>
                <?php } ?>
            </ul>

            <div class="text-end">
                <?php
                    if($_COOKIE["authenticated"] == 1) { ?>
                        <button id="info_utente" onClick="logout()" type="button" class="btn btn-outline-light me-2">Logout</button>
                <?php } else { ?>
                        <button onClick="login()" type="button" class="btn btn-outline-light me-2">Login</button>
                <?php } ?>
            </div>
        </div>
    </div>
</header>