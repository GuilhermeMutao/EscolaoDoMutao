const mysql = require('mysql');
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid').v4;

env.config()
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'escola',
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql Connected');
});
// Database query promises
const zeroParamPromise = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const queryParamPromise = (sql, queryParam) => {
  return new Promise((resolve, reject) => {
    db.query(sql, queryParam, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
const relations = [
  'assignment_submission',
  'marks',
  'attendance',
  'assignment',
  'class',
  'fee',
  'student',
  'staff',
  'course',
  'admin',
  'department',
];

const department_data = [
  { dept_id: 'EC', d_name: 'Engenharia da Computação' },
  { dept_id: 'ADS', d_name: 'Análise e Desenvolvimento' },
];

const ec_courses = [
  {
    semester: 1,
    c_id: 'EC01',
    name: 'Calculo I',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'EC02',
    name: 'Electronica I',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'EC03',
    name: 'Sistemas digitais',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'EC04',
    name: 'Fisica I',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'EC05',
    name: 'Calculo II',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'EC06',
    name: 'Electronica II',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'EC07',
    name: 'Redes de computadores',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'EC08',
    name: 'Sistemas operacionais',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'EC09',
    name: 'Algoritmos e estrutura de dados',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'EC10',
    name: 'Circuitos integrados',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'EC11',
    name: 'Estrutura de dados',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'EC12',
    name: 'Transmissão de dados',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'EC13',
    name: 'Probabilidade e estatística',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'EC14',
    name: 'Sistemas embarcados',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'EC15',
    name: 'Programação orientada a objetos',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'EC16',
    name: 'Comunicação de dados',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'EC17',
    name: 'Microprocessadores',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'EC18',
    name: 'Desenvolvimento de sistemas',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'EC19',
    name: 'Arquitetura de computadores',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'EC20',
    name: 'Inteligência artificial',
    c_type: 'Prático',
    dept_id: 'EC',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'EC21',
    name: 'Análise e projeto de sistemas',
    c_type: 'Teórico',
    dept_id: 'EC',
    credits: 4,
  },
];

const ads_courses = [
  {
    semester: 1,
    c_id: 'ADS01',
    name: 'Matematica discreta',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'ADS02',
    name: 'Algoritmos e estrutura de dados',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'ADS03',
    name: 'Fisica I',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 1,
    c_id: 'ADS04',
    name: 'Calculo I',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'ADS05',
    name: 'Calculo II',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'ADS06',
    name: 'Fisica II',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'ADS07',
    name: 'Algoritmos e estrutura de dados',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 2,
    c_id: 'ADS08',
    name: 'Sistemas operacionais',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'ADS09',
    name: 'Circuitos integrados',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'ADS10',
    name: 'Estrutura de dados',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'ADS11',
    name: 'Probabilidade e estatística',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 3,
    c_id: 'ADS12',
    name: 'Banco de dados',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'ADS13',
    name: 'Programação orientada a objetos',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'ADS14',
    name: 'Sistemas embarcados',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'ADS15',
    name: 'Redes de computadores',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 4,
    c_id: 'ADS16',
    name: 'Comunicação de dados',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'ADS17',
    name: 'Sistemas distribuídos',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'ADS18',
    name: 'Desenvolvimento de sistemas',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'ADS19',
    name: 'Arquitetura de computadores',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 5,
    c_id: 'ADS20',
    name: 'Inteligência artificial',
    c_type: 'Prático',
    dept_id: 'ADS',
    credits: 4,
  },
  {
    semester: 6,
    c_id: 'ADS21',
    name: 'Sistemas de informação',
    c_type: 'Teórico',
    dept_id: 'ADS',
    credits: 4,
  },
];

const studentsData = [
  {
    s_name: 'Jonas Broder',
    gender: 'Masculino',
    dob: '2000-01-02',
    email: 'jonasbrother@gmail.com',
    s_address: 'Rua 1, 123',
    contact: '99768-0000',
    section: 1,
    dept_id: 'EC',
  },
  {
    s_name: 'Joana Darc',
    gender: 'Feminino',
    dob: '2002-10-30',
    email: 'joanadarc@gmail.com',
    s_address: 'Rua 2, 456',
    contact: '99768-0001',
    section: 1,
    dept_id: 'EC',
  },
  {
    s_name: 'João da Silva',
    gender: 'Masculino',
    dob: '2000-01-03',
    email: 'joaodasilva@gmail.com',
    s_address: 'Rua 3, 789',
    contact: '99768-0002',
    section: 1,
    dept_id: 'EC',
  },
  {
    s_name: 'Maria da Silva',
    gender: 'Feminino',
    dob: '2000-01-04',
    email: 'mariadasilva@gmail.com',
    s_address: 'Rua 4, 101',
    contact: '99768-0003',
    section: 1,
    dept_id: 'EC',
  },
  {
    s_name: 'Davi da Silva',
    gender: 'Masculino',
    dob: '2000-01-05',
    email: 'davisilva@gmail.com',
    s_address: 'Rua 5, 112',
    contact: '99768-0004',
    section: 1,
    dept_id: 'EC',
  },
  {
    s_name: 'José da Silva',
    gender: 'Masculino',
    dob: '2000-03-06',
    email: 'jsilva@gmail.com',
    s_address: 'Rua 6, 131',
    contact: '99768-0005',
    section: 1,
    dept_id: 'ADS',
  },
  {
    s_name: 'Guilherme da Silva',
    gender: 'Masculino',
    dob: '2000-03-07',
    email: 'guilhermesilva@gmail.com',
    s_address: 'Rua 7, 151',
    contact: '99768-0006',
    section: 1,
    dept_id: 'ADS',
  },
  {
    s_name: 'Cecilia Andrade',
    gender: 'Feminino',
    dob: '2000-03-08',
    email: 'ceciliaandrade@gmail.com',
    s_address: 'Rua 8, 171',
    contact: '99768-0007',
    section: 1,
    dept_id: 'ADS',
  },

];

const staffData = [
  {
    st_name: 'Lídia Silva',
    dob: '2001-04-25',
    email: 'lidia@gmail.com',
    st_address: 'Rua 1, 123',
    city: 'Uberaba',
    zip: '38400-000',
    contact: '33313-3333',
  },
  {
    st_name: 'Ademir Silva',
    dob: '2001-04-26',
    email: 'Ademir@yahoo.com',
    st_address: 'address 2',
    city: 'Uberaba',
    zip: '38400-000',
    contact: '33313-3334',
  },

];

const reset = async () => {
  try {
    await new Promise((r) => setTimeout(r, 2000)); // wait for mysql connection
    await zeroParamPromise('SET FOREIGN_KEY_CHECKS = 0');
    for (let i = 0; i < relations.length; ++i) {
      await zeroParamPromise('TRUNCATE TABLE ' + relations[i]);
      console.log(relations[i] + ' truncated');
    }
    await zeroParamPromise('SET FOREIGN_KEY_CHECKS = 1');

    // 1.Add Admin
    const hashedPassword = await bcrypt.hash('123456', 8);
    await queryParamPromise('insert into admin set ?', {
      admin_id: uuidv4(),
      name: 'Lidia Bononi',
      email: 'lidiabononi@gmail.com',
      password: hashedPassword,
    });
    await queryParamPromise('insert into admin set ?', {
      admin_id: uuidv4(),
      name: 'Ademir da Guia',
      email: 'ademirguia@yahoo.com',
      password: hashedPassword,
    });
    console.log('admin added');
    // 2.Add Departments
    for (let i = 0; i < department_data.length; ++i) {
      await queryParamPromise(
        'insert into department set ?',
        department_data[i]
      );
    }
    console.log('departments added');
    // 3.Add Courses
    for (let i = 0; i < ec_courses.length; ++i) {
      await queryParamPromise('insert into course set ?', ec_courses[i]);
    }
    for (let i = 0; i < ads_courses.length; ++i) {
      await queryParamPromise('insert into course set ?', ads_courses[i]);
    }

    console.log('courses added');
    // 4.Add Staffs
    for (let i = 0; i < staffData.length; ++i) {
      const currentStaff = staffData[i];
      const dept_id = department_data[parseInt(i / 15)].dept_id;
      const gender = i % 2 === 0 ? 'Male' : 'Female';
      const hashedPassword = await bcrypt.hash(currentStaff.dob, 8);
      await queryParamPromise('insert into staff set ?', {
        st_id: uuidv4(),
        st_name: currentStaff.st_name,
        gender,
        dob: currentStaff.dob,
        email: currentStaff.email,
        st_address:
          currentStaff.st_address +
          '-' +
          currentStaff.city +
          '-' +
          currentStaff.zip,
        contact: currentStaff.contact.split(' ')[0],
        dept_id,
        password: hashedPassword,
      });
    }
    console.log('staffs added');

    // 5.Add Students
    for (let i = 0; i < studentsData.length; ++i) {
      let currentStudent = studentsData[i];
      const hashedPassword = await bcrypt.hash(currentStudent.dob, 8);
      currentStudent = {
        s_id: uuidv4(),
        ...currentStudent,
        password: hashedPassword,
      };
      await queryParamPromise('insert into student set ?', currentStudent);
    }
    console.log('students added');
    // 5.Add Classes
    for (department of department_data) {
      const dept_id = department.dept_id;
      const staffs = await queryParamPromise(
        'SELECT st_id from staff where dept_id = ?',
        [dept_id]
      );
      const courses = await queryParamPromise(
        'SELECT c_id from course where dept_id = ? AND semester = ?',
        [dept_id, 1]
      );
      let st_idx = 0;
      for (let j = 0; j < courses.length; ++j) {
        await queryParamPromise('INSERT INTO class set ?', {
          section: 1,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
        await queryParamPromise('INSERT INTO class set ?', {
          section: 2,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
        await queryParamPromise('INSERT INTO class set ?', {
          section: 3,
          semester: 1,
          c_id: courses[j].c_id,
          st_id: staffs[st_idx++].st_id,
        });
      }
    }
    console.log('Classes Added');
  } catch (err) {
    throw err;
  } finally {
    process.exit();
  }
};
reset();
