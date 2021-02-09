create table user_role
(
user_id INT,
role_id INT,
primary key(user_id,role_id),
foreign key(user_id) references users(id),
foreign key(role_id) references roles(role_id)
);

select * from user_role
