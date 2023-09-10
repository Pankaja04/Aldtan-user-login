-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 09, 2023 at 06:22 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aldtan`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `url` varchar(355) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `url`, `status`) VALUES
(31, 'Admin@gmail.com', 'Admin', '$2a$08$Phfvv2ywyx5dRHN0E4gdNuDCH6mek1iKKL7.XlCENNXAcCUKihgDK', 'projects/users/Admin@gmail.com', '$2a$08$197/w6GX7rvFRxB14lDfMeQEya.jPUHxuf9hYaNph4nkJgBm53EIW'),
(32, 'Admin2@gmail.com', 'Admin2', '$2a$08$Mqa7rXUUuHK7zvA89RuOROQ31IXoRG9ZktobY8m.SQwM6P.G698J.', 'projects/users/Admin2@gmail.com', '$2a$08$PpNy/gsC8yASfv9eo2EtzeYmnJsGwEpdgtm6HPwiU7DAAvwLqpxvm'),
(33, 'Admin3@gmail.com', 'Admin3', '$2a$08$MyuviNuXumUI83NUb82eRe3f7SihzQLUxDNGgjBK.15wjFL.n.90u', 'projects/users/Admin3@gmail.com', '$2a$08$EO3rLHx5bWppiM8xQtGkb.iggFXGDvPAtBiQgRTxiEl1ux7287cZK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
