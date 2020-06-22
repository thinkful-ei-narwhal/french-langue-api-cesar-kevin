BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'bonjour', 'hello', 2),
  (2, 1, 'au revoir', 'goodbye', 3),
  (3, 1, 'Merci', 'thank you', 4),
  (4, 1, 'bonsoir', 'good evening', 5),
  (5, 1, 'bonne nuit', 'good night', 6),
  (6, 1, 'excusez-moi', 'excuse me', 7),
  (7, 1, 'pardon', 'sorry', 8),
  (8, 1, 'oui', 'yes', 9),
  (9, 1, 'non', 'no', 10),
  (10, 1, 'salle de bains', 'bathroom', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
