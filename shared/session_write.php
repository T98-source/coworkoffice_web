<?php
    session_start();

    if (isset($_GET['authenticated'])) {$_SESSION['authenticated'] = $_GET['authenticated'];}

