--INFO FOR DEPARTMENT--
INSERT INTO department (name)
VALUE (Finance);
INSERT INTO department (name)
VALUE (Web Development);
INSERT INTO department (name)
VALUE (Social Media Design);
INSERT INTO department (name)
VALUE (Visual Design);

--INFO FOR EACH ROLE--
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Developer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Web Developer", 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Designer", 200000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Assistant Designer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Office Manager", 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Social Lead", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Content Creator", 120000, 3);

--INFO FOR EACH EMPLOYEE--
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jeremy", "Cox", 2, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Zack", "Anderson", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jared", "Hardwick", 4, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Meghan", "Shortwick", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Daniel", "Hannon", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Josh", "Cobos", 3, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Cobos", null, 3);


