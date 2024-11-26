const express = require(`express`);
const mariadb = require(`mariadb`);

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gtchance*07',
    database: 'guestbook'
});

const app = express();

const PORT = 300;

app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to database');
        return conn;
    } catch (err) {
        console.log('Error connecting to database: ' + err);
    }
}

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/success', async (req, res) => {
    let data = req.body;
    const conn = await connect();

    /*
    fname: 'maddie',
    lname: 'c',
    job: 'job',
    company: 'company x',
    linkedIn: 'https://linkedin.com/in/',
    email: 'email@gmail.com',
    meeting: 'other',
    meetingOther: 'other other other',
    message: 'here is my message',
    mailing: 'on',
    format: 'on'
    */
    if (data.meeting == "other"){
        await conn.query(
            `INSERT INTO guests 
            (first_name, last_name, job_title, company, linkedin, email, meeting, message, mailing_list, mailing_format)
            VALUES ('${data.fname}', '${data.lname}', '${data.job}', '${data.company}', '${data.linkedIn}', '${data.email}',
             '${data.meetingOther}', '${data.message}', '${data.mailing}', '${data.format}')`
        );
    } else {
        await conn.query(
            `INSERT INTO guests 
            (first_name, last_name, job_title, company, linkedin, email, meeting, message, mailing_list, mailing_format)
            VALUES ('${data.fname}', '${data.lname}', '${data.job}', '${data.company}', '${data.linkedIn}', '${data.email}',
             '${data.meetingOther}', '${data.message}', '${data.mailing}', '${data.format}')`
        );
    }
    
    res.render('success', {data: data});
});

app.get('/admin', async (req, res) =>{
    const conn = await connect();
    const guests = await conn.query(
        `SELECT * FROM guests ORDER BY date_submitted DESC`
    );

    res.render('admin', {guests: guests})
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});