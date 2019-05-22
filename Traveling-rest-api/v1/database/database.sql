-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2019 at 03:12 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelingdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `fullName`, `email`, `username`, `password`) VALUES
(1, 'Hana Ghodhbane', 'hana.ghodhbane@gmail.com', 'demo', 'demo'),
(2, 'Admin User', 'admin@traveling.tn', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `bankinfo`
--

CREATE TABLE `bankinfo` (
  `id_bankInfo` int(11) NOT NULL,
  `bankHolder` varchar(255) NOT NULL,
  `ibanNumber` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `expiryMonth` varchar(255) NOT NULL,
  `expiryYear` varchar(255) NOT NULL,
  `id_payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable payment table';

--
-- Dumping data for table `bankinfo`
--

INSERT INTO `bankinfo` (`id_bankInfo`, `bankHolder`, `ibanNumber`, `bankName`, `expiryMonth`, `expiryYear`, `id_payment`) VALUES
(1, 'Heni Gh', '', 'Comdirect', '09', '2023', 3);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `addressOpt` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipCode` varchar(255) NOT NULL,
  `paymentMethod` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable booking table';

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `firstName`, `lastName`, `email`, `address`, `addressOpt`, `country`, `state`, `zipCode`, `paymentMethod`) VALUES
(2, 'Adem', 'Ben Salah', 'adem.bensalah@gmail.com', 'Rue Amilkar', NULL, 'Tunisia', 'Ras Jebel', '7070', 1),
(3, 'Heni', 'Gh', 'heni.gh@gmail.com', 'Street', '', 'TN', 'Tunis', '7070', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cardinfo`
--

CREATE TABLE `cardinfo` (
  `id_cardInfo` int(11) NOT NULL,
  `cardHolder` varchar(255) NOT NULL,
  `cardNumber` varchar(255) NOT NULL,
  `expiryMonth` varchar(255) NOT NULL,
  `expiryYear` varchar(255) NOT NULL,
  `cvvCode` varchar(255) NOT NULL,
  `id_payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable payment table';

--
-- Dumping data for table `cardinfo`
--

INSERT INTO `cardinfo` (`id_cardInfo`, `cardHolder`, `cardNumber`, `expiryMonth`, `expiryYear`, `cvvCode`, `id_payment`) VALUES
(1, 'Adem Ben Salah', 'TN 4582 6456 6321 6597', '01', '2020', '145', 2);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable admin table';

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `fullName`, `email`, `username`, `password`, `birthday`) VALUES
(1, 'Hani Ghodbane', 'hana.ghodbane@gmail.com', 'hani', '1990', '1990-04-17'),
(2, 'Mohamed Amine', 'mohamed.amine@gmail.com', 'mohamed1987', '1987', '1987-07-07'),
(3, 'Rayen Ben Salah', 'rayen.bensalah@gmail.com', 'rayen2010', '2010', '2010-02-14'),
(4, 'Jamila Ghodbane', 'jamila.ghodbane@gmail.com', 'jamila1976', '1976', '1976-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `id` int(11) NOT NULL COMMENT 'primary key',
  `fromCity` varchar(255) NOT NULL COMMENT 'flight name',
  `toCity` varchar(255) NOT NULL COMMENT 'flight toCity',
  `departureDate` date NOT NULL COMMENT 'flight departureDate',
  `returnDate` date NOT NULL COMMENT 'flight returnDate',
  `departureHour` varchar(255) NOT NULL COMMENT 'flight departureHour',
  `returnHour` varchar(255) NOT NULL COMMENT 'flight returnHour',
  `airlineName` varchar(255) NOT NULL COMMENT 'flight airlineName',
  `flightDuration` varchar(255) NOT NULL COMMENT 'flight flightDuration',
  `classType` varchar(255) NOT NULL COMMENT 'flight classType',
  `isFoodInkl` int(2) NOT NULL COMMENT 'flight isFoodInkl',
  `seatsNbr` int(11) NOT NULL COMMENT 'flight seatsNbr',
  `price` double NOT NULL COMMENT 'flight price'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable flight table';

--
-- Dumping data for table `flight`
--

INSERT INTO `flight` (`id`, `fromCity`, `toCity`, `departureDate`, `returnDate`, `departureHour`, `returnHour`, `airlineName`, `flightDuration`, `classType`, `isFoodInkl`, `seatsNbr`, `price`) VALUES
(1, 'Tunis', 'Frankfurt', '2019-05-14', '2019-05-21', '08:30', '11:30', 'Tunisair', '2:30', 'Business', 1, 300, 350),
(2, 'Tunis', 'Paris', '2019-05-15', '2019-05-22', '12:30', '14:30', 'Air France', '2:00', 'Economy', 0, 200, 500),
(7, 'Paris', 'Wien', '2019-05-04', '2019-05-19', '02:05', '05:20', 'Air France', '3:15', 'Business', 1, 350, 500),
(8, 'Paris', 'Berlin', '2019-05-20', '2019-05-31', '03:05', '05:20', 'Air France', '2:15', 'Business', 1, 350, 500),
(9, 'Tunis', 'Marocco', '2019-05-22', '2019-05-26', '01:00', '02:00', 'Tunisair', '1:0', 'Business', 1, 500, 100);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(11) NOT NULL,
  `id_booking` int(11) NOT NULL,
  `id_flight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='datatable payment table';

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id_payment`, `id_booking`, `id_flight`) VALUES
(2, 2, 1),
(3, 3, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bankinfo`
--
ALTER TABLE `bankinfo`
  ADD PRIMARY KEY (`id_bankInfo`),
  ADD KEY `BANKINFO_PAYMENT_FK` (`id_payment`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cardinfo`
--
ALTER TABLE `cardinfo`
  ADD PRIMARY KEY (`id_cardInfo`),
  ADD KEY `CARDINFO_PAYMENT_FK` (`id_payment`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `PAYMENT_FLIGHT_FK` (`id_flight`),
  ADD KEY `PAYMENT_BOOKING_FK` (`id_booking`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bankinfo`
--
ALTER TABLE `bankinfo`
  MODIFY `id_bankInfo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cardinfo`
--
ALTER TABLE `cardinfo`
  MODIFY `id_cardInfo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `flight`
--
ALTER TABLE `flight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bankinfo`
--
ALTER TABLE `bankinfo`
  ADD CONSTRAINT `BANKINFO_PAYMENT_FK` FOREIGN KEY (`id_payment`) REFERENCES `payment` (`id_payment`) ON DELETE CASCADE;

--
-- Constraints for table `cardinfo`
--
ALTER TABLE `cardinfo`
  ADD CONSTRAINT `CARDINFO_PAYMENT_FK` FOREIGN KEY (`id_payment`) REFERENCES `payment` (`id_payment`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `PAYMENT_BOOKING_FK` FOREIGN KEY (`id_booking`) REFERENCES `booking` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `PAYMENT_FLIGHT_FK` FOREIGN KEY (`id_flight`) REFERENCES `flight` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
