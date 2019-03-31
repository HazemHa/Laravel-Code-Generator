<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AutoLaravelCodeGenerator -Server status</title>
</head>

<body>
    <h1>Wellcome welcome</h1>
    <p>
        <?php
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 1000');
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
            }

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
                header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
            }
        }
        if (isset($_POST['type'])) {
            $dir = $_SERVER['DOCUMENT_ROOT'] . "/LaravelGenerateCodeFolders/";
            mkdir($dir, 0755, true);


            try {
                $pathToSaveFile = $dir . $_POST['type'] . "/";
                mkdir($pathToSaveFile, 0755, true);
                $fp = fopen($pathToSaveFile . $_POST['name'], "wb");
                fwrite($fp, $_POST['content']);
                fclose($fp);
                return json_encode(['sucess' => 'create file done', 'fileName' => $_POST['name']]);
            } catch (Exception $e) {
                return json_encode($e->getMessage());
            }
        }


        ?>
    </p>
</body>

</html>