-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2023 at 05:50 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `english-app-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(20) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(1, 'Near meaning', '0000-00-00', '0000-00-00'),
(2, 'Phonetics', '2021-09-26', '2021-09-26'),
(3, 'Stress', '2021-09-26', '2021-09-26'),
(4, 'Synonym', '2021-09-26', '2021-09-26'),
(5, 'Antonym', '2021-09-26', '2021-09-26'),
(6, 'Reading comprehension', '2021-09-26', '2021-09-26'),
(7, 'Find mistakes', '2021-09-26', '2021-09-26');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(20) NOT NULL,
  `examName` varchar(255) NOT NULL,
  `totalPoint` int(10) NOT NULL,
  `userId` int(20) NOT NULL,
  `categoryId` int(10) NOT NULL,
  `totalTime` int(255) NOT NULL,
  `listQuestion` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `examName`, `totalPoint`, `userId`, `categoryId`, `totalTime`, `listQuestion`, `createdAt`, `updatedAt`) VALUES
(21, 'abc', 20, 9999, 1, 15, '[1,2,3,4]', '2022-02-10', '2022-02-10');

-- --------------------------------------------------------

--
-- Table structure for table `gifcode`
--

CREATE TABLE `gifcode` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `expiryDate` date NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(255) NOT NULL,
  `questionName` varchar(255) DEFAULT NULL,
  `questionType` int(10) NOT NULL,
  `questionTitle` text NOT NULL,
  `questionContent` text NOT NULL,
  `questionDescription` text NOT NULL,
  `questionLevel` int(10) NOT NULL,
  `questionCategory` int(10) DEFAULT NULL,
  `questionAnswer` text NOT NULL,
  `questionPoint` int(10) NOT NULL,
  `questionExam` int(10) NOT NULL,
  `createdBy` int(10) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `questionName`, `questionType`, `questionTitle`, `questionContent`, `questionDescription`, `questionLevel`, `questionCategory`, `questionAnswer`, `questionPoint`, `questionExam`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(1, '', 1, '\"I have never been to Russia. I think I shall go there next year.” said Bill.', 'Bill said that he had never been to Russia and he thought he would go there the next year.|Bill said that he would have never been to Russia and he thinks he would go there the next year.|Bill said that he had never been to Russia and he thinks he will go there the next year.|Bill said that he has never been to Russia and he thinks he would go there the next year.', '', 1, 1, 'Bill said that he had never been to Russia and he thought he would go there the next year.', 5, 1, 1, '0000-00-00', '0000-00-00'),
(2, '', 1, '\"I have never been to Russia. I think I shall go there next year.” said Bill.', 'Bill said that he had never been to Russia and he thought he would go there the next year.|Bill said that he would have never been to Russia and he thinks he would go there the next year.|Bill said that he had never been to Russia and he thinks he will go there the next year.|Bill said that he has never been to Russia and he thinks he would go there the next year.', '', 1, 1, 'Bill said that he had never been to Russia and he thought he would go there the next year.', 5, 1, 1, '0000-00-00', '0000-00-00'),
(3, '', 1, 'The substance is very toxic. Protective clothing must be worn at all times.', ' Since the substance is very toxic, so protective clothing must be worn at all times.|So toxic is the substance that protective clothing must be worn at all times.|The substance is such toxic that protective clothing must be worn at all times.|The substance is too toxic to wear protective clothing at all times.', '', 1, 1, 'So toxic is the substance that protective clothing must be worn at all times.', 5, 1, 1, '2021-10-03', '2021-10-03'),
(4, '', 1, 'John is studying hard. He doesn’t want to fail the exam', 'John is studying hard in Oder not to fail the next exam.|John is studying hard in Oder that he not fail the next exam|John is studying hard so as to fail the next exam|John is studying hard in Oder to not to fail the next exam', '', 1, 1, 'John is studying hard in Oder not to fail the next exam', 5, 1, 1, '2021-10-03', '2021-10-03'),
(5, '', 1, 'She gave in her notice. She planned to start her new job in January', 'She gave in her notice, plan to start her new job in January|She gave in her notice with a view to starting her new job in January|Her notice was given in with an aim to start her new job in January|Her notice was given in order for her to start her new job in January', '', 1, 1, 'She gave in her notice with a view to starting her new job in January', 5, 1, 1, '2021-10-03', '2021-10-03'),
(6, 'Quest6', 1, 'When the unemployment rate is high, the crime rate is usually also high.', 'The unemployment rate and the crime rate are both higher|The higher the unemployment rate is, the higher the crime rate is|The unemployment rate is as high as the crime rate|The high rate of unemployment depends on the high rate of crime', '', 1, 1, 'The higher the unemployment rate is, the higher the crime rate is', 5, 1, 1, '2021-10-03', '2021-10-03'),
(7, 'Quest7', 1, 'I wish you hadn\'t said that', 'I wish you not to say that|If only you didn\'t say tot|I hope you will not say that|It would be nice if you hadn’t said that', '', 1, 1, 'It would be nice if you hadn’t said that', 5, 1, 1, '2021-10-03', '2021-10-03'),
(8, 'Quest7', 1, 'You\'re always making terrible mistakes”, said the teacher', 'The teacher asked his students why they always made terrible mistakes|The teacher realized that his students always made terrible mistakesThe teacher complained about his students making terrible mistakes|The teacher made his students not always make terrible mistakes', 'https://lowres.cartooncollections.com/school-schooling-learning-teachers-students-education-teaching-CX304645_low.jpg', 1, 1, 'The teacher complained about his students making terrible mistakes', 5, 1, 1, '2021-10-03', '2021-10-03'),
(9, 'Quest7', 1, 'There is no point in your phoning Jane – she’s away', 'It would be a waste of time phoning Jane – she’s away|You waste your time if you insist on phoning Jane – she’s away|Don’t spend your valuable time phoning Jane – she’s out|Jane is very difficult to phone – she’s always away', '', 1, 1, 'Don’t spend your valuable time phoning Jane – she’s out', 5, 1, 1, '2021-10-03', '2021-10-03'),
(10, 'Quest7', 1, 'He smokes too much; perhaps that’s why he can’t get rid of his cough', 'If he didn’t smoke so much, he may get rid of his cough|If he smoked less, he might be able to get rid of his cough|If he smoked so much, he couldn’t get rid of his cough|If he does not smoke, he may not have his cough', '', 1, 1, 'If he does not smoke, he may not have his cough', 5, 1, 1, '2021-10-03', '2021-10-03'),
(11, 'Quest7', 1, '“Why don’t you take extra classes in English if you want to become a tourist guide?” said my friend', 'My friend advised me to take extra classes in English only if I wanted to become a tourist guide|My friend suggested I take extra classes in English if I wanted to become a tourist guide|In my friend’s opinion, I will never become a tourist guide if I don’t take extra classes in English|If he does not smoke, he may not have his cough', '', 1, 1, 'My friend suggested I take extra classes in English if I wanted to become a tourist guide', 5, 1, 1, '2021-10-03', '2021-10-03'),
(12, 'Quest7', 1, 'Darwin/ who/ be/ famous/ English/ scientist/ develop/ theory/ evolution/', 'Darwin who is a famous English scientist developed a theory of evolution|Darwin who was the famous English scientist develops the theory for evolution|Darwin, who is a famous English scientist, has developed a theory on evolution|Darwin, who was a famous English scientist, developed the theory of evolution', '', 1, 1, 'Darwin, who was a famous English scientist, developed the theory of evolution', 5, 1, 1, '2021-10-03', '2021-10-03'),
(13, 'Quest7', 1, 'People say that at least ten applicants have been selected for the job interview.', 'It is said that well over ten people are interested in having an interview for the job|It is said that no fewer than ten people are going to be interviewed for the job|People say that fewer than ten job interviews have been held so far|I have heard that only ten people have been chosen to have the job interviewed', '', 1, 1, 'I have heard that only ten people have been chosen to have the job interviewed', 5, 1, 1, '2021-10-03', '2021-10-03'),
(14, 'Quest7', 1, 'Eating with chopsticks feels strange to Jonathan', 'Eating with chopsticks isn’t what Jonathan used to|Jonathan is not used to eating with chopsticks|Not feeling strange, Jonathan tries eating with chopsticks|Jonathan didn’t use to eat with chopsticks', 'https://landscapesurgery.files.wordpress.com/2014/01/68.gif', 1, 1, 'Not feeling strange, Jonathan tries eating with chopsticks', 5, 1, 1, '2021-10-03', '2021-10-03'),
(15, 'Quest7', 1, '“Why don’t you have your room repainted?” said Robert to Lan', 'Robert suggested having Lam’s room repainted|Robert asked Lam why you didn’t have your room repainted|Robert wanted to know why Lam doesn’t have his room repainted|Robert suggested that Lam should have his room repainted', '', 1, 1, 'Robert suggested having Lam’s room repainted', 5, 1, 1, '2021-10-03', '2021-10-03'),
(16, 'Quest7', 1, 'I did not see Susan off at the airport. I feel bad about it now', 'I could have seen Susan off at the airport|If only I had seen Susan off at the airport|That I did not see Susan off at the airport escapes me now|It suddenly dawns on me that I should have seen Susan off at the airport', '', 1, 1, 'I could have seen Susan off at the airport', 5, 1, 1, '2021-10-03', '2021-10-03'),
(17, 'Quest7', 1, 'Sam doesn’t find it difficult to get up early in the morning', 'Sam is in two minds about getting up early in the morning|Sam is not hesitant to get up early in the morning|Sam is accustomed to getting up early in the morning|Sam is pleased with getting up early in the morning', '', 1, 1, 'Sam is not hesitant to get up early in the morning', 5, 1, 1, '2021-10-03', '2021-10-03'),
(18, 'Quest7', 1, 'People rumour that the Prince secretly got married to an ordinary girl', 'The Prince is rumoured to have secretly got married to an ordinary girl|It was rumoured that the Prince secretly got married to an ordinary girl|The Prince was rumoured to secretly get married to an ordinary girl|The Prince had secretly got married to an ordinary girl, as it was rumoured', '', 1, 1, 'The Prince had secretly got married to an ordinary girl, as it was rumoured', 5, 1, 1, '2021-10-03', '2021-10-03'),
(19, 'Quest7', 1, 'There is no doubt that Martin is the best candidate for the job', 'Martin is by all means the best candidate for the job|Without question, Martin is the best candidate for the job|In all likelihood, Martin is the best candidate for the job|Quite by chance, Martin is the best candidate for the job', '', 1, 1, 'Quite by chance, Martin is the best candidate for the job', 5, 1, 1, '2021-10-03', '2021-10-03'),
(20, 'Quest7', 1, 'Getting a good job doesn\'t matter much to me', 'I am only interested in getting a good job|It\'s interesting for me to get a good job|I am not good at getting a good job|I don\'t care about getting a good job', '', 1, 1, 'I don\'t care about getting a good job', 5, 1, 1, '2021-10-03', '2021-10-03'),
(21, 'Quest7', 1, 'They were exposed to biased information, so they didn\'t know the true story', 'If they got unbiased information, they could know the true story|If they had unbiased the information, they could have known the true story|If they had been exposed to unbiased information, they would have known the true story|If they have exposed to the unbiased information, they could have seen the true story', '', 1, 1, 'If they had been exposed to unbiased information, they would have known the true story', 5, 2, 1, '2021-10-03', '2021-10-03'),
(22, 'Quest7', 1, 'It doesn\'t cost much to run a solar power system', 'A solar power system is quite cheap to set up|Running a solar power system costs nothing|A solar power system costs so much to run|Running a solar power system is not costly', '', 1, 1, 'Running a solar power system is not costly', 5, 2, 1, '2021-10-03', '2021-10-03');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `listUserId` text NOT NULL,
  `timeRate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `totalPoint` int(10) NOT NULL,
  `totalTime` int(10) NOT NULL,
  `answer` text NOT NULL,
  `totalRecords` int(10) DEFAULT NULL,
  `numberOfCorrect` int(10) DEFAULT NULL,
  `examId` int(10) NOT NULL,
  `examName` varchar(255) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `userId`, `totalPoint`, `totalTime`, `answer`, `totalRecords`, `numberOfCorrect`, `examId`, `examName`, `createdAt`, `updatedAt`) VALUES
(11, 1, 10, 30, '[{\"id\":4,\"questionAnswer\":\"John is studying hard so as to fail the next exam\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder not to fail the next exam.\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder that he not fail the next exam\"},{\"id\":4,\"questionAnswer\":\"John is studying hard so as to fail the next exam\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder to not to fail the next exam\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder not to fail the next exam.\"},{\"id\":11,\"questionAnswer\":\"My friend suggested I take extra classes in English if I wanted to become a tourist guide\"},{\"id\":9,\"questionAnswer\":\"Don’t spend your valuable time phoning Jane – she’s out\"},{\"id\":8,\"questionAnswer\":\"The teacher asked his students why they always made terrible mistakes\"}]', NULL, NULL, 1, NULL, '0000-00-00', '0000-00-00'),
(13, 1, 5, 30, '[{\"id\":3,\"questionAnswer\":\"The substance is such toxic that protective clothing must be worn at all times.\"},{\"id\":3,\"questionAnswer\":\"The substance is too toxic to wear protective clothing at all times.\"},{\"id\":12,\"questionAnswer\":\"Darwin, who was a famous English scientist, developed the theory of evolution\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder not to fail the next exam.\"}]', NULL, NULL, 1, NULL, '2021-10-10', '2021-10-10'),
(14, 1, 15, 30, '[{\"id\":20,\"questionAnswer\":\"I am only interested in getting a good job\"},{\"id\":20,\"questionAnswer\":\"It\'s interesting for me to get a good job\"},{\"id\":13,\"questionAnswer\":\"It is said that well over ten people are interested in having an interview for the job\"},{\"id\":5,\"questionAnswer\":\"She gave in her notice with a view to starting her new job in January\"},{\"id\":2,\"questionAnswer\":\"Bill said that he would have never been to Russia and he thinks he would go there the next year.\"},{\"id\":18,\"questionAnswer\":\"It was rumoured that the Prince secretly got married to an ordinary girl\"},{\"id\":1,\"questionAnswer\":\"Bill said that he would have never been to Russia and he thinks he would go there the next year.\"},{\"id\":10,\"questionAnswer\":\"If he smoked less, he might be able to get rid of his cough\"},{\"id\":15,\"questionAnswer\":\"Robert suggested that Lam should have his room repainted\"},{\"id\":14,\"questionAnswer\":\"Jonathan is not used to eating with chopsticks\"},{\"id\":16,\"questionAnswer\":\"If only I had seen Susan off at the airport\"},{\"id\":6,\"questionAnswer\":\"The high rate of unemployment depends on the high rate of crime\"},{\"id\":9,\"questionAnswer\":\"You waste your time if you insist on phoning Jane – she’s away\"},{\"id\":7,\"questionAnswer\":\"If only you didn\'t say tot\"},{\"id\":11,\"questionAnswer\":\"My friend suggested I take extra classes in English if I wanted to become a tourist guide\"},{\"id\":19,\"questionAnswer\":\"Without question, Martin is the best candidate for the job\"},{\"id\":3,\"questionAnswer\":\"The substance is too toxic to wear protective clothing at all times.\"},{\"id\":12,\"questionAnswer\":\"Darwin who was the famous English scientist develops the theory for evolution\"},{\"id\":8,\"questionAnswer\":\"The teacher realized that his students always made terrible mistakesThe teacher complained about his students making terrible mistakes\"},{\"id\":17,\"questionAnswer\":\"Sam is not hesitant to get up early in the morning\"},{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder that he not fail the next exam\"}]', NULL, NULL, 1, NULL, '2021-10-11', '2021-10-11'),
(15, 1, 10, 30, '[{\"id\":4,\"questionAnswer\":\"John is studying hard in Oder not to fail the next exam.\"},{\"id\":20,\"questionAnswer\":\"I am only interested in getting a good job\"},{\"id\":11,\"questionAnswer\":\"My friend advised me to take extra classes in English only if I wanted to become a tourist guide\"},{\"id\":1,\"questionAnswer\":\"Bill said that he had never been to Russia and he thought he would go there the next year.\"},{\"id\":1,\"questionAnswer\":\"Bill said that he had never been to Russia and he thinks he will go there the next year.\"},{\"id\":2,\"questionAnswer\":\"Bill said that he had never been to Russia and he thinks he will go there the next year.\"},{\"id\":14,\"questionAnswer\":\"Eating with chopsticks isn’t what Jonathan used to\"},{\"id\":7,\"questionAnswer\":\"I hope you will not say that\"},{\"id\":17,\"questionAnswer\":\"Sam is accustomed to getting up early in the morning\"},{\"id\":10,\"questionAnswer\":\"If he smoked so much, he couldn’t get rid of his cough\"},{\"id\":15,\"questionAnswer\":\"Robert wanted to know why Lam doesn’t have his room repainted\"},{\"id\":8,\"questionAnswer\":\"The teacher asked his students why they always made terrible mistakes\"},{\"id\":6,\"questionAnswer\":\"The unemployment rate and the crime rate are both higher\"},{\"id\":13,\"questionAnswer\":\"People say that fewer than ten job interviews have been held so far\"},{\"id\":5,\"questionAnswer\":\"She gave in her notice, plan to start her new job in January\"},{\"id\":3,\"questionAnswer\":\" Since the substance is very toxic, so protective clothing must be worn at all times.\"},{\"id\":19,\"questionAnswer\":\"Martin is by all means the best candidate for the job\"},{\"id\":16,\"questionAnswer\":\"That I did not see Susan off at the airport escapes me now\"},{\"id\":18,\"questionAnswer\":\"The Prince was rumoured to secretly get married to an ordinary girl\"},{\"id\":9,\"questionAnswer\":\"Don’t spend your valuable time phoning Jane – she’s out\"},{\"id\":12,\"questionAnswer\":\"Darwin, who is a famous English scientist, has developed a theory on evolution\"}]', NULL, NULL, 1, NULL, '2021-10-11', '2021-10-11'),
(16, 1, 0, 30, '[{\"id\":22,\"questionAnswer\":\"A solar power system is quite cheap to set up\"},{\"id\":21,\"questionAnswer\":\"If they have exposed to the unbiased information, they could have seen the true story\"}]', NULL, NULL, 1, NULL, '2021-10-11', '2021-10-11'),
(17, 1, 0, 30, '[{\"id\":22,\"questionAnswer\":\"A solar power system is quite cheap to set up\"},{\"id\":21,\"questionAnswer\":\"If they have exposed to the unbiased information, they could have seen the true story\"}]', NULL, NULL, 1, NULL, '2021-10-11', '2021-10-11'),
(18, 1, 0, 30, '[{\"id\":22,\"questionAnswer\":\"A solar power system is quite cheap to set up\"},{\"id\":21,\"questionAnswer\":\"If they had unbiased the information, they could have known the true story\"}]', NULL, NULL, 1, NULL, '2021-10-11', '2021-10-11'),
(19, 6, 5, 30, '[{\"id\":22,\"questionAnswer\":\"Running a solar power system is not costly\"},{\"id\":21,\"questionAnswer\":\"If they have exposed to the unbiased information, they could have seen the true story\"}]', NULL, NULL, 2, NULL, '2021-10-11', '2021-10-11'),
(20, 8, 10, 30, '[{\"id\":8,\"questionAnswer\":\"The teacher asked his students why they always made terrible mistakes\"},{\"id\":19,\"questionAnswer\":\"Martin is by all means the best candidate for the job\"},{\"id\":20,\"questionAnswer\":\"I am only interested in getting a good job\"},{\"id\":6,\"questionAnswer\":\"The higher the unemployment rate is, the higher the crime rate is\"},{\"id\":10,\"questionAnswer\":\"If he didn’t smoke so much, he may get rid of his cough\"},{\"id\":1,\"questionAnswer\":\"Bill said that he has never been to Russia and he thinks he would go there the next year.\"},{\"id\":14,\"questionAnswer\":\"Jonathan is not used to eating with chopsticks\"},{\"id\":11,\"questionAnswer\":\"My friend suggested I take extra classes in English if I wanted to become a tourist guide\"}]', NULL, NULL, 1, NULL, '2021-10-12', '2021-10-12'),
(21, 9999, 0, 5509, '[]', 4, 0, 21, 'abc', '2023-02-08', '2023-02-08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `username`, `hash`, `avatar`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Cuong', 'Doan', '', 'cuongdd', '$2a$12$R1w3VC4FuLtbhg73ujynlu4GKxbUwvFsfkKyrM4il1tsn9dJzmJAi', NULL, NULL, '2021-08-18 14:59:49', '2021-08-18 14:59:49'),
(9999, 'Cuong', 'Doan', 'duycuong565@gmail.com', 'admin', '$2a$12$71JT22UUIF4QeCpWhaehB.GzeL6PqoPcTCh0zb.gNqG7ET/TTRlZa', 'https://i.ibb.co/09jdv0q/avt1.jpg', NULL, '2021-10-27 14:13:37', '2023-02-08 16:04:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `rate`
--
ALTER TABLE `rate`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10001;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
