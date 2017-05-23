<?php
require("./lib/webpack.php");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=yes, maximum-scale=3" />

    <link rel="stylesheet" href="<?= webpack::path('application.css') ?>" />
</head>

<body>
    <?php
        var_dump("Hi! It's PHP!");
    ?>

    <div>
        <script src="<?= webpack::path('vendors.js') ?>"></script>
        <script src="<?= webpack::path('application.js') ?>"></script>
    </div>
</body>
</html>
