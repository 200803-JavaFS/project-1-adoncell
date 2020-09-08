CREATE TABLE ers_user_roles (
	ers_user_role_id serial PRIMARY KEY,
	user_role varchar(10)
);

CREATE TABLE ers_users (
	ers_users_id serial PRIMARY KEY,
	ers_username varchar(50) UNIQUE, 
	ers_password varchar(50),
	user_first_name varchar(100),
	user_last_name varchar(100),
	user_email varchar(150) UNIQUE,
	user_role_id integer REFERENCES ers_user_roles(ers_user_role_id)
);

CREATE TABLE ers_reimbursement_status (
	reimb_status_id serial PRIMARY KEY,
	reimb_status varchar(10)
);

CREATE TABLE ers_reimbursement_type (
	reimb_type_id serial PRIMARY KEY, 
	reimb_type varchar(10)
);

CREATE TABLE ers_reimbursement (
	reimb_id serial PRIMARY KEY, 
	reimb_amount NUMERIC(15,2),
	reimb_submitted timestamp,
	reimb_resolved timestamp,
	reimb_description varchar(250),
	reimb_author integer REFERENCES ers_users(ers_users_id),
	reimb_resolver integer REFERENCES ers_users(ers_users_id),
	reimb_status_id integer REFERENCES ers_reimbursement_status(reimb_status_id),
	reimb_type_id integer REFERENCES ers_reimbursement_type(reimb_type_id)
);

--User roles: Employee, Manager
INSERT INTO ers_user_roles (user_role) VALUES ('Employee'), ('Manager');

--Statuses: Pending, Approved, Denied
INSERT INTO ers_reimbursement_status (reimb_status) VALUES ('Pending'), ('Approved'), ('Denied');

--TYPES: Lodging, Travel, Food, Other
INSERT INTO ers_reimbursement_type (reimb_type) VALUES ('Lodging'), ('Travel'), ('Food'), ('Other');

--Employee 1: Victoria Doncell
--Employee 2: Rebecca Urena
--Employee 3: Mark Johnson
--Employee 4: Autumn Brown
INSERT INTO ers_users (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id) VALUES
('vicky9502', 'matrix00', 'Victoria', 'Doncell', 'vdoncell@gmail.com', 1),
('rebecca.ayana', 'futurenurse98', 'Rebecca', 'Urena', 'rurena@gmail.com', 1),
('mark_j_2', 'watertheplants', 'Mark', 'Johnson', 'mjohnson@gmail.com', 1),
('fallbrown', 'autsonthesauce', 'Autumn', 'Brown', 'abrown@gmail.com', 1);

--Manager 1: Annabella Doncell
--Manager 2: Manuel Casasnovas
INSERT INTO ers_users (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id) VALUES
('adoncell', 'rev153!', 'Annabella', 'Doncell', 'adoncell@gmail.com', 2),
('manuuwisdom', 'inalaskarn', 'Manuel', 'Casasnovas', 'mcasasnovas@gmail.com', 2);

