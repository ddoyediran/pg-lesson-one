const { Client } = require("pg");

// make a new instance of the Client constructor and specify which db to connect to using the connectionString key
const client = new Client({
  connectionString: "postgresql:localhost/pg-lesson-one",
});

// to connect
client.connect();

// function to get all the rows in our students table!
async function getStudents() {
  const results = await client.query("SELECT * FROM students");
  console.log(results.rows);
}

// To add a student
async function addStudent(name) {
  const results = await client.query(
    "INSERT INTO students (name) VALUES ($1) RETURNING *",
    [name]
  );
  console.log(results.rows[0]);
}

// to get student by id
async function getStudentById(id) {
  const results = await client.query("SELECT * FROM students");
  console.log(results.rows[id]);
}

// updated student data
async function updateStudent(oldName, newName) {
  const results = await client.query("SELECT * FROM students");
  //   console.log(results.rows[3].name);
  for (let i = 0; i < results.rows.length; i++) {
    if (results.rows[i].name === oldName) {
      //   console.log(results.rows[i].name);
      results.rows[i].name = newName;
      console.log(results.rows[i]);
      return;
    }
  }
  console.log("User not found!");
}

// Delete student
async function deleteStudent(name) {
  const results = await client.query("SELECT * FROM students");
  for (let i = 0; i < results.rows.length; i++) {
    if (results.rows[i].name === name) {
      console.log(results.rows[i]);
      results.rows.splice(i, 1);
      //   return;
    }
  }
  console.log(results.rows);
}

// let's get our students and then stop the node process
// when we start using express, process.exit will be a response from the server instead
// getStudents().then(() => process.exit(0));

// addStudent("Angelina").then(() => process.exit(0));

// getStudentById(2).then(() => process.exit(0));

// updateStudent("Matt", "Dami-Matt").then(() => process.exit(0));

deleteStudent("Matt").then(() => process.exit(0));
