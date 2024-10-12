-- // MySQL database schema

DROP SCHEMA IF EXISTS bbbc;
CREATE SCHEMA bbbc;
USE bbbc;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `news_img`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `staff`;
DROP TABLE IF EXISTS `question`;
DROP TABLE IF EXISTS `user_prediction`;
DROP TABLE IF EXISTS `match`;
DROP TABLE IF EXISTS `team`;
DROP TABLE IF EXISTS `prediction`;
DROP TABLE IF EXISTS `b_store`;
DROP TABLE IF EXISTS `video`;

CREATE TABLE `news_img` (
    `news_img_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `url` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `news` (
    `news_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` varchar(255) NOT NULL,
    `body` text,
    `image_id` int,
    FOREIGN KEY (image_id) REFERENCES news_img(news_img_id)
);

CREATE TABLE `users` (
    `user_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` varchar(45) UNIQUE NOT NULL,
    `username` varchar(45) UNIQUE NOT NULL,
    `password` varchar(65),
    `reward` int
);

CREATE TABLE `staff` (
    `staff_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `surname` varchar(255),
    `given_name` varchar(255),
    `position` varchar(255),
    `description` text,
    `image` varchar(255)
);

CREATE TABLE `question` (
    `question_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `question` varchar(255)
);

INSERT INTO question (question) VALUES
('Who will be the MVP?'),
('Who will be the top scorer?'),
('Who will be the rebound leader?'),
('Who will be the assist leader?'),
('Who will be the block leader?'),
('Who will be the steal leader?');

CREATE TABLE `team` (
    `Team_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `city` varchar(255),
    `team` varchar(255),
    `color` varchar(255),
    `logo` varchar(255)
);

CREATE TABLE `match` (
    `game_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` varchar(255),
    `date` date,
    `TeamA_id` int,
    `TeamA_score` int,
    `TeamB_id` int,
    `TeamB_score` int,
    `arena` varchar(255),
    `matchType` varchar(255),
    FOREIGN KEY (TeamA_id) REFERENCES team(Team_id),
    FOREIGN KEY (TeamB_id) REFERENCES team(Team_id)
);

CREATE TABLE `user_prediction` (
    `user_id` int NOT NULL,
    `game_id` int NOT NULL,
    `answer1` int,
    `answer2` int,
    `answer3` int,
    `answer4` int,
    `score` int,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (game_id) REFERENCES `match`(game_id)
);

CREATE INDEX idx_type ON `match`(`type`);

CREATE TABLE `prediction` (
    `game_id` int,
    `type` varchar(255),
    `question1_id` int,
    `question2_id` int,
    `question3_id` int,
    `question4_id` int,
    `answer1` int,
    `answer2` int,
    `answer3` int,
    `answer4` int,
    FOREIGN KEY (question1_id) REFERENCES question(question_id),
    FOREIGN KEY (question2_id) REFERENCES question(question_id),
    FOREIGN KEY (question3_id) REFERENCES question(question_id),
    FOREIGN KEY (question4_id) REFERENCES question(question_id),
    FOREIGN KEY (game_id) REFERENCES `match`(game_id)
);

DELIMITER $$

CREATE PROCEDURE add_prediction(IN new_game_id INT)
BEGIN
    DECLARE q1_id INT;
    DECLARE q2_id INT;
    DECLARE q3_id INT;
    DECLARE q4_id INT;
    DECLARE match_type VARCHAR(255);

    -- Get the total number of questions in the question table. 
    DECLARE total_questions INT;
    SELECT COUNT(*) INTO total_questions FROM question;

    -- Check if the total number of questions is less than 4. 
    IF total_questions < 4 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough questions in the question table';
    END IF;

    -- Select 4 questions from the question table. 
    SELECT question_id INTO q1_id FROM question ORDER BY RAND() LIMIT 1;
    SELECT question_id INTO q2_id FROM question WHERE question_id != q1_id ORDER BY RAND() LIMIT 1;
    SELECT question_id INTO q3_id FROM question WHERE question_id NOT IN (q1_id, q2_id) ORDER BY RAND() LIMIT 1;
    SELECT question_id INTO q4_id FROM question WHERE question_id NOT IN (q1_id, q2_id, q3_id) ORDER BY RAND() LIMIT 1;

    -- Get the type from the match table based on the game_id.
    SELECT `type` INTO match_type FROM `match` WHERE game_id = new_game_id;

    -- Insert the game_id, type, question1_id, question2_id, question3_id, question4_id into the prediction table. 
    INSERT INTO prediction (game_id, `type`, question1_id, question2_id, question3_id, question4_id)
    VALUES (new_game_id, match_type, q1_id, q2_id, q3_id, q4_id);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_match_insert
AFTER INSERT ON `match`
FOR EACH ROW
BEGIN
    -- Check if the inserted type is 'Coming match'
    IF NEW.type = 'Coming match' THEN
        -- Call the add_prediction stored procedure with the new game_id
        CALL add_prediction(NEW.game_id);
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_match_update
AFTER UPDATE ON `match`
FOR EACH ROW
BEGIN
    -- Check if the type has actually changed
    IF OLD.`type` != NEW.`type` THEN
        -- Update the corresponding type in the prediction table
        UPDATE prediction
        SET `type` = NEW.`type`
        WHERE game_id = NEW.game_id;
    END IF;

    -- Check if the type has changed to 'Coming match'
    IF NEW.type = 'Coming match' THEN
        -- Call the add_prediction stored procedure with the new game_id
        CALL add_prediction(NEW.game_id);
    END IF;
END$$

DELIMITER ;

ALTER TABLE prediction 
ADD CONSTRAINT prediction_ibfk_6 
FOREIGN KEY (`type`) 
REFERENCES `match`(`type`)
ON UPDATE CASCADE;

CREATE TABLE `b_store` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL,
    `category` varchar(255),
    `image` varchar(255),
    `description` text,
    `price` int NOT NULL,
    `in_stock` int
);

CREATE TABLE `video` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` varchar(255),
    `url` varchar(255)
);

-- insert video data
INSERT INTO video (title, url) VALUES
('NBL24 with Brian Kerle', 'https://www.youtube.com/embed/eJVIvfmmTCk'),
('New Zealand Breakers vs. Brisbane Bullets - Game Highlights - Round 20, NBL24', 'https://www.youtube.com/embed/rKmiRRfW1PA'),
('Brisbane Bullets vs. Adelaide 36ers - Game Highlights - Round 19, NBL24', 'https://www.youtube.com/embed/KulBiky4lqY');


-- insert news_img data
INSERT INTO news_img (url) VALUES
('../../assets/img/News/1.jpg'),
('../../assets/img/News/2.jpg'),
('../../assets/img/News/3.jpg'),
('../../assets/img/Temp/1.jpg'),
('../../assets/img/Temp/2.jpg'),
('../../assets/img/Temp/3.jpg'),
('../../assets/img/Temp/4.jpg');

-- get news_img_id
SELECT news_img_id, url FROM news_img WHERE url IN (
  '../../assets/img/News/1.jpg',
  '../../assets/img/News/2.jpg',
  '../../assets/img/News/3.jpg',
  '../../assets/img/Temp/1.jpg',
  '../../assets/img/Temp/2.jpg',
  '../../assets/img/Temp/3.jpg',
  '../../assets/img/Temp/4.jpg'
);

-- insert news data
INSERT INTO news (title, body, image_id) VALUES
('Tohi Smith-Milner signs on for NBL25', 'The Brisbane Bullets are pleased to announce the signing of Tohi Smith-Milner for 2024/25 NBL season, with a team option in the second year.\n\nThe 205cm forward joins the Bullets with vast international and NBL experience and will bring his toughness and versatility to Brisbane in NBL25.\n\nSmith-Milner grew up in Auckland and began his NBL career with Melbourne United in the 2015/16 season. He spent five seasons at United and was a part of the NBL championship winning team in 2018 alongside Casey Prather and Justin Schueller. He also played at South-East Melbourne Phoenix and Adelaide 36ers, amassing 141 career NBL games.\n\nSmith-Milner has represented New Zealand at multiple World Championships, the Commonwealth Games and made the all-tournament team at the Asia Cup in 2022.\n\nHe is currently playing for the Wellington Saints in the NZNBL where he is averaging 19.5ppg and 9 rpg, including 30 points (8/11 3PM) and 12 rebounds at the weekend.\n\nBrisbane Bullets Hostplus Head Coach Justin Schueller welcomed Smith-Milner to the Bullets.\n\n“Tohi is an athlete with huge potential that we believe is ready to have an impact in this league,” Schueller said.\n\n“His ability to space and stretch the floor with his shooting, IQ and versatility makes him a key piece to our roster build.” \n\n“Tohi has championship experience, and we look forward to what he will provide our program this season.”\n\nTohi is looking forward to joining Brisbane ahead of NBL25.\n\n“I’m really excited for this coming season. It will be great to join the Bullets and reconnect with some of the boys I’ve played with before as well as Justin who I’ve been coached by at United in the NBL as well as Kilsyth in the NBL1,” Smith-Milner said.\n\n“I’m ready to come in and be able to make an impact wherever possible.”\n\nSmith-Milner joins Josh Bannan, Tyrell Harrison, Sam McDaniel, Mitch Norton, Casey Prather, Isaac White, Rocco Zikarsky and Deng Adel on the Bullets roster for NBL25.', 1),
('Bullets Off Season Wrap - April 16', '', 2),
('Brisbane Bullets welcome Deng Adel', '', 3),
('News Title 1', 'News body content 1', 1),
('News Title 2', 'News body content 2', 2),
('News Title 3', 'News body content 3', 3),
('News Title 4', 'News body content 4', 4);


-- insert team data
INSERT INTO team (city, team, logo) VALUES
('Brisbane', 'Brisbane Bullets', '../../assets/img/TeamLogo/BBBC.png'),
('Cairns', 'Cairns Taipans', '../../assets/img/TeamLogo/Cairns Taipans NEG.png'),
('Adelaide', 'Adelaide 36ers', '../../assets/img/TeamLogo/Adelaide 36ers.png'),
('Melbourne', 'Melbourne', '../../assets/img/TeamLogo/Melbourne.png'),
('Illawarra', 'Illawarra Hawks', '../../assets/img/TeamLogo/Illawarra Hawks.png'),
('Sydney', 'Kings', '../../assets/img/TeamLogo/Kings.png'),
('Tasmania', 'Tasmania JackJumpers', '../../assets/img/TeamLogo/Tasmania JackJumpers.png');

-- get team_id
SELECT Team_id, team FROM team WHERE team IN (
  'Brisbane Bullets',
  'Cairns Taipans',
  'Adelaide 36ers',
  'Melbourne',
  'Illawarra Hawks',
  'Kings',
  'Tasmania JackJumpers'
);

-- Brisbane Bullets = 1
-- Cairns Taipans = 2
-- Adelaide 36ers = 3
-- Melbourne = 4
-- Illawarra Hawks = 5
-- Kings = 6
-- Tasmania JackJumpers = 7

-- insert match data
INSERT INTO `match` (game_id, type, date, TeamA_id, TeamA_score, TeamB_id, TeamB_score, arena, matchType) VALUES
(1, 'Past match', '2024-04-23', 1, 96, 2, 65, 'Nissan Arena', 'Friendly Match'),
(2, 'Past match', '2024-04-24', 3, 78, 1, 89, 'Nissan Arena', 'Friendly Match'),
(3, 'Past match', '2024-04-25', 1, 92, 4, 96, 'Nissan Arena', 'Friendly Match'),
(4, 'Past match', '2024-04-26', 1, 88, 5, 95, 'Nissan Arena', 'Friendly Match'),
(5, 'Past match', '2024-04-27', 6, 76, 1, 98, 'Nissan Arena', 'Friendly Match'),
(6, 'Past match', '2024-04-28', 1, 90, 7, 87, 'Nissan Arena', 'Friendly Match'),
(7, 'Live match', '2024-04-29', 3, 78, 1, 89, 'Nissan Arena', 'Friendly Match'),
(8, 'Coming match', '2024-06-29', 3, 0, 1, 0, 'Nissan Arena', 'Friendly Match');

-- insert staff data
INSERT INTO staff (surname, given_name, position, description, image) VALUES
('Smith', 'Chris', 'Guard', 
'Arrives for his first season at the Brisbane Bullets in the NBL a world renowned shooting threat having shot at more than 40 per cent from three-point range his entire career.\n\n
The 29-year-old spent his two years in college at Utah State University where he averaged 13.9 points, 4.5 rebounds and 2.3 assists a game while making 126 three-pointers across his 62 appearances going at 46.5 per cent.\n\n
Began his professional career playing in France with Vichy-Clermont before a season in Belgium with Circus Brussels, a season in Hungary with PVSK-Veolia and in Poland with Stal Ostrow Wielkopolski.\n\n
Spent the last two seasons in Japan with the Chiba Jets, and had the two best seasons of his professional career averaging 16.3 points while going at 40.4 from three-point range in 2021/22, and then in 2022/23 upped that to 17.0 points at 43.7 per cent.\n\n
Was named to the B-League Best Five on the back of that season that leads straight into his first season now in the NBL at the Bullets where he will look to provide that terrific shooting and scoring threat.', 
'../../assets/img/Player/Chris Smith.jpg'),
('Hadley', 'Gabe', 'Guard', 
'Gabe Hadley has built himself a tremendous career in the NBL1 South at the Geelong United Supercats to bang down the door to the NBL, and he has joined the Brisbane Bullets for NBL24.\n\n
The now 25-year-old has carved out a terrific career for himself at the Supercats firstly in the SEABL and now the NBL1 South competition, and with his all-round talents as a guard who could shoot, score and run his team\'s offence, an NBL chance seemed just a matter of time.\n\n
He did receive his first taste of the NBL at the Cairns Taipans firstly as a training player, then injury replacement player and more recently in the 2022/23 season as a development player where he got to make his debut.\n\n
On the back of that, he returned to the Supercats for the 2023 NBL1 South season and helped them to a flying finish to the season despite narrowly missing the finals. He was terrific averaging 20.5 points, 4.6 rebounds, 2.7 assists and 1.2 steals a game.\n\n
He now has reunited with his Geelong coach Justin Schueller at the Bullets as he looks to take advantage of what he hopes will be more opportunities.', 
'../../assets/img/Player/Gabe Hadley.jpg'),
('White', 'Isaac', 'Guard',
'Has always been a pure scorer and on the back of leading the NBL1 scoring across the country in 2023, joins the Brisbane Bullets for the first time in NBL24.\n\n
            He has played 83 games in the NBL coming into the 2023/24 season, but it was some stability and a full roster spot he has been craving and that\'s what the Bullets will now provide him.\n\n
            The now 25-year-old grew up in Adelaide and came through at the Sturt Sabres even scoring 65 points in 2017 against the West Adelaide Bearcats while leading South Australia to the under-20s championship that year.\n\n
            Ended up spending three years in college at Stanford University before beginning his NBL career with the Illawarra Hawks in the 2020/21 season.\n\n
            Spent two seasons with the Hawks before ending up at the Tasmania JackJumpers in NBL23 as an injury replacement player. Ended up playing a big role for the whole season including two 18-point performances.\n\n
            Was always going to sign a full contract again somewhere for NBL24 on the back of what he was doing leading the nation in scoring with 32.7 points a game playing in the NBL1 North at the Mackay Meteors, and has now joined the Bullets for the first time.',
'../../assets/img/Player/Isaac White.jpg'),
('Norton', 'Mitch', 'Guard',
'He grew up wiping the floors in Townsville, achieved his dream as the youngest ever captain at the Crocodiles and has only gone from strength to strength since ahead of a first NBL season with the Brisbane Bullets.\n\n
            Having grown up in Townsville, he grew up attending Crocs match ups and even was a floor wiper for a period as he grew up as one of the best emerging talents in Queensland.\n\n
            Got his first opportunity in the NBL with his hometown team during the 2011/12 season aged just 18 and would play his first 116 games with Townsville, was the club\'s youngest ever captain and only had to move on when the club ceased to exist.\n\n
            Joined the Illawarra Hawks for the 2016/17 and 2017/18 NBL seasons cementing himself as a terrific playmaking point guard and one of the best and toughest defenders in the league.\n\n
            Then made the move west to join the Perth Wildcats starting in the 2018/19 season and made his mark immediately including playing in championship teams of 2019 and 2020, being appointed vice-captain and remaining one of the most respected competitors in the league.\n\n
            Now returns to his home state for a first season with the Bullets as a 30-year-old with 314 games in the NBL behind him.',
'../../assets/img/Player/Mitch Norton.jpg'),
('Sobey', 'Nathan', 'Guard',
'Has been a remarkable story as someone who turned his enormous athletic potential into becoming one of the best Australian basketballers through his hard work as he prepares for a fifth season with the Brisbane Bullets.\n\n
            The now 33-year-old superstar guard grew up in the Victorian town of Warrnambool before spending four years at college starting with two years at Cochise College and then the next two seasons at the University of Wyoming.\n\n
            His first NBL opportunity would come as a development player at the Cairns Taipans in 2014/15 where he showed flashes of what he was going to be capable of with his explosive athleticism.\n\n
            Earned his first full contract the next season at the Adelaide 36ers and that\'s where he confirmed himself a genuine star in the league. He was named both the NBL\'s Most Improved Player and to the All-Second Team in 2017.\n\n
            Was a key member of Adelaide\'s run to the 2018 Grand Final before joining the Brisbane Bullets in 2019/20 where he has remained ever since, now being a veteran of 233 NBL games.\n\n
            On top of that, has been a regular Australian Boomers member including being part of the bronze medal winning team in Tokyo and now enters NBL24 on the back of an inspirational performance leading the Ipswich Force to a first ever NBL1 North championship as Grand Final MVP.',
'../../assets/img/Player/Nathan Sobey.jpg'),
('McDaniel', 'Sam', 'Guard',
'Has been a significant member of whatever team he has been part of already in his 117-game NBL career as he prepares for a first season with the Brisbane Bullets.\n\n
            Is the son of former NBL star Wayne who played at Adelaide, Geelong, Newcastle and Hobart, and prior to starting his own professional career spent four years at college beginning with two seasons at Southeastern Community College.\n\n
            Spent the last two years at the University of Louisiana, Monroe before returning to Australia and playing in the SEABL (now NBL1 South) and then signing on with Melbourne United as a development player.\n\n
            Joined the full roster of United for the 2018/19 season and was part of the team\'s 2021 NBL championship before joining the inaugural Tasmania JackJumpers squad for the 2021/22 season.\n\n
            Was a key figure in the JackJumpers reaching the Grand Final in NBL22 before then being Grand Final MVP in the Hobart Chargers winning an NBL1 South championship.\n\n
            After a second season with the JackJumpers, had another strong 2023 NBL1 South season as the league\'s Best Defensive Player and now joins the Bullets for the first time in NBL24.',
'../../assets/img/Player/Sam McDaniel.jpg'),
('Scott', 'Shannon', 'Guard',
'None',
'../../assets/img/Player/Shannon Scott.jpg'),
('Devers', 'Tristan', 'Guard',
'The 18-year-old guard will get his first taste of the NBL in the 2023/24 season signing with the Brisbane Bullets as a development player.\n\n
            The versatile guard is a good size standing 6\'4 and joins the Bullets having come through the ranks of his local club the Nunawading Spectres and has been a regular in junior national teams.\n\n
            He has played with Australian team at both the under-17 FIBA World Cup and under-16 Asia Cup. Was coached by Bullets head coach Justin Schueller at the World Cup, so in a lot of ways it was a natural fit for his first foray into the NBL to come with Brisbane.\n\n
            Has continued his development as a combo guard and that included a game this past NBL1 South season at the Nunawading Spectres where he scored 26 points against Andrew Gaze\'s Melbourne Tigers ahead of moving north to join the Bullets for NBL24.',
'../../assets/img/Player/Tristan Devers.jpg'),
('Bannan', 'Josh', 'Forward',
'None',
'../../assets/img/Player/Josh Bannan.jpg'),
('Mitchell', 'DJ', 'Forward',
'The 26-year-old is entering a second NBL season with the Brisbane Bullets and having proven himself a standout shooter for his size, will be looking to continue his emergence.\n\n
            His father, Mike, played in the NBL as an import with the North Melbourne Giants in 1997 which is where his parents met and while he was born in Melbourne, grew up in Fresno, California and ended up attending college firstly at Wake Forest and then Santa Clara.\n\n
            Started his professional carer in the 2021/22 season in the Netherlands playing for BAL where he impressed averaging 16.0 points, 8.2 rebounds and 2.8 assists a game before coming down under to play in the NBL1 North at the Gold Coast Rollers.\n\n
            Was a key part of the team that went on to win the NBL1 North championship putting up 18.4 points, 8.6 rebounds, 2.7 assists and 1.8 blocks leading into his first NBL season at the Bullets.\n\n
            Showed encouraging signs largely as a power forward in NBL23 and his three-point shooting at 44.4 per cent was especially impressive before he spent this off-season playing in Poland with ?l?sk Wroc?aw.\n\n
            His team reached the championship series ahead of him now returning to the Bullets for a second season.',
'../../assets/img/Player/DJ Mitchell.jpg'),
('Prather', 'Casey', 'Forward',
'The 22-year-old forward decided to not complete his college career and instead start his professional career early and he is going to do that at the Brisbane Bullets in NBL24.\n\n
            Having grown up in Melbourne, the now 6\'10 power forward was always a talent on the rise in Australian basketball and played in the under-17s team at the 2018 World Cup where his now Bullets coach Justin Schueller was in charge.\n\n
            Then attended the University of Montana for the last three years and over that time he averaged 13.1 points and 7.6 rebounds including his 2022/23 season where he put up 15.0 points and 8.5 boards including shooting 49.9 per cent from the field and 40.4 from beyond the arc.\n\n
            Someone who stands at 6\'10 and can shoot the ball like he can was always going to attract plenty of interest from clubs to start his professional career, but it was the Bullets who won his signature and he will now look to make his mark as a rookie in the 2023/24 season.',
'../../assets/img/Player/Casey Prather.jpg'),
('Johns', 'Matthew', 'Power Forward',
'The Geelong product is entering his second season with the Brisbane Bullets and the powerfully built 24-year-old continues to improve year after year.\n\n
            With an impressive 203cm, 103kg frame, he has always had a powerful body to build his game around and the Geelong native spent his first two seasons at college with the University of South Dakota.\n\n
            He played 25 games over those two seasons with the Coyotes before spending his last two years at Concordia University St Paul before returning home to Geelong to complete the 2022 NBL1 South season at the Supercats.\n\n
            That led into his first NBL opportunity in the 2022/23 season as a development player with the Bullets and then he played in 2023 in the NBL1 North at the Brisbane Capitals.\n\n
            The big man is back again with the Bullets in NBL24 and adds some extra size and grunt, as well as experience now as a development player to add to the front court depth under a coach he is familiar with, Justin Schueller.',
'../../assets/img/Player/Matthew Johns.jpg'),
('Baynes', 'Aron', 'Center',
'Is one of Australias all-time most decorated basketball players on the world stage and is entering his second season at the Brisbane Bullets ready to get back to his best after a career-threatening injury.\n\n
            After being born in Gisborne, New Zealand, spent most of his childhood in the Far North Queensland town of Mareeba and then went to the Australian Institute of Sport in 2004, and the rest is history.\n\n
            Had a terrific four-year college career at Washington State University before starting his professional career throughout Europe in Lithuania, Germany, Greece and Slovenia.\n\n
            His first NBA opportunity came in 2013 at the San Antonio Spurs where he went on to win a championship in 2014. \n\n
            Spent two seasons at the Detroit Pistons, two at the Boston Celtics and his career-best season was 2019/20 at the Phoenix Suns where he averaged 11.5 points and 5.6 rebounds a game while shooting 35.1 per cent from three-point land.\n\n
            Played his last season in 2020/21 at the Toronto Raptors to amass 574 NBA appearances.\n\n
            It\'s in the green-and-gold of the Boomers where he has been even more significant playing for Australia at the Olympics of 2012, 2016 and 2021, and World Cups of 2010, 2014 and 2019.\n\n
            However, his career was in serious jeopardy with a serious spinal cord nerve injury at Tokyo in 2021. He made it back to play in NBL23 at the Bullets and now is ready to get back to his best in NBL24.',
'../../assets/img/Player/Aron Baynes.jpg'),
('Zikarsky', 'Rocco', 'Center',
'The recently turned 17-year-old who already stands 7`3 tall has a remarkable potential and he is going to begin that professional journey in NBL24 with the Brisbane Bullets.\n\n
        Despite being aged just 16, was one of the hottest properties and with the world at his feet but decided to join the NBL Next Star program to start his professional career and signed with the Brisbane Bullets.\n\n
        Penned a two-year Next Star deal to join the Bullets given he won\'t be eligible for the NBA Draft until 2025 and having only just turned 17, the big man is one of the most exciting talents to come through Australian basketball in a long time.\n\n
        Has starred in Queensland representative teams and been part of the NBA Global Academy in Canberra while also having played at the Centre of Excellence in the NBL1 East during 2023, ahead of now joining the Bullets ahead of his first NBL season.\n\n
        Given his pure size and with the ability to move well given his size and his ability to play above the rim at both ends of the floor, it\'s obvious why there is so much excitement surrounding him.',
'../../assets/img/Player/Rocco Zikarsky.jpg'),
('Harrison', 'Tyrell', 'Center',
'The New Zealand international has battled some tough injuries through his career already, but when on the floor remains an impressive and important piece for the Brisbane Bullets at both ends.\n\n
        While he was born and raised in Brisbane, decided to represent his father\'s homeland of New Zealand in international basketball, and has been a regular Tall Blacks squad member throughout his NBL career at the Bullets.\n\n
        First signed with the Bullets for the 2017/18 season as a development player and while he only hit the floor in 17 matches over his first three seasons, he continued to develop and had an especially strong 2019 off-season in the NZ NBL with the Nelson Giants averaging 12.9 points, 6.2 rebounds and 1.2 blocks.\n\n
        His dedication to improve and patience with the Bullets was rewarded by 2021 when he appeared in all 36 matches in the NBL averaging 5.2 points and 5.8 rebounds a game. He had an even bigger impact in NBL22 with 6.2 points, 5.7 boards and 1.2 blocks.\n\n
        Injury limited him to 16 appearances last season, but when out there he was an impact maker with 5.0 points and 4.4 rebounds while shooting a phenomenal 82 per cent from the field.\n\n
        Now enters the 2023/24 season a new father and fully fit, and ready to thrive as a finisher at the rim, rebounder and defensive presence at the rack in his seventh season with the Bullets.',
'../../assets/img/Player/Tyrell Harrison.jpg'),
('Justin', 'Schueller', 'Head Coach',
'Justin Schueller brings experience to the Brisbane Bullets at the NBL level having previously held the role as Assistant Coach with Melbourne United for the past six seasons, including their Championship winning seasons in 2017/18 & 2020/21. Widely regarded as one of Australia most respected young coaches, he has been a part of the Australian Junior programs for a decade, holding the Head Coach position of the Australian U17 Men for their World Cup campaigns since 2017.',
'../../assets/img/HeadCoach.png'),
('Greg', 'Vanderjagt', 'Assistant Coach',
'Greg is a former professional basketball player with extensive experience in the Australian National Basketball League (NBL), has seamlessly transitioned into coaching. He has notably served as an Assistant Coach for various teams, including the Townsville Crocodiles and the under 17 Australian Junior National Team. Greg dedication to player development and community impact led to his appointment as Basketball Australia National Talent Identification Coordinator. Before his coaching tenure, Greg excelled as the General Manager of Basketball in Townsville, achieving championship victories and fostering growth in the sport. At the Brisbane Bullets, he played a pivotal role in community engagement and development initiatives, embodying his commitment to enhancing lives both on and off the court.',
'../../assets/img/AssistantCoach1.png'),
('Darryl', 'McDonald', 'Assistant Coach',
'Darryl McDonald joins the Bullets with a wealth of experience in the NBL both as a player and a coach. During his illustrious playing career, McDonald won three NBL Championships including one in his first year (1994) with the North Melbourne Giants and two over his last three seasons with the Melbourne Tigers. Following his playing career, he has dedicated himself to coaching, most recently as an Assistant Coach where he held the role alongside Brisbane Bullets Head Coach Justin Schueller at Melbourne United since 2020. The two were a part of the United coaching staff when the team won the NBL Championship in the 2020/2021 season.',
'../../assets/img/AssistantCoach2.png');

ALTER TABLE b_store MODIFY COLUMN price DECIMAL(8,2);

INSERT INTO b_store (name, category, image, description, price, in_stock) VALUES
("Spalding Hardwood Series Composite Indoor/Outdoor Basketball Size 7", "Basketballs", "../../assets/img/B-store/Spalding Hardwood Series Composite Indoor Outdoor Basketball Size 7.jpg", "This is a description", 60.00, 0),
("Spalding Team Marble Outdoor Basketball All Sizes", "Basketballs", "../../assets/img/B-store/Spalding Team Marble Outdoor Basketball All Sizes.jpg", "This is a description", 35.00, 0),
("Brisbane Bullets Team Logo - Outdoor Basketball", "Basketballs", "../../assets/img/B-store/Brisbane Bullets Team Logo - Outdoor Basketball.jpg", "This is a description", 35.00, 0),
("Spalding Mini Hoop", "Basketballs", "../../assets/img/B-store/Spalding Mini Hoop.jpg", "This is a description", 35.00, 0),
("2022-23 TOPPS CHROME NBL TRADING CARDS", "Accessories", "../../assets/img/B-store/Accessories/2022-23_TOPPS_CHROME_NBL_TRADING_CARDS.jpg", "This is a description", 15.00, 0),
("BRISBANE BULLETS STAPLE DUFFLE BAG", "Accessories", "../../assets/img/B-store/Accessories/BRISBANE_BULLETS_STAPLE_DUFFLE_BAG.jpg", "This is a description", 60.00, 0),
("BRISBANE BULLETS STAPLE ELITE BACKPACK", "Accessories", "../../assets/img/B-store/Accessories/BRISBANE_BULLETS_STAPLE_ELITE_BACKPACK.jpg", "This is a description", 60.00, 0),
("Spalding Mini Hoop", "Accessories", "../../assets/img/B-store/Accessories/Spalding_Mini_Hoop.jpg", "This is a description", 35.00, 0),
("BRISBANE SPORTS WATER BOTTLE", "Accessories", "../../assets/img/B-store/Accessories/BRISBANE_SPORTS_WATER_BOTTLE.jpg", "This is a description", 4.80, 0),
("MASCOT PLUSHIE", "Accessories", "../../assets/img/B-store/Accessories/MASCOT_PLUSHIE.jpg", "This is a description", 25.00, 0),
("BLACK WHITE LOGO SNAPBACK", "Headwear", "../../assets/img/B-store/Headwear/BLACK_WHITE_LOGO_SNAPBACK.jpg", "This is a description", 40.00, 0),
("BLUE BULLET CAP", "Headwear", "../../assets/img/B-store/Headwear/BLUE_BULLET_CAP.jpg", "This is a description", 40.00, 0),
("BOLD IMPACT CAP", "Headwear", "../../assets/img/B-store/Headwear/BOLD_IMPACT_CAP.jpg", "This is a description", 40.00, 0),
("BRISBANE BULLETS NEW ERA OFFICIAL TEAM COLOURS SNAPBACK CAP", "Headwear", "../../assets/img/B-store/Headwear/BRISBANE_BULLETS_NEW_ERA_OFFICIAL_TEAM_COLOURS_SNAPBACK_CAP.jpg", "This is a description", 60.00, 0),
("NAVY WHITE LOGO SNAPBACK", "Headwear", "../../assets/img/B-store/Headwear/NAVY_WHITE_LOGO_SNAPBACK.jpg", "This is a description", 40.00, 0),
("SHADOWED PRIDE CAP", "Headwear", "../../assets/img/B-store/Headwear/SHADOWED_PRIDE_CAP.jpg", "This is a description", 40.00, 0),
("WHITE BLUE SNAPBACK CAP", "Headwear", "../../assets/img/B-store/Headwear/WHITE_BLUE_SNAPBACK_CAP.jpg", "This is a description", 40.00, 0),
("BRISBANE BULLETS 202324 AWAY JERSEY - SCOTT", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_AWAY_JERSEY-SCOTT.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 BLACK OUT JERSEY - BLANK", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_BLACK_OUT_JERSEY-BLANK.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 DC JERSEY - BLANK", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_DC_JERSEY-BLANK.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 DC JERSEY - SOBEY", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_DC_JERSEY-SOBEOY.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 HOME JERSEY - BAYNES", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_HOME_JERSEY-BAYNES.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 HOME JERSEY - SCOTT", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_HOME_JERSEY-SCOTT.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 HOME JERSEY - ZIKARSKY", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_HOME_JERSEY-ZIKARSKY.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 INDIGENOUS JERSEY - SOBEY", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_INDIGENOUS_JERSEY-SOBEOY.jpg", "This is a description", 100.00, 0),
("BRISBANE BULLETS 202324 PRIDE HOME JERSEY - SMITH", "Official Kit", "../../assets/img/B-store/Official-Kit/BRISBANE_BULLETS_202324_PRIDE_HOME_JERSEY-SMITH.jpg", "This is a description", 100.00, 0),
('BRISBANE BULLETS BLACK OUT CREWNECK', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_BLACK_OUT_CREWNECK.jpg', 'This is a description', 80, 0),
('BRISBANE BULLETS BLACK OUT TEE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_BLACK_OUT_TEE.jpg', 'This is a description', 40, 0),
('BRISBANE BULLETS MYSTERY BOX', 'Supporter', '.../../assets/img/B-store/Supporter/BRISBANE_BULLETS_MYSTERY_BOX.jpg', 'This is a description', 80, 0),
('BRISBANE BULLETS SCRIPT COTTON TANK', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_SCRIPT_COTTON_TANK.jpg', 'This is a description', 35, 0),
('BRISBANE BULLETS SCRIPT INFANT ONESIE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_SCRIPT_INFANT_ONESIE.jpg', 'This is a description', 25, 0),
('BRISBANE BULLETS SCRIPT LONG SLEEVE TEE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_SCRIPT_LONG_SLEEVE_TEE.jpg', 'This is a description', 45, 0),
('BRISBANE BULLETS SCRIPT PERFORMANCE TANK', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_SCRIPT_PERFORMANCE_TANK.jpg', 'This is a description', 40, 0),
('BRISBANE BULLETS SCRIPT TEE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_SCRIPT_TEE.jpg', 'This is a description', 40, 0),
('BRISBANE BULLETS STAPLE COTTON TANK', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_COTTON_TANK.jpg', 'This is a description', 40, 0),
('BRISBANE BULLETS STAPLE HOODIE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_HOODIE.jpg', 'This is a description', 65, 0),
('BRISBANE BULLETS STAPLE INFANT ONESIE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_INFANT_ONESIE.jpg', 'This is a description', 25, 0),
('BRISBANE BULLETS STAPLE LONG SLEEVE TEE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_LONG_SLEEVE_TEE.jpg', 'This is a description', 45, 0),
('BRISBANE BULLETS STAPLE PROTECH POLO', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_PROTECH_POLO.jpg', 'This is a description', 50, 0),
('BRISBANE BULLETS STAPLE TEE', 'Supporter', '../../assets/img/B-store/Supporter/BRISBANE_BULLETS_STAPLE_TEE.jpg', 'This is a description', 40, 0),
('RETRO GOLD COAST ROLLERS JERSEY', 'Supporter', '../../assets/img/B-store/Supporter/RETRO_GOLD_COAST_ROLLERS_JERSEY.jpg', 'This is a description', 60, 0),
('STAPLE BIKE SHORTS', 'Supporter', '../../assets/img/B-store/Supporter/STAPLE_BIKE_SHORTS.jpg', 'This is a description', 50, 0),
('STAPLE CASUAL SHORTS', 'Supporter', '../../assets/img/B-store/Supporter/STAPLE_CASUAL_SHORTS.jpg', 'This is a description', 45, 0),
('VINTAGE LOGO CREWNECK', 'Supporter', '../../assets/img/B-store/Supporter/VINTAGE_LOGO_CREWNECK.jpg', 'This is a description', 80, 0);

DROP TABLE IF EXISTS `player_stats`;

CREATE TABLE `player_stats` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `staff_id` int NOT NULL,
    `name` varchar(510) NOT NULL,
    `GP` decimal(5,2),
    `PPG` decimal(5,2),
    `FGA` decimal(5,2),
    `RPG` decimal(5,2),
    `FGM` decimal(5,2),
    `FG%` decimal(5,2),
    `3PA` decimal(5,2),
    `3PM` decimal(5,2),
    `3P%` decimal(5,2),
    `FTA` decimal(5,2),
    `FTM` decimal(5,2),
    `FT%` decimal(5,2),
    `APG` decimal(5,2),
    `BPG` decimal(5,2),
    `SPG` decimal(5,2),
    `TPG` decimal(5,2),
    `F` int,
    `pos` enum('G', 'F', 'C', 'PF'),
    FOREIGN KEY (`staff_id`) REFERENCES `staff`(`staff_id`)
);

INSERT INTO player_stats (staff_id, name, GP, PPG, FGA, RPG, FGM, `FG%`, `3PA`, `3PM`, `3P%`, FTA, FTM, `FT%`, APG, BPG, SPG, TPG, F, pos)
VALUES
((SELECT staff_id FROM staff WHERE given_name = 'Nathan' AND surname = 'Sobey'), 'Nathan Sobey', 27, 20.15, 15.48, 4.41, 6.22, 40.2, 6.52, 1.81, 27.8, 6.85, 5.89, 85.9, 2.56, 0.22, 1, 2.33, 130, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Josh' AND surname = 'Bannan'), 'Josh Bannan', 19, 11.95, 10.53, 7.21, 4.74, 45.0, 1.74, 0.58, 33.3, 2.53, 1.89, 75.0, 1.53, 0.21, 0.42, 1.26, 38, 'F'),
((SELECT staff_id FROM staff WHERE given_name = 'Chris' AND surname = 'Smith'), 'Chris Smith', 27, 11, 9.59, 2.93, 4, 41.7, 5.15, 1.63, 31.7, 1.89, 1.37, 72.5, 1.11, 0.26, 0.56, 1.11, 48, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Tyrell' AND surname = 'Harrison'), 'Tyrell Harrison', 27, 9.56, 6.52, 6.22, 3.81, 58.5, 0.07, 0.04, 50.0, 2.96, 1.89, 63.7, 0.52, 1.41, 0.52, 1.63, 66, 'C'),
((SELECT staff_id FROM staff WHERE given_name = 'Sam' AND surname = 'McDaniel'), 'Sam McDaniel', 28, 8.96, 7.07, 4.04, 3.14, 44.4, 1.93, 0.61, 31.5, 2.75, 2.07, 75.3, 1.32, 0.29, 0.75, 0.71, 57, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Aron' AND surname = 'Baynes'), 'Aron Baynes', 23, 7.3, 5.35, 4.26, 2.57, 48.0, 1.09, 0.35, 32.0, 2.3, 1.83, 79.2, 0.52, 0.39, 0.13, 1.39, 48, 'C'),
((SELECT staff_id FROM staff WHERE given_name = 'Mitch' AND surname = 'Norton'), 'Mitch Norton', 28, 7.11, 5.75, 2.21, 2.36, 41.0, 1.79, 0.64, 36.0, 2.43, 1.75, 72.1, 2.71, 0.04, 0.82, 1.25, 70, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Isaac' AND surname = 'White'), 'Isaac White', 28, 7, 5.89, 2.04, 2.79, 47.3, 1.54, 0.32, 20.9, 1.54, 1.11, 72.1, 1.46, 0, 0.29, 0.68, 42, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Casey' AND surname = 'Prather'), 'Casey Prather', 7, 6.71, 7, 3, 2.43, 34.7, 2.43, 1, 41.2, 1.14, 0.86, 75.0, 0.86, 0.14, 0.71, 1.29, 6, 'F'),
((SELECT staff_id FROM staff WHERE given_name = 'DJ' AND surname = 'Mitchell'), 'DJ Mitchell', 15, 5, 3.8, 2.93, 1.93, 50.9, 2, 0.87, 43.3, 0.4, 0.27, 66.7, 0.93, 0.33, 0.53, 0.87, 6, 'F'),
((SELECT staff_id FROM staff WHERE given_name = 'Shannon' AND surname = 'Scott'), 'Shannon Scott', 22, 4.91, 4.91, 2.05, 1.64, 33.3, 2.23, 0.68, 30.6, 1.36, 0.95, 70.0, 3.27, 0.14, 1.68, 1.27, 32, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Rocco' AND surname = 'Zikarsky'), 'Rocco Zikarsky', 27, 3.22, 2.3, 2.11, 1.37, 59.7, 0.04, 0, 0, 0.96, 0.48, 50.0, 0.15, 1, 0.11, 0.56, 21, 'C'),
((SELECT staff_id FROM staff WHERE given_name = 'Gabe' AND surname = 'Hadley'), 'Gabe Hadley', 6, 0.17, 1, 0, 0, 0, 0.5, 0, 0, 0.33, 0.17, 50.0, 0, 0, 0, 0, 0, 'G'),
((SELECT staff_id FROM staff WHERE given_name = 'Matthew' AND surname = 'Johns'), 'Matthew Johns', 13, 0, 0.31, 0.77, 0, 0, 0.23, 0.08, 23.0, 0, 0, 0, 0.15, 0, 0.08, 0.23, 1, 'PF'),
((SELECT staff_id FROM staff WHERE given_name = 'Tristan' AND surname = 'Devers'), 'Tristan Devers', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 'G');


