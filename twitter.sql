-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_account` varchar(255) NOT NULL,
  `update_time` int(11) NOT NULL,
  `available_time` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `next_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `id_account`, `update_time`, `available_time`, `updated_at`, `next_update`) VALUES
(1,	'cristiano',	3,	100,	'2019-03-19 18:39:00',	'2019-03-19 18:42:00'),
(2,	'wearemessi',	2,	15,	'2019-03-19 18:37:00',	'2019-03-19 18:39:00');

DROP TABLE IF EXISTS `tweets`;
CREATE TABLE `tweets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet_id` text NOT NULL,
  `content` text,
  `url` varchar(255) DEFAULT NULL,
  `published_at` datetime NOT NULL,
  `account_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tweets` (`id`, `tweet_id`, `content`, `url`, `published_at`, `account_id`) VALUES
(230,	'1107631650219921408',	'¡Es oficialmente el inicio de un nuevo proyecto, @insparya_es un proyecto único y que confiamos que va a tener mucho éxito!pic.twitter.com/FqYSFe0r65',	'https://twitter.com/Cristiano/status/1107631650219921408',	'2019-03-18 13:15:38',	1),
(231,	'1108030725973049344',	'@IkerCasillas\n\n\"#Messi made me a better goalkeeper\" \n\n#WeAreMessipic.twitter.com/W0kwiYKhe6',	'https://twitter.com/WeAreMessi/status/1108030725973049344',	'2019-03-19 15:41:25',	2),
(232,	'1107951536871796737',	'Não podia estar mais feliz pela inauguração da minha clínica @insparya_es pic.twitter.com/vM2l5eCgIO',	'https://twitter.com/Cristiano/status/1107951536871796737',	'2019-03-19 10:26:45',	1),
(233,	'1108025599828869120',	'#HappyFathersDay  #Messi #WeAreMessipic.twitter.com/4hHY1lrQbq',	'https://twitter.com/WeAreMessi/status/1108025599828869120',	'2019-03-19 15:21:03',	2),
(234,	'1108024360076525568',	'El Mejor Del Mundo \n@adidasfootball @TeamMessi \n#Messi #WeAreMessipic.twitter.com/UqfDDqfpM0',	'https://twitter.com/WeAreMessi/status/1108024360076525568',	'2019-03-19 15:16:08',	2),
(235,	'1107975449831981056',	'pic.twitter.com/2Uuj7XBOtn',	'https://twitter.com/WeAreMessi/status/1107975449831981056',	'2019-03-19 12:01:47',	2),
(236,	'1107964337099018242',	'pic.twitter.com/9baiyLuq3R',	'https://twitter.com/WeAreMessi/status/1107964337099018242',	'2019-03-19 11:17:37',	2);

DROP TABLE IF EXISTS `tweets_removed`;
CREATE TABLE `tweets_removed` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tweet_id` text,
  `content` text NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `account_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tweets_removed` (`id`, `tweet_id`, `content`, `url`, `published_at`, `account_id`) VALUES
(1,	'1106616187956457473899',	'I always have so much fun developing and selecting the best styles for @CR7underwear !!\nSS19 collection coming soon!pic.twitter.com/JPj0IcZsci',	'https://i.imgur.com/O21d8nG.jpg',	'2019-03-15 18:00:33',	1);

-- 2019-03-19 18:40:57
