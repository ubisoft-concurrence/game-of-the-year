-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : jeu. 06 juil. 2023 à 08:35
-- Version du serveur : 8.0.29
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `game`
--

-- --------------------------------------------------------

--
-- Structure de la table `battles`
--

CREATE TABLE `battles` (
  `battle_id` int NOT NULL,
  `DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `battles`
--

INSERT INTO `battles` (`battle_id`, `DATE`) VALUES
(1, '2023-06-26');

-- --------------------------------------------------------

--
-- Structure de la table `battles_characters`
--

CREATE TABLE `battles_characters` (
  `battle_id` int NOT NULL,
  `character_id` int NOT NULL,
  `result` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `battles_characters`
--

INSERT INTO `battles_characters` (`battle_id`, `character_id`, `result`) VALUES
(1, 1, 'win'),
(1, 2, 'lose'),
(1, 3, 'win');

-- --------------------------------------------------------

--
-- Structure de la table `characters`
--

CREATE TABLE `characters` (
  `character_id` int NOT NULL,
  `character_name` varchar(100) DEFAULT NULL,
  `character_level` int DEFAULT '1',
  `skin` varchar(100) DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `characters`
--

INSERT INTO `characters` (`character_id`, `character_name`, `character_level`, `skin`, `class_id`, `vehicle_id`) VALUES
(1, 'Kanak', 2, 'wall1', 2, 1),
(2, 'Junkbezoul', 1, 'monster2', 4, 1),
(3, 'Zescrum', 2, 'slasher1', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `class_id` int NOT NULL,
  `class_name` varchar(100) DEFAULT NULL,
  `health_point` int DEFAULT NULL,
  `attack` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`class_id`, `class_name`, `health_point`, `attack`) VALUES
(1, 'Slasher', 50, 15),
(2, 'Wall', 70, 20),
(3, 'Killer', 40, 25),
(4, 'Monster', 100, 10),
(5, 'Gunner', 60, 15);

-- --------------------------------------------------------

--
-- Structure de la table `environements`
--

CREATE TABLE `environements` (
  `environement_id` int NOT NULL,
  `environement_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int NOT NULL,
  `vehicle_name` varchar(100) DEFAULT NULL,
  `buff` varchar(100) DEFAULT NULL,
  `nerf` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `color` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `vehicle_name`, `buff`, `nerf`, `color`) VALUES
(1, 'MagicBus', 'speed', 'health', 'yellow'),
(2, 'PorteGuerre', 'attack', 'speed', 'brown'),
(3, 'CariceCarsMK1', 'health', 'attack', 'red'),
(4, 'mobile', 'health', NULL, 'blue');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `battles`
--
ALTER TABLE `battles`
  ADD PRIMARY KEY (`battle_id`);

--
-- Index pour la table `battles_characters`
--
ALTER TABLE `battles_characters`
  ADD PRIMARY KEY (`battle_id`,`character_id`),
  ADD KEY `FK_battles_characters_character_id` (`character_id`);

--
-- Index pour la table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`character_id`),
  ADD KEY `FK_characters_class_id` (`class_id`),
  ADD KEY `FK_characters_vehicle_id` (`vehicle_id`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Index pour la table `environements`
--
ALTER TABLE `environements`
  ADD PRIMARY KEY (`environement_id`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `battles`
--
ALTER TABLE `battles`
  MODIFY `battle_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `battles_characters`
--
ALTER TABLE `battles_characters`
  MODIFY `battle_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `characters`
--
ALTER TABLE `characters`
  MODIFY `character_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `environements`
--
ALTER TABLE `environements`
  MODIFY `environement_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `battles_characters`
--
ALTER TABLE `battles_characters`
  ADD CONSTRAINT `FK_battles_characters_battle_id` FOREIGN KEY (`battle_id`) REFERENCES `battles` (`battle_id`),
  ADD CONSTRAINT `FK_battles_characters_character_id` FOREIGN KEY (`character_id`) REFERENCES `characters` (`character_id`);

--
-- Contraintes pour la table `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `FK_characters_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  ADD CONSTRAINT `FK_characters_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
