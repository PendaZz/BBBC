const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    res.send('Server test success');
});

// method to register
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Check if the username or email already exists
  const checkSql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(checkSql, [username, email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).json({ message: 'Error registering user' });
      return;
    }
    if (result.length > 0) {
      const existingUser = result[0];
      if (existingUser.username === username) {
        res.status(409).json({ message: 'Username already exists' });
      } else if (existingUser.email === email) {
        res.status(409).json({ message: 'Email already exists' });
      }
      return;
    }

    // If username and email don't exist, insert the new user
    const sql = 'INSERT INTO users (username, password, email, reward) VALUES (?, ?, ?, 0)';
    db.query(sql, [username, password, email], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
        return;
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }
  
    const checkUserSql = 'SELECT * FROM users WHERE username = ?';
    
    db.query(checkUserSql, [username], (err, result) => {
      if (err) {
        console.error('Error checking username:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
        return;
      }
  
      if (result.length === 0) {
        res.status(401).json({ error: 'Username not found' });
        return;
      }
  
      const user = result[0];
  
      // Here you should verify the password properly (e.g., using bcrypt)
      if (user.password === password) {
        res.status(200).json({ message: 'Login successfully', user: user });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });


//method to get data from staff
app.get('/player',(req, res) => {
  const sql='SELECT * FROM staff WHERE position NOT LIKE ?';
  db.query(sql,['%coach%'],(err,result) => {
    if (err) {
      console.error('Error get staff information', err);
      res.status(500).json({ error: 'Error get staff information' });
      return;
    }

    res.status(200).json(result);
  })
})

app.get('/coach',(req, res) => {
  const sql='SELECT * FROM staff WHERE position LIKE ?';
  db.query(sql,['%coach%'],(err,result) => {
    if (err) {
      console.error('Error get staff information', err);
      res.status(500).json({ error: 'Error get staff information' });
      return;
    }

    res.status(200).json(result);
  })
})
//method to get data from match

app.get('/match', (req, res) => {
  const sql = 'SELECT * FROM `match`';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting match information', err);
      res.status(500).json({ error: 'Error getting match information' });
      return;
    }
    res.status(200).json(result);
  });
});

//method to get data from news

app.get('/news', (req, res) => {
  const sql = 'SELECT * FROM news';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting news information', err);
      res.status(500).json({ error: 'Error getting news information' });
      return;
    }
    res.status(200).json(result);
  });
});

app.get('/news_img',(req, res) => {
  const sql = 'SELECT * FROM news_img';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting news image information', err);
      res.status(500).json({ error: 'Error getting news imgae information' });
      return;
    }
    res.status(200).json(result);
  });
})

// method to get data from video
app.get('/video', (req, res) => {
  const sql = 'SELECT * FROM video';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting video information', err);
      res.status(500).json({ error: 'Error getting video information' });
      return;
    }
    res.status(200).json(result);
  });
});

//player_stats
app.get('/player_stats',(req, res) => {
  const sql = 'SELECT * FROM player_stats';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting player_stats information', err);
      res.status(500).json({ error: 'Error getting player_stats information' });
      return;
    }
    res.status(200).json(result);
  });
})
//prediction
app.get('/prediction',(req, res) => {
  const sql = 'SELECT * FROM prediction';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting prediction information', err);
      res.status(500).json({ error: 'Error getting prediction information' });
      return;
    }
    res.status(200).json(result);
  });
})
//question
app.get('/question',(req, res) => {
  const sql = 'SELECT * FROM question';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting question information', err);
      res.status(500).json({ error: 'Error getting question information' });
      return;
    }
    res.status(200).json(result);
  });
})
//team
app.get('/team',(req, res) => {
  const sql = 'SELECT * FROM team';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting team information', err);
      res.status(500).json({ error: 'Error getting team information' });
      return;
    }
    res.status(200).json(result);
  });
})

//user_prediction
app.get('/user_prediction',(req, res) => {
  const sql = 'SELECT * FROM user_prediction';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting user_prediction information', err);
      res.status(500).json({ error: 'Error getting user_prediction information' });
      return;
    }
    res.status(200).json(result);
  });
})
//video
app.get('video',(req, res) => {
  const sql = 'SELECT * FROM video';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting user_prediction information', err);
      res.status(500).json({ error: 'Error getting user_prediction information' });
      return;
    }
    res.status(200).json(result);
  })
})

app.get('/nearest', (req, res) => {
    const query = `
    SELECT 
        m.*, 
        t1.team AS TeamA_name, 
        t1.logo AS TeamA_logo, 
        t2.team AS TeamB_name, 
        t2.logo AS TeamB_logo,
        p.question1_id,
        p.question2_id,
        p.question3_id,
        p.question4_id
    FROM 
        \`match\` m
    JOIN 
        \`team\` t1 ON m.TeamA_id = t1.Team_id
    JOIN 
        \`team\` t2 ON m.TeamB_id = t2.Team_id
    LEFT JOIN
        \`prediction\` p ON m.game_id = p.game_id
    WHERE 
        m.date >= CURDATE()
    ORDER BY 
        m.date ASC
    LIMIT 1`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('No upcoming matches found');
        }
    });
});

app.get('/statistics', (req, res) => {
    const sql = `
        SELECT 
            ps.*, 
            s.image 
        FROM 
            player_stats ps
        JOIN 
            staff s 
        ON 
            ps.staff_id = s.staff_id
    `;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error getting statistics:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // console.log(result);
        res.status(200).json(result);
    });
});

app.post('/submitPredict', (req, res) => {
    const { user_id, game_id, answer1, answer2, answer3, answer4 } = req.body;

    // check if user prediction already exists for this game
    const checkIfExistsSql = 'SELECT * FROM user_prediction WHERE user_id = ? AND game_id = ?';
    const checkIfExistsValues = [user_id, game_id];

    db.query(checkIfExistsSql, checkIfExistsValues, (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking existing records:', checkErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // if user prediction already exists for this game, return error
        if (checkResult.length > 0) {
            res.status(400).json({ error: 'User prediction already exists for this game' });
            return;
        }

        // else, insert new user prediction
        const insertSql = `INSERT INTO user_prediction (user_id, game_id, answer1, answer2, answer3, answer4) VALUES (?, ?, ?, ?, ?, ?)`;
        const insertValues = [user_id, game_id, answer1, answer2, answer3, answer4];

        db.query(insertSql, insertValues, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Error inserting data:', insertErr);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(200).json({ message: 'Prediction submitted successfully' });
        });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

