-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 02, 2019 at 11:02 PM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `bellflight`;

USE `bellflight`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bellflight`
--

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE IF NOT EXISTS `leaderboard` (
  `id` int(250) NOT NULL,
  `f1` int(250) DEFAULT NULL,
  `f2` int(250) DEFAULT NULL,
  `f3` int(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `f1`, `f2`, `f3`) VALUES
(1, 0, 0, 0),
(2, 0, 0, 0),
(3, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE IF NOT EXISTS `performance` (
  `performanceid` int(11) NOT NULL,
  `uid` int(100) DEFAULT NULL,
  `sim` int(100) DEFAULT NULL,
  `userid` varchar(100) DEFAULT NULL,
  `cycletime` int(100) DEFAULT NULL,
  `real_time` decimal(30,6) DEFAULT NULL,
  `totl_time` decimal(30,6) DEFAULT NULL,
  `missn_time` decimal(30,6) DEFAULT NULL,
  `timer_time` decimal(30,6) DEFAULT NULL,
  `zulu_time` decimal(30,6) DEFAULT NULL,
  `local_time` decimal(30,6) DEFAULT NULL,
  `hobbs_time` decimal(30,6) DEFAULT NULL,
  `Vind_kias` decimal(30,6) DEFAULT NULL,
  `Vind_keas` decimal(30,6) DEFAULT NULL,
  `Vtrue_ktas` decimal(30,6) DEFAULT NULL,
  `Vtrue_ktgs` decimal(30,6) DEFAULT NULL,
  `Vind_mph` decimal(30,6) DEFAULT NULL,
  `Vtrue_mphas` decimal(30,6) DEFAULT NULL,
  `Vtrue_mphgs` decimal(30,6) DEFAULT NULL,
  `elev_yoke1` decimal(30,6) DEFAULT NULL,
  `ailrn_yoke1` decimal(30,6) DEFAULT NULL,
  `ruddr_yoke1` decimal(30,6) DEFAULT NULL,
  `elev_astab` decimal(30,6) DEFAULT NULL,
  `ailrn_astab` decimal(30,6) DEFAULT NULL,
  `ruddr_astab` decimal(30,6) DEFAULT NULL,
  `elev_surf` decimal(30,6) DEFAULT NULL,
  `ailrn_surf` decimal(30,6) DEFAULT NULL,
  `ruddr_surf` decimal(30,6) DEFAULT NULL,
  `nwhel_steer` decimal(30,6) DEFAULT NULL,
  `M_ftlb` decimal(30,6) DEFAULT NULL,
  `L_ftlb` decimal(30,6) DEFAULT NULL,
  `N_ftlb` decimal(30,6) DEFAULT NULL,
  `Q_rad` decimal(30,6) DEFAULT NULL,
  `P_rad` decimal(30,6) DEFAULT NULL,
  `R_rad` decimal(30,6) DEFAULT NULL,
  `pitch_deg` decimal(30,6) DEFAULT NULL,
  `roll_deg` decimal(30,6) DEFAULT NULL,
  `hding_true` decimal(30,6) DEFAULT NULL,
  `hding_mag` decimal(30,6) DEFAULT NULL,
  `alpha_deg` decimal(30,6) DEFAULT NULL,
  `beta_deg` decimal(30,6) DEFAULT NULL,
  `hpath_deg` decimal(30,6) DEFAULT NULL,
  `vpath_deg` decimal(30,6) DEFAULT NULL,
  `slip_deg` decimal(30,6) DEFAULT NULL,
  `mag_comp` decimal(30,6) DEFAULT NULL,
  `mavar_deg` decimal(30,6) DEFAULT NULL,
  `lat_deg` decimal(30,6) DEFAULT NULL,
  `lon_deg` decimal(30,6) DEFAULT NULL,
  `alt_ftmsl` decimal(30,6) DEFAULT NULL,
  `alt_ftagl` decimal(30,6) DEFAULT NULL,
  `on_runwy` decimal(30,6) DEFAULT NULL,
  `alt_ind` decimal(30,6) DEFAULT NULL,
  `lat_orign` decimal(30,6) DEFAULT NULL,
  `lon_orign` decimal(30,6) DEFAULT NULL,
  `X_m` decimal(30,6) DEFAULT NULL,
  `Y_m` decimal(30,6) DEFAULT NULL,
  `Z_m` decimal(30,6) DEFAULT NULL,
  `vX_m` decimal(30,6) DEFAULT NULL,
  `vY_m` decimal(30,6) DEFAULT NULL,
  `vZ_m` decimal(30,6) DEFAULT NULL,
  `dist_ft` decimal(30,6) DEFAULT NULL,
  `dist_nm` decimal(30,6) DEFAULT NULL,
  `thro1_part` decimal(30,6) DEFAULT NULL,
  `thro2_part` decimal(30,6) DEFAULT NULL,
  `thro1_part1` decimal(30,6) DEFAULT NULL,
  `thro2_part1` decimal(30,6) DEFAULT NULL,
  `pitch_cycli` decimal(30,6) DEFAULT NULL,
  `pitch_cycli1` decimal(30,6) DEFAULT NULL,
  `roll_cycli` decimal(30,6) DEFAULT NULL,
  `roll_cycli1` decimal(30,6) DEFAULT NULL,
  `roll_flap` decimal(30,6) DEFAULT NULL,
  `roll_flap1` decimal(30,6) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `performance`
--

INSERT INTO `performance` (`performanceid`, `userid`, `cycletime`, `real_time`, `totl_time`, `missn_time`, `timer_time`, `zulu_time`, `local_time`, `hobbs_time`, `Vind_kias`, `Vind_keas`, `Vtrue_ktas`, `Vtrue_ktgs`, `Vind_mph`, `Vtrue_mphas`, `Vtrue_mphgs`, `elev_yoke1`, `ailrn_yoke1`, `ruddr_yoke1`, `elev_astab`, `ailrn_astab`, `ruddr_astab`, `elev_surf`, `ailrn_surf`, `ruddr_surf`, `nwhel_steer`, `M_ftlb`, `L_ftlb`, `N_ftlb`, `Q_rad`, `P_rad`, `R_rad`, `pitch_deg`, `roll_deg`, `hding_true`, `hding_mag`, `alpha_deg`, `beta_deg`, `hpath_deg`, `vpath_deg`, `slip_deg`, `mag_comp`, `mavar_deg`, `lat_deg`, `lon_deg`, `alt_ftmsl`, `alt_ftagl`, `on_runwy`, `alt_ind`, `lat_orign`, `lon_orign`, `X_m`, `Y_m`, `Z_m`, `vX_m`, `vY_m`, `vZ_m`, `dist_ft`, `dist_nm`, `thro1_part`, `thro2_part`, `thro1_part1`, `thro2_part1`, `pitch_cycli`, `pitch_cycli1`, `roll_cycli`, `roll_cycli1`, `roll_flap`, `roll_flap1`) VALUES
(1, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `postsurvey`
--

CREATE TABLE IF NOT EXISTS `postsurvey` (
  `id` int(250) NOT NULL,
  `sim1` varchar(250) DEFAULT NULL,
  `sim2` varchar(250) DEFAULT NULL,
  `sim3` varchar(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `postsurvey`
--

INSERT INTO `postsurvey` (`id`, `sim1`, `sim2`, `sim3`) VALUES
(1, NULL, NULL, NULL),
(2, NULL, NULL, NULL),
(3, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `questionnaire`
--

CREATE TABLE IF NOT EXISTS `questionnaire` (
  `id` int(250) NOT NULL,
  `P1q1` varchar(250) DEFAULT NULL,
  `P1q2` varchar(250) DEFAULT NULL,
  `P1q3` varchar(250) DEFAULT NULL,
  `P1q4` varchar(250) DEFAULT NULL,
  `P1q5` varchar(250) DEFAULT NULL,
  `P1q6` varchar(250) DEFAULT NULL,
  `P1q7` varchar(250) DEFAULT NULL,
  `P1q8` varchar(250) DEFAULT NULL,
  `P1q9` varchar(250) DEFAULT NULL,
  `P1q10` varchar(250) DEFAULT NULL,
  `P1q11` varchar(250) DEFAULT NULL,
  `P1q12` varchar(250) DEFAULT NULL,
  `P1q12a` varchar(250) DEFAULT NULL,
  `P1q13` varchar(250) DEFAULT NULL,
  `P1q13a` varchar(250) DEFAULT NULL,
  `P1q13b` varchar(250) DEFAULT NULL,
  `P1q13c` varchar(250) DEFAULT NULL,
  `P1q13d` varchar(250) DEFAULT NULL,
  `P1q14` varchar(250) DEFAULT NULL,
  `P1q14a` varchar(250) DEFAULT NULL,
  `P1q14b` varchar(250) DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `totalscore` int(250) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questionnaire`
--

INSERT INTO `questionnaire` (`id`, `P1q1`, `P1q2`, `P1q3`, `P1q4`, `P1q5`, `P1q6`, `P1q7`, `P1q8`, `P1q9`, `P1q10`, `P1q11`, `P1q12`, `P1q12a`, `P1q13`, `P1q13a`, `P1q13b`, `P1q13c`, `P1q13d`, `P1q14`, `P1q14a`, `P1q14b`, `endtime`, `totalscore`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0),
(3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userhandles`
--

CREATE TABLE IF NOT EXISTS `userhandles` (
  `id` int(250) NOT NULL,
  `handle` varchar(250) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `state` varchar(250) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userhandles`
--

INSERT INTO `userhandles` (`id`, `handle`, `name`, `email`, `phone`, `state`, `timestamp`) VALUES
(1, 'VIP1', 'VIP', 'vip@vip.com', '0000000000', 'SIM1-COMPLETE', NULL),
(2, 'VIP2', 'VIP', 'vip@vip.com', '0000000000', 'SIM2-COMPLETE', NULL),
(3, 'VIP3', 'VIP', 'vip@vip.com', '0000000000', 'SIM3-COMPLETE', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`performanceid`);

--
-- Indexes for table `postsurvey`
--
ALTER TABLE `postsurvey`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userhandles`
--
ALTER TABLE `userhandles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `performanceid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `postsurvey`
--
ALTER TABLE `postsurvey`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `questionnaire`
--
ALTER TABLE `questionnaire`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `userhandles`
--
ALTER TABLE `userhandles`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
