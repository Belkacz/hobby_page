CREATE DATABASE my_hobby;
USE my_hobby;
CREATE USER 'tech_web'@'localhost' IDENTIFIED BY 'tech_web1';
GRANT SELECT, INSERT, DELETE, UPDATE ON my_hobby.* TO 'tech_web'@'localhost';
FLUSH PRIVILEGES;

--
-- Baza danych: `my_hobby`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `contact_requests`
--

CREATE TABLE `contact_requests` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;