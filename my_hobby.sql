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
);

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
