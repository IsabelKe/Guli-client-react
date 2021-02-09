create table role_menu
(
menu_id INT,
role_id INT,
primary key(menu_id,role_id),
foreign key(menu_id) references menu(menu_id),
foreign key(role_id) references roles(role_id)
);

select * from role_menu