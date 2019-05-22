<?php
// Connect to database
include("../connection.php");

$db = new dbObj();
$connection =  $db->getConnstring();

$request_method = $_SERVER["REQUEST_METHOD"];

include("../cros-config.php");

switch ($request_method) {
    case 'GET':
        // Retrive clients
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            get_getClientById($id);
        } else  {
            get_clients();
        }
        break;
    case 'POST':
    if (!empty($_GET["action"]) && $_GET["action"] == 'login') {
        get_CheckLogin();
    } else if (!empty($_GET["action"]) && $_GET["action"] == 'register') {
        // register
        insert_client();
    }
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

function get_CheckLogin() {
    global $connection;
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data["username"];
    $password = $data["password"];
    $usertype = $data["usertype"];
    $query = '';

    if($usertype === 'admin'){
        $query = "SELECT * FROM admin WHERE 
                username LIKE '" . $username . "' AND  
                password LIKE '" . $password . "' 
        ";

    } else if ($usertype === 'client' ){
        $query = "SELECT * FROM client WHERE 
                username LIKE '" . $username . "' AND  
                password LIKE '" . $password . "' 
        ";    
    }

    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $row['usertype'] = $usertype;
            $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_clients (){
    global $connection;

    $query = "SELECT * FROM client";    
        
    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_getClientById($id){
    global $connection;

    $query = "SELECT * FROM client WHERE id = '" . $id . "' LIMIT 1";

    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}



function insert_client() {
    global $connection;

    $data = json_decode(file_get_contents('php://input'), true);
    $fullName = $data["fullName"];
    $birthday = $data["birthday"];
    $email = $data["email"];
    $username = $data["username"];
    $password = $data["password"];
     
    echo $query = "INSERT INTO client SET 
                    fullName='" . $fullName . "', 
                    birthday='" . $birthday . "', 
                    email='" . $email . "',
                    username='" . $username . "',
                    password='" . $password . "'
                ";

    if (mysqli_query($connection, $query)) {
            $response = array(
                'status' => 1,
                'status_message' => 'Client Added Successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'status_message' => 'Client Addition Failed.'
            );
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}


?>

