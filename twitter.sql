-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: mariadb
-- Время создания: Мар 13 2019 г., 16:14
-- Версия сервера: 10.3.10-MariaDB-1:10.3.10+maria~bionic
-- Версия PHP: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `twitter`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `id_account` varchar(255) NOT NULL,
  `update_time` int(11) NOT NULL,
  `available_time` int(11) NOT NULL,
  `count_per_time` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `next_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `id_account`, `update_time`, `available_time`, `count_per_time`, `updated_at`, `next_update`) VALUES
(1, 'Vitaliy_Klychko', 180, 300, 1, NULL, '2019-03-13 16:09:54'),
(2, 'Klitschko', 120, 500, 1, NULL, '2019-03-13 16:09:54');

-- --------------------------------------------------------

--
-- Структура таблицы `tweets`
--

CREATE TABLE `tweets` (
  `id` int(11) NOT NULL,
  `tweet_id` text NOT NULL,
  `content` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `published_at` datetime NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tweets`
--

INSERT INTO `tweets` (`id`, `tweet_id`, `content`, `url`, `published_at`, `account_id`) VALUES
(8, '1104394445523439617', 'Тарас Шевченко - символ боротьби за Україну, за її свободу. Творчість Кобзаря і сьогодні надихає мільйони українців відстоювати цінності, які сповідував великий поет - вільне життя, єднання народу, незалежність України. Боротьба за них триває.. І Україна переможе!pic.twitter.com/Ju8TvQmQlu', 'https://twitter.com//Vitaliy_Klychko/status/1104394445523439617', '2019-03-09 14:52:09', 1),
(9, '1105504098848305153', 'Vom Wünschen ins Wollen: genau über diesem Motto steht unser F.A.C.E. Camp! Seht selbst.pic.twitter.com/vGhymE5K3D', 'https://twitter.com//TatjanaKiel/status/1105504098848305153', '2019-03-12 16:21:31', 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
