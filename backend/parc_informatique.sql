-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 19 mai 2024 à 14:23
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `parc_informatique`
--

-- --------------------------------------------------------

--
-- Structure de la table `equipement`
--

CREATE TABLE `equipement` (
  `idEquipement` int(11) NOT NULL,
  `NameEquipement` varchar(100) NOT NULL,
  `NameFournisseur` varchar(100) NOT NULL,
  `prix` decimal(10,3) NOT NULL,
  `Disponibilite` varchar(300) NOT NULL,
  `garantie` varchar(300) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `numSerie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipement`
--

INSERT INTO `equipement` (`idEquipement`, `NameEquipement`, `NameFournisseur`, `prix`, `Disponibilite`, `garantie`, `categorie`, `numSerie`) VALUES
(2, 'pc', 'ahmed', 42000.000, '14 piéce', '2 ans', 'Les Ordinateurs', '123025abc'),
(3, 'pc', 'ahmed', 42000.000, '14 piéce', '2 ans', 'Les Ordinateurs', 'ABC-12-34-5678'),
(5, 'modem', 'elaa', 12300.000, '25 modem', '2 ans', 'Réseaux et communication', 'ABC-74-a2-5963'),
(7, 'disque SSD', 'syrine', 25000.000, '12', '2 ans', 'Périphériques de stockage', 'AZE-12-74/5678'),
(12, 'carte réseaux', 'société AB', 23000.000, '12', '2 ans', 'Réseaux et communication', 'UXW-12-74-1234'),
(13, 'ecran', 'ahmed', 1200.000, '12 ecrans', '2 ans', 'Écrans et moniteurs', '120abc35'),
(16, 'clavier', 'ahmed', 25000.000, '10 clavier', '2ans', 'Accessoires informatiques', '120-acd-524'),
(19, 'cable USB', 'ahmed', 12000.000, '12 piéces', '2ans', 'Accessoires de câblage et connectique', '120-741-852'),
(20, 'cable USB', 'ahmed', 25000.000, '12 piéces', '2ans', 'Accessoires de câblage et connectique', 'LMN-741-123');

-- --------------------------------------------------------

--
-- Structure de la table `equipement_employe`
--

CREATE TABLE `equipement_employe` (
  `id` int(11) NOT NULL,
  `nomEmploye` varchar(255) DEFAULT NULL,
  `emailEmploye` varchar(255) DEFAULT NULL,
  `equipementName` varchar(255) DEFAULT NULL,
  `numSerie` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `idEmploye` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `equipement_employe`
--

INSERT INTO `equipement_employe` (`id`, `nomEmploye`, `emailEmploye`, `equipementName`, `numSerie`, `categorie`, `idEmploye`) VALUES
(1, 'brahim azouz', 'brahim@gmail.com', 'modem', 'ABC-74-a2-5963', 'Réseaux et communication', 14),
(2, 'User', 'user@gmail.com', 'PC', 'ABC-12-34-5678', 'Les Ordinateurs', 10),
(3, 'syrine  azouz', 'syrine.azouzz@gmail.com', 'PC', 'ABC-12-34-5678', 'Les Ordinateurs', 6),
(4, 'syrine azouz', 'syrine.azouzz@gmail.com', 'clavier', '120-acd-524', 'Accessoires informatiques', NULL),
(5, 'brahim azouz', 'brahim@gmail.com', 'clavier', '120-ABC-478', 'Accessoires informatiques', 14),
(6, 'naceur', 'naceur@gmail.com', 'pc portable', 'ikl-21-34-5577', 'Les Ordinateurs', 15),
(7, 'naceur', 'naceur@gmail.com', 'cable USB ', '120-741-852	', 'Accessoires de câblage et connectique', 15),
(8, 'naceur azouz', 'naceur@gmail.com', 'pc portable', '123-741-458', 'Accessoires de câblage et connectique', 15),
(9, 'user', 'user@gmail.com', 'cable usb', 'LMN-741-123', 'Accessoires de câblage et connectique', 10),
(10, 'user', 'user@gmail.com', 'cable usb', '120-741-852', 'Accessoires de câblage et connectique', 10);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `num` int(11) NOT NULL,
  `cin` int(11) NOT NULL,
  `adresse` varchar(40) NOT NULL,
  `service` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fournisseur`
--

INSERT INTO `fournisseur` (`id`, `name`, `email`, `num`, `cin`, `adresse`, `service`) VALUES
(2, 'ahmed acheche', 'ahmed@gmail.com', 52369874, 14033361, 'monastir avenue habib bourguiba sahline ', 'Les ordinateur'),
(3, 'syrine   azouz', 'syrine.azouzz@gmail.com', 27107551, 12345056, 'monastir avenue habib bourguiba sahline ', 'ordinateur'),
(4, 'hamza ', 'hamza@gmail.com', 52416987, 5586153, 'monastir avenue habib bourguiba sahline ', 'informatique'),
(5, 'tesnim ayara', 'tesnim@gmail.com', 52147896, 12045600, 'sousse hay riadh', 'Accessoires de câblage');

-- --------------------------------------------------------

--
-- Structure de la table `modal_details`
--

CREATE TABLE `modal_details` (
  `id` int(11) NOT NULL,
  `itemId` int(11) DEFAULT NULL,
  `fieldName` varchar(255) DEFAULT NULL,
  `fieldValue` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `modal_details`
--

INSERT INTO `modal_details` (`id`, `itemId`, `fieldName`, `fieldValue`) VALUES
(10, 5, 'Stockage', '16 Go'),
(11, 2, 'Stockage', '16 Go'),
(12, 12, 'débit', '1 T'),
(13, 5, 'débit', '1 T'),
(14, 5, 'débitt', '16 Go'),
(16, 16, 'couleur', 'noire'),
(17, 16, 'marque ', 'hp');

-- --------------------------------------------------------

--
-- Structure de la table `reclamationuser`
--

CREATE TABLE `reclamationuser` (
  `id` int(11) NOT NULL,
  `nameUser` varchar(255) NOT NULL,
  `emailUser` varchar(255) NOT NULL,
  `numUser` int(11) NOT NULL,
  `emplacement` varchar(255) NOT NULL,
  `nameEquipement` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `description` varchar(300) NOT NULL,
  `priorite` varchar(30) NOT NULL,
  `DescPanne` varchar(300) NOT NULL,
  `date` date NOT NULL,
  `isReadByAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reclamationuser`
--

INSERT INTO `reclamationuser` (`id`, `nameUser`, `emailUser`, `numUser`, `emplacement`, `nameEquipement`, `categorie`, `description`, `priorite`, `DescPanne`, `date`, `isReadByAdmin`) VALUES
(1, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'touche', 'élevée', 'aaaa', '2024-05-10', 0),
(2, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'modem    ABC-74-a2-5963', 'Réseaux et communication', 'aaa', 'critique', 'fjkhjsdk', '2024-05-01', 0),
(3, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'modem    ABC-74-a2-5963', 'Réseaux et communication', 'aaa', 'critique', 'fjkhjsdk', '2024-05-01', 0),
(4, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'modem    ABC-74-a2-5963', 'Réseaux et communication', 'aaa', 'critique', 'fjkhjsdk', '2024-05-01', 0),
(5, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(6, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(7, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(8, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(9, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(10, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(11, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(12, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(13, 'user', 'user@gmail.com', 24157896, 'A14', 'PC  ABC-12-34-5678', 'Les Ordinateurs', 'dfx', 'moyenne', 'hgjfjghj', '2024-05-11', 0),
(14, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'critique', 'jabjdhsbfjg', '2024-05-11', 0),
(15, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'critique', 'jabjdhsbfjg', '2024-05-11', 0),
(16, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'critique', 'jabjdhsbfjg', '2024-05-11', 0),
(17, 'user', 'user@gmail.com', 24157896, 'A24', 'cable usb', 'Accessoires de câblage et connectique', 'port ', 'élevée', 'port usb en panne', '2024-02-13', 0),
(18, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Les Ordinateurs', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-05-14', 0),
(19, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(20, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(21, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(22, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(23, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(24, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(25, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(26, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(27, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(28, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(29, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(30, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(31, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(32, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(33, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(34, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(35, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(36, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(37, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(38, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(39, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(40, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(41, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(42, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(43, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(44, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(45, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(46, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(47, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(48, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(49, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A15', 'pc portable 123-741-458', 'Les Ordinateurs', 'virus ', 'critique', 'aaa', '2024-05-01', 0),
(50, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'virus ', 'élevée', 'hjgj', '2024-05-10', 0),
(51, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(52, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(53, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(54, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(55, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(56, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(57, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(58, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(59, 'naceur azouz', 'naceur@gmail.com', 24178522, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'fff', 'élevée', 'eferfr', '2024-05-04', 0),
(60, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A16', 'ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'effgf', '2024-05-01', 0),
(61, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A16', 'ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'effgf', '2024-05-01', 0),
(62, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A16', 'ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'effgf', '2024-05-01', 0),
(63, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A16', 'ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'effgf', '2024-05-01', 0),
(64, 'naceur azouz', 'naceur@gmail.com', 24157896, 'A16', 'ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'effgf', '2024-05-01', 0),
(65, 'user', 'user@gmail.com', 24178522, 'A16', 'pc ABC-12-34-5678', 'Les Ordinateurs', 'virus ', 'moyenne', 'jabjdhsbfjg', '2024-05-10', 0),
(66, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(67, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(68, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(69, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(70, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(71, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(72, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(73, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(74, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(75, 'user', 'user@gmail.com', 24157896, 'A14', 'clavier 120-ABC-478', 'Accessoires informatiques', 'touche', 'moyenne', 'hgjfjghj', '2024-05-16', 0),
(83, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(84, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(85, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(86, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(87, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(88, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(89, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(90, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(91, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'aaa', 'moyenne', 'kfdnkqjslm', '2024-01-01', 0),
(92, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(93, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(94, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(95, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(96, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(97, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'fff', 'élevée', 'ffjskfreijqlirhehur', '2024-10-01', 0),
(98, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(99, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(100, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(101, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(102, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(103, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(104, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(105, 'brahim azouz', 'brahim@gmail.com', 24157896, 'A14', 'PC     ABC-12-34-5678', 'Les Ordinateurs', 'aaa', 'moyenne', 'aaaa', '2024-02-01', 0),
(106, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(107, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(108, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(109, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(110, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(111, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(112, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(113, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(114, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(115, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(116, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(117, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(118, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(119, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(120, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(121, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(122, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(123, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(124, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(125, 'user', 'user@gmail.com', 24175866, 'A14', 'clavier	120-ABC-478', 'Accessoires informatiques', 'virus ', 'faible', 'aaa', '2024-02-01', 0),
(126, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'modem:  ABC-74-a2-5963', 'Réseaux et communication', 'point d\'accès en panne', 'critique', 'le modem est ne fonctionne pas', '2024-05-18', 0),
(127, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A16', 'modem:  ABC-74-a2-5963', 'Réseaux et communication', 'point d\'accès en panne', 'critique', 'le modem est ne fonctionne pas', '2024-05-18', 0),
(128, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(129, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(130, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(131, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(132, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(133, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0),
(134, 'brahim azouz', 'brahim@gmail.com', 24178522, 'A14', 'CLAVIER 120-ABC-478	', 'Accessoires informatiques', 'aaa', 'élevée', 'jabjdhsbfjg', '2024-05-18', 0);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `nameUser` varchar(255) NOT NULL,
  `nameEquipement` varchar(255) NOT NULL,
  `NumSerie` varchar(110) NOT NULL,
  `email` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `nameUser`, `nameEquipement`, `NumSerie`, `email`, `categorie`) VALUES
(1, 'user', 'pc portable', '0', 'user@gmail.com', 'Les Ordinateurs'),
(2, 'user', 'pc portable', '0', 'user@gmail.com', 'Les Ordinateurs'),
(3, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(4, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(5, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(6, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(7, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(8, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(9, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(10, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(11, 'user', 'disque SSD', '0', 'user@gmail.com', 'Périphériques de stockage'),
(12, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(13, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(14, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(15, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(16, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(17, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(18, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(19, 'brahim azouz', 'disque SSD', '0', 'brahim@gmail.com', 'Réseaux et communication'),
(20, 'naceur azouz', 'pc portable	', '0', 'naceur@gmail.com', 'Les Ordinateurs'),
(21, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(22, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(23, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(24, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(25, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(26, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(27, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(28, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(29, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(30, 'naceur azouz', 'webcams', '0', 'naceur@gmail.com', 'Accessoires informatiques'),
(31, 'user', 'cable usb', '120', 'user@gmail.com', 'Accessoires de câblage et connectique'),
(32, 'user', 'pc', '2547', 'user@gmail.com', 'Les Ordinateurs'),
(33, 'naceur azouz', 'disque ssd', '0', 'naceur@gmail.com', 'Périphériques de stockage'),
(34, 'naceur azouz', 'disque ssd', '0', 'naceur@gmail.com', 'Périphériques de stockage'),
(35, 'naceur azouz', 'disque ssd', '0', 'naceur@gmail.com', 'Périphériques de stockage'),
(36, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(37, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(38, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(39, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(40, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(41, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(42, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(43, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(44, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(45, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(46, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(47, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(48, 'naceur azouz', 'disque ssd', '128', 'naceur@gmail.com', 'Périphériques de stockage'),
(49, 'naceur azouz', 'disque ssd', '128-852-741', 'naceur@gmail.com', 'Périphériques de stockage'),
(50, 'naceur azouz', 'disque ssd', '128-852-741', 'naceur@gmail.com', 'Périphériques de stockage'),
(51, 'naceur azouz', 'disque ssd', '128-852-741', 'naceur@gmail.com', 'Périphériques de stockage'),
(52, 'naceur azouz', 'disque ssd', '128-852-741', 'naceur@gmail.com', 'Périphériques de stockage'),
(53, 'user', 'pc', '120abci3526', 'user@gmail.com', 'Les Ordinateurs'),
(54, 'brahim azouz', 'disque SSD', 'AZE-12-74/5678', 'brahim@gmail.com', 'Périphériques de stockage');

-- --------------------------------------------------------

--
-- Structure de la table `sign`
--

CREATE TABLE `sign` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sign`
--

INSERT INTO `sign` (`id`, `name`, `email`, `password`, `role`) VALUES
(5, 'youssef elleuch', 'youssef41@gmail.com', '$2b$10$zBVIXOl1doUa0tyKgKdQFearccAou7ZyxxfOLmvmFGKKkAZ6dwT4a', 'employe'),
(6, 'sirine azouz', 'syrine.azouzz@gmail.com', '$2b$10$2BRRVqDJgWKsno78QrUVJuKDHW6PaqMLQvsQbndurx2Y2JTR3F1o6', 'employer'),
(7, 'sirine azouz', 'syrine.azouzz1@gmail.com', '$2b$10$UmkGvN0Tg0Qyz24.UYgyo.8McbEUfKtDjXsf13l61i/hqMg5a75C.', ''),
(8, 'youssef', 'youssef41@gmail.com', '$2b$10$.kaP7LZ73Cg5NvdauOXcE.flyZovonLDJ3kQe0Kmfdg6BlD.7whBe', ''),
(10, 'user ', 'user@gmail.com', '$2b$10$8lpK0WRUr59MVp4LlIoSAO3Zx3N7i61tKp735QTRtldSYVtB03ZaS', 'employer'),
(11, 'admin', 'admin@gmail.com', '$2b$10$H3qHOAVVEm3ujB4/.df4U.W98RCpEUYOzIS5RkhD97E4nOApH7iFe', 'admin'),
(14, 'brahim azouz', 'brahim@gmail.com', '$2b$10$9JoKXXojMUFg6ezIBpXaL.3Ozkz0swyZfCz4ID/YfoBSKMtG09j3q', 'employer'),
(15, 'naceur azouz', 'naceur@gmail.com', '$2b$10$WSJlMfEWg36t5vpjc2u/c.fD.4Mye9S8bSj2OJWTqDPcjUeclaEMa', 'employer'),
(16, 'admin1', 'admin1@gmail.com', '$2b$10$hsA7BSl8ybKh5KugdZWEjed4qWQpQzQbg/kJqA1ryRiemLiKb4.YS', 'employer'),
(17, 'admin1', 'admin1@gmail.com', '$2b$10$ah/pxzohKNow87KzO2RkgO38cwxTRYuFpafhMtdMYmxvLCjKqKuRC', ''),
(18, 'admin1', 'admin1@gmail.com', '$2b$10$DQPxE.NLg3vyaYpJoQXcLeto9mLHtANJ3Az7WMqZORM.y/w7LpK2m', ''),
(19, 'admin1', 'admin1@gmail.com', '$2b$10$uUrvtgv1/ozyT.xDhfnb6e8Sz9rtGYuKbAxpipLGlB5tLurhXoXE.', '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `num` int(11) NOT NULL,
  `cin` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `service` varchar(20) NOT NULL,
  `bureau` varchar(20) NOT NULL,
  `actif` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `num`, `cin`, `type`, `service`, `bureau`, `actif`) VALUES
(3, 'syrine  azouz', 'syrine.azouzz@gmail.com', 27107551, 14033361, 'employé', 'informatique', 'B1', 'non'),
(5, 'naceur azouz', 'naceur@gmail.com', 24175866, 15586153, 'directeur', 'mécanique', 'A15', 'oui'),
(6, 'user', 'user@gmail.com', 24157896, 14785235, 'employé', 'mécanique', 'A14', 'oui');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `equipement`
--
ALTER TABLE `equipement`
  ADD PRIMARY KEY (`idEquipement`);

--
-- Index pour la table `equipement_employe`
--
ALTER TABLE `equipement_employe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEmploye` (`idEmploye`);

--
-- Index pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `modal_details`
--
ALTER TABLE `modal_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`);

--
-- Index pour la table `reclamationuser`
--
ALTER TABLE `reclamationuser`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sign`
--
ALTER TABLE `sign`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `equipement`
--
ALTER TABLE `equipement`
  MODIFY `idEquipement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `equipement_employe`
--
ALTER TABLE `equipement_employe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `fournisseur`
--
ALTER TABLE `fournisseur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `modal_details`
--
ALTER TABLE `modal_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `reclamationuser`
--
ALTER TABLE `reclamationuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `sign`
--
ALTER TABLE `sign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `equipement_employe`
--
ALTER TABLE `equipement_employe`
  ADD CONSTRAINT `equipement_employe_ibfk_1` FOREIGN KEY (`idEmploye`) REFERENCES `sign` (`id`);

--
-- Contraintes pour la table `modal_details`
--
ALTER TABLE `modal_details`
  ADD CONSTRAINT `modal_details_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `equipement` (`idEquipement`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
