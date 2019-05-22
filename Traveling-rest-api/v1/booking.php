<?php
// Connect to database
include("../connection.php");

$db = new dbObj();
$connection =  $db->getConnstring();

include("../cros-config.php");

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        // Retrive Bookings
        if (!empty($_GET["id"])) {
                $id = intval($_GET["id"]);
                get_booking($id);
            } else  {
                get_bookings();
            }
        break;
    case 'POST':
        // Insert Booking
        insert_booking();
        break;
    case 'PUT':
        // Update Booking
        $id = intval($_GET["id"]);
        update_booking($id);
        break;
    case 'DELETE':
        // Delete Booking
        $id = intval($_GET["id"]);
        delete_booking($id);
        break;
    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function get_bookings() {
    global $connection;
    $query = "SELECT @CountRow := @CountRow+ 1 AS id,
                b.firstName, b.lastName, b.email, b.address, 
                b.addressOpt, b.country, b.state, 
                b.zipCode, b.paymentMethod, f.fromCity, 
                f.toCity, f.departureDate, f.returnDate, 
                f.departureHour, f.returnHour, f.airlineName, f
                .flightDuration, f.classType, f.isFoodInkl, 
                f.seatsNbr, f.price, p.id_payment FROM payment p 
                INNER JOIN flight f on f.id = p.id_flight 
                INNER JOIN booking b on b.id = p.id_booking
                JOIN (SELECT @CountRow := 0) r";
     
    $response = array();
    $result = mysqli_query($connection, $query);
    while ($row = mysqli_fetch_assoc($result)) {
            $response[] = $row;
        }
        
    header('Content-Type: application/json');
    echo json_encode($response);
}

function get_booking($id = 0) {
    global $connection;
    $query = "SELECT * FROM booking";
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

function insert_booking() {
    global $connection;

    $data = json_decode(file_get_contents('php://input'), true);

    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $email = $data["email"];
    $address = $data["address"];
    $addressOpt = $data["addressOpt"];
    $country = $data["country"];
    $state = $data["state"];
    $zipCode = $data["zipCode"];

    
    $paymentMethod = $data["paymentMethod"];
    //$paymentInfos = $data["paymentInfos"];
    $id_flight = $data["id_flight"];
    
    $id_booking = null;
    $id_payment = null;

            echo $query_booking = "INSERT INTO booking SET 
                                    firstName='" . $firstName . "', 
                                    lastName='" . $lastName . "', 
                                    email='" . $email . "',
                                    address='" . $address . "',
                                    addressOpt='" . $addressOpt . "',
                                    country='" . $country . "',
                                    state='" . $state . "',
                                    zipCode='" . $zipCode . "',
                                    paymentMethod='" . $paymentMethod . "'
                                ";

        if (mysqli_query($connection, $query_booking)) {
            $id_booking = mysqli_insert_id($connection);           
            } else {
                $response = array(
                    'status' => 0,
                    'status_message' => 'Booking Addition Failed.' 
                );
            }

            echo $query_payment = "INSERT INTO payment SET 
                                    id_booking='" . $id_booking . "', 
                                    id_flight='" . $id_flight . "'
                                ";

        if (mysqli_query($connection, $query_payment)) {
            $id_payment = mysqli_insert_id($connection);
                $response = array(
                    'status' => 0,
                    'status_message' => 'Booking Addition Successful.'
                );
            } else {
                $response = array(
                    'status' => 0,
                    'status_message' => $paymentMethod
                );
            }

    //credit / paymentMethod = true
    if($paymentMethod == true) {
        $cardInfo = $data;//$paymentInfos["credit"];

        echo $query_cardInfo = "INSERT INTO cardInfo SET 
        cardHolder='" .  $cardInfo["cardHolder"] . "', 
        cardNumber='" . $cardInfo["cardNumber"] . "', 
        expiryMonth='" . $cardInfo["expiryMonth"] . "',
        expiryYear='" . $cardInfo["expiryYear"] . "',
        cvvCode='" . $cardInfo["cvvCode"] . "',
        id_payment='" . $id_payment . "'
    ";
    
            if (mysqli_query($connection, $query_cardInfo)) {
                $id_cardInfo = mysqli_insert_id($connection);
            } else {
                $response = array(
                    'status' => 0,
                    'status_message' => 'CardInfo Addition Failed.'
                );
            }

    //debit / paymentMethod = false
    } else {
        $bankInfo = $data; //$paymentInfos["debit"];

        echo $query_bankInfo = "INSERT INTO bankInfo SET 
                                bankHolder='" . $bankInfo["bankHolder"] . "', 
                                ibanNumber='" . $bankInfo["ibanNumber"] . "', 
                                bankName='" . $bankInfo["bankName"] . "',
                                expiryMonth='" . $bankInfo["expiryMonth"] . "',
                                expiryYear='" . $bankInfo["expiryYear"] . "',
                                id_payment='" . $id_payment . "'
                            ";
                if (mysqli_query($connection, $query_bankInfo)) {
                    $id_bankInfo = mysqli_insert_id($connection);
                } else {
                    $response = array(
                        'status' => 0,
                        'status_message' => 'BankInfo Addition Failed.'              
                    );
                }   
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

function update_booking($id) {
 
}

function delete_booking($id) {
    global $connection;
    $query = "DELETE FROM booking WHERE id=" . $id;
    if (mysqli_query($connection, $query)) {
            $response = array(
                'status' => 1,
                'status_message' => 'Booking Deleted Successfully.'
            );
        } else {
            $response = array(
                'status' => 0,
                'status_message' => 'Booking Deletion Failed.'
            );
        }
    header('Content-Type: application/json');
    echo json_encode($response);
}


/*
CREATE TABLE IF NOT EXISTS `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addressOpt` varchar(255),
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipCode` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable booking table' AUTO_INCREMENT=1 ;
              
CREATE TABLE IF NOT EXISTS `flight` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `fromCity` varchar(255) NOT NULL COMMENT 'flight name',
  `toCity` varchar(255) NOT NULL COMMENT 'flight toCity',
  `departureDate` date NOT NULL COMMENT 'flight departureDate',
  `returnDate` date  NOT NULL COMMENT 'flight returnDate',
  `departureHour` varchar(255) NOT NULL COMMENT 'flight departureHour',
  `returnHour` varchar(255) NOT NULL COMMENT 'flight returnHour',
  `airlineName` varchar(255) NOT NULL COMMENT 'flight airlineName',
  `flightDuration` varchar(255) NOT NULL COMMENT 'flight flightDuration',
  `classType` varchar(255) NOT NULL COMMENT 'flight classType',
  `isFoodInkl` int(2) NOT NULL COMMENT 'flight isFoodInkl',
  `seatsNbr` int(11) NOT NULL COMMENT 'flight seatsNbr',
  `price` double NOT NULL COMMENT 'flight price',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable flight table' AUTO_INCREMENT=1 ;

--

CREATE TABLE IF NOT EXISTS `payment` (
  `id_payment` int(11) NOT NULL AUTO_INCREMENT,
  `id_booking` int(11) NOT NULL,
  `id_flight` int(11) NOT NULL,
  PRIMARY KEY (`id_payment`),
  CONSTRAINT PAYMENT_FLIGHT_FK FOREIGN KEY (id_flight) REFERENCES flight (id)  ON DELETE CASCADE,
  CONSTRAINT PAYMENT_BOOKING_FK FOREIGN KEY (id_booking) REFERENCES booking (id)  ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable payment table' AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `cardInfo` (
  `id_cardInfo` int(11) NOT NULL AUTO_INCREMENT,
  `cardHolder` varchar(255) NOT NULL,
  `cardNumber` varchar(255) NOT NULL,
  `expiryMonth` varchar(255) NOT NULL,
  `expiryYear` varchar(255) NOT NULL,
  `cvvCode` varchar(255) NOT NULL,
  `id_payment` int(11) NOT NULL,
  PRIMARY KEY (`id_cardInfo`),
  CONSTRAINT CARDINFO_PAYMENT_FK FOREIGN KEY (id_payment) REFERENCES payment (id_payment) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable cardInfo table' AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `bankInfo` (
  `id_bankInfo` int(11) NOT NULL AUTO_INCREMENT,
  `bankHolder` varchar(255) NOT NULL,
  `ibanNumber` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `expiryMonth` varchar(255) NOT NULL,
  `expiryYear` varchar(255) NOT NULL,
  `id_payment` int(11) NOT NULL,
  PRIMARY KEY (`id_bankInfo`),
  CONSTRAINT BANKINFO_PAYMENT_FK FOREIGN KEY (id_payment) REFERENCES payment (id_payment) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable bankInfo table' AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
   PRIMARY KEY (`id`),
 ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable admin table' AUTO_INCREMENT=1 ;

 CREATE TABLE IF NOT EXISTS `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  'birthday' date NOT NULL,
   PRIMARY KEY (`id`),
 ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='datatable admin table' AUTO_INCREMENT=1 ;

*/
?>

