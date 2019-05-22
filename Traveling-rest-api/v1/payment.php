<?php
// Connect to database
include("../connection.php");

$db = new dbObj();
$connection =  $db->getConnstring();

$request_method = $_SERVER["REQUEST_METHOD"];

include("../cros-config.php");

switch ($request_method) {
    case 'GET':
        // Retrive Payment
        if (!empty($_GET["id_payment"]) && !empty($_GET["payment_type"])) {
                $id_payment = intval($_GET["id_payment"]);
                $payment_type = $_GET["payment_type"];

                get_paymentByIdType($id_payment, $payment_type);
            }
        break;
    case 'POST':
 
        break;
    case 'PUT':
 
        break;
    case 'DELETE':
 
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_paymentByIdType($id_payment, $payment_type) {
    global $connection;
    $query = "";

    if($payment_type == "'1'"){
        $query = "SELECT * FROM cardinfo WHERE id_payment = $id_payment";
    }

    if($payment_type == "'0'"){
        $query = "SELECT * FROM bankinfo WHERE id_payment = $id_payment";
    }

    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}


?>

