<?php
// Connect to database
include("../connection.php");

$db = new dbObj();
$connection =  $db->getConnstring();

$request_method = $_SERVER["REQUEST_METHOD"];

include("../cros-config.php");

switch ($request_method) {
    case 'GET':
        // Retrive Flights
        if (!empty($_GET["id"])) {
                $id = intval($_GET["id"]);
                get_flight($id);
            } else  {
                get_flights();
            }
        break;
    case 'POST':
    if (!empty($_GET["action"]) && $_GET["action"]== 'search') {
         get_SearchFlights();
    } else {
        // Insert Flight
        insert_flight();
    }
        break;
    case 'PUT':
        // Update Flight
        $id = intval($_GET["id"]);
        update_flight($id);
        break;
    case 'DELETE':
        // Delete Flight
        $id = intval($_GET["id"]);
        delete_flight($id);
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_flights() {
    global $connection;
    $query = "SELECT * FROM flight";
    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_SearchFlights() {
    global $connection;
    $data = json_decode(file_get_contents('php://input'), true);

    $fromCity = $data["fromCity"];
    $toCity = $data["toCity"];
    $departureDate = $data["departureDate"];
    $returnDate = $data["returnDate"];
    $passengerNbr = $data["passengerNbr"];

    $query = "SELECT * FROM flight WHERE 
                  fromCity LIKE '" . $fromCity . "' AND 
                  toCity LIKE '" . $toCity . "' AND
                  departureDate >= '" . $departureDate . "' AND 
                  returnDate >= '" . $returnDate . "'
            ";
   //need to compare availibility of seats


    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_flight($id = 0) {
    global $connection;
    $query = "SELECT * FROM flight";
    if ($id != 0) {
            $query .= " WHERE id=" . $id . " LIMIT 1";
        }
    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function insert_flight() {
    global $connection;

    $data = json_decode(file_get_contents('php://input'), true);
    $fromCity = $data["fromCity"];
    $toCity = $data["toCity"];
    $departureDate = $data["departureDate"];
    $returnDate = $data["returnDate"];
    $departureHour = $data["departureHour"];
    $returnHour = $data["returnHour"];
    $airlineName = $data["airlineName"];
    $flightDuration = $data["flightDuration"];
    $classType = $data["classType"];
    $isFoodInkl = $data["isFoodInkl"];
    $seatsNbr = $data["seatsNbr"];
    $price = $data["price"];
     
    echo $query = "INSERT INTO flight SET 
                    fromCity='" . $fromCity . "', 
                    toCity='" . $toCity . "', 
                    departureDate='" . $departureDate . "',
                    returnDate='" . $returnDate . "',
                    departureHour='" . $departureHour . "',
                    returnHour='" . $returnHour . "',
                    airlineName='" . $airlineName . "',
                    flightDuration='" . $flightDuration . "',
                    classType='" . $classType . "',
                    isFoodInkl='" . $isFoodInkl . "',
                    seatsNbr='" . $seatsNbr . "',
                    price='" . $price . "'
                ";
    if (mysqli_query($connection, $query)) {
            $response = array(
                'status' => 1,
                'status_message' => 'Flight Added Successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'status_message' => 'Flight Addition Failed.'
            );
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_flight($id) {
    global $connection;
    $post_vars = json_decode(file_get_contents("php://input"), true);
    $fromCity = $post_vars["fromCity"];
    $toCity = $post_vars["toCity"];
    $departureDate = $post_vars["departureDate"];
    $returnDate = $post_vars["returnDate"];
    $departureHour = $post_vars["departureHour"];
    $returnHour = $post_vars["returnHour"];
    $airlineName = $post_vars["airlineName"];
    $flightDuration = $post_vars["flightDuration"];
    $classType = $post_vars["classType"];
    $isFoodInkl = $post_vars["isFoodInkl"];
    $seatsNbr = $post_vars["seatsNbr"];
    $price = $post_vars["price"];
     
    $query = "UPDATE flight SET  
                fromCity='" . $fromCity . "', 
                toCity='" . $toCity . "', 
                departureDate='" . $departureDate . "',
                returnDate='" . $returnDate . "',
                departureHour='" . $departureHour . "',
                returnHour='" . $returnHour . "',
                airlineName='" . $airlineName . "',
                flightDuration='" . $flightDuration . "',
                classType='" . $classType . "',
                isFoodInkl='" . $isFoodInkl . "',
                seatsNbr='" . $seatsNbr . "',
                price='" . $price . "'
                WHERE id=" . $id
            ;

     if (mysqli_query($connection, $query)) {
            $response = array(
                'status' => 1,
                'status_message' => 'Flight Updated Successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'status_message' => 'Flight Updation Failed.'
            );
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}

function delete_flight($id) {
    global $connection;
    $query = "DELETE FROM flight WHERE id=" . $id;
    if (mysqli_query($connection, $query)) {
            $response = array(
                'status' => 1,
                'status_message' => 'Flight Deleted Successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'status_message' => 'Flight Deletion Failed.'
            );
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}



?>

