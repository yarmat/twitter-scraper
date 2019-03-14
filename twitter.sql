-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: mariadb
-- Время создания: Мар 14 2019 г., 12:27
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
  `updated_at` timestamp NULL DEFAULT NULL,
  `next_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`id`, `id_account`, `update_time`, `available_time`, `updated_at`, `next_update`) VALUES
(1, 'cristiano', 3, 100, '2019-03-14 12:20:00', '2019-03-14 12:23:00'),
(2, 'wearemessi', 2, 15, '2019-03-14 12:22:00', '2019-03-14 12:24:00');

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
(99, '1105166216988188677', 'pic.twitter.com/aperghzXlc', 'https://twitter.com/Cristiano/status/1105166216988188677', '2019-03-11 17:58:53', 1),
(100, '1106022824265895942', 'Road To Madrid. #ChampionsLeague #UCL #BarçaOL #WeAreMessi #Messi \n\n[via @brfootball]pic.twitter.com/HFGT6oxGEZ', 'https://twitter.com/WeAreMessi/status/1106022824265895942', '2019-03-14 02:42:44', 2),
(101, '1106023981365243910', ' Barcelona are now unbeaten in 30 UCL home matches (27W 3D), beating the competition record of 29 set by Bayern Munich between March 1998 and April 2002. #UCL #BarçaOL #WeAreMessi \n\n[via @FCBarcelonaFl]pic.twitter.com/gCKicPEArO', 'https://twitter.com/WeAreMessi/status/1106023981365243910', '2019-03-14 02:47:20', 2),
(102, '1106019106942341120', 'pic.twitter.com/NxWdzBiuyf', 'https://twitter.com/WeAreMessi/status/1106019106942341120', '2019-03-14 02:27:58', 2),
(103, '1104715220172320769', 'El próximo lunes 18 inauguro @insparya_es en Madrid, mi nuevo proyecto sobre salud capilar. Y, si quieres conocerme, solo tienes que entrar en https://insparyabycr7.com  y apuntarte. Puedes ser uno de los 5 ganadores. ¡Suerte!pic.twitter.com/k2w8qls1CT', 'https://twitter.com/Cristiano/status/1104715220172320769', '2019-03-10 12:06:47', 1),
(104, '1105972215458287616', '#Messi this season for @FCBarcelona \n\n36 Games \n36 Goals\n20 Assists\n\npic.twitter.com/eNfTAqud2u', 'https://twitter.com/WeAreMessi/status/1105972215458287616', '2019-03-13 23:21:38', 2),
(105, '1105951156818317312', 'Team celebration  \n\n#BarçaOLpic.twitter.com/LFWnIefUIJ', 'https://twitter.com/WeAreMessi/status/1105951156818317312', '2019-03-13 21:57:58', 2),
(106, '1105966738284441600', 'Forever #Messi  \n\n#BarçaOL #UCL #WeAreMessi pic.twitter.com/9CDwcMwu2Y', 'https://twitter.com/WeAreMessi/status/1105966738284441600', '2019-03-13 22:59:52', 2),
(107, '1105947248012214275', 'It’s Leo Messi ladies and gentlemen.pic.twitter.com/d0wrmFfMlP', 'https://twitter.com/WeAreMessi/status/1105947248012214275', '2019-03-13 21:42:26', 2),
(108, '1105950007092494336', '2 goals and 2 assists.\n\nLeo Messi pic.twitter.com/2RIzL2RSGf', 'https://twitter.com/WeAreMessi/status/1105950007092494336', '2019-03-13 21:53:23', 2),
(109, '1105950894674362370', 'FT: FCB 5-1 LYO\n\nTO THE QUARTERFINALS.\n\n#BarçaOLpic.twitter.com/q48BECqmQM', 'https://twitter.com/WeAreMessi/status/1105950894674362370', '2019-03-13 21:56:55', 2),
(110, '1105957820728516608', 'Man of the match.\nLeo Messi lights up the ultimate stage once again. @TeamMessi @adidasfootball \n\n#NEMEZIZ #DareToCreate #WeAreMessipic.twitter.com/VykLS2HZWm', 'https://twitter.com/WeAreMessi/status/1105957820728516608', '2019-03-13 22:24:26', 2),
(111, '1105950260076183556', '+2 added minutes \n\n#fcblive', 'https://twitter.com/WeAreMessi/status/1105950260076183556', '2019-03-13 21:54:24', 2),
(112, '1105949606326747137', 'Again guys, who else with assist?', 'https://twitter.com/WeAreMessi/status/1105949606326747137', '2019-03-13 21:51:48', 2),
(113, '1105949428890955781', 'Goaaaaaaaaalll Dembélé!!', 'https://twitter.com/WeAreMessi/status/1105949428890955781', '2019-03-13 21:51:06', 2),
(114, '1105948201574633472', 'Sergi out\nSemedo in\n\n#fcblive', 'https://twitter.com/WeAreMessi/status/1105948201574633472', '2019-03-13 21:46:13', 2),
(115, '1105947989053501440', 'Messi with the assist\n\nAgain, who else?', 'https://twitter.com/WeAreMessi/status/1105947989053501440', '2019-03-13 21:45:22', 2),
(116, '1105947775282413568', 'Piqueeeeeee scores the 4th!!', 'https://twitter.com/WeAreMessi/status/1105947775282413568', '2019-03-13 21:44:31', 2),
(117, '1105947360675401736', 'Leo Messiii', 'https://twitter.com/WeAreMessi/status/1105947360675401736', '2019-03-13 21:42:52', 2),
(118, '1105945838944165888', 'Arthur out\nVidal in\n\n#fcblive', 'https://twitter.com/WeAreMessi/status/1105945838944165888', '2019-03-13 21:36:50', 2),
(119, '1105945036586475520', 'Coutinho out \nDembele in\n\n#fcblive', 'https://twitter.com/WeAreMessi/status/1105945036586475520', '2019-03-13 21:33:38', 2);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
