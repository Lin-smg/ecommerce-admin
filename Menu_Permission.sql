INSERT INTO public.users( userid, username, password, department, departmentname, permissions, departmentpermissions)
	VALUES ('admin', 'Admin', '5b6df479ad', 'B01','Branch','M000B00,M003B00,M003B01,M003B02,M003B03', 'B01');

INSERT INTO public.Branch( branch_code, branch_name )
	VALUES ('B01','Branch');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M000B00','Dashboard','M000','Dashboard','B00','Menu');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B00','Company','M001','Company','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B01','New','M001','Company','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B02','Edit','M001','Company','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B03','Delete','M001','Company','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M002B00','Permission Group','M002','Permission Group','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M002B01','New','M002','Permission Group','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M002B02','Edit','M002','Permission Group','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M002B03','Delete','M002','Permission Group','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M003B00','User','M003','User','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M003B01','New','M003','User','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M003B02','Edit','M003','User','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M003B03','Delete','M003','User','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M004B00','Customer','M004','Customer','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M004B01','New','M004','Customer','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M004B02','Edit','M004','Customer','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M004B03','Delete','M004','Customer','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M005B00','Supplier','M005','Supplier','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M005B01','New','M005','Supplier','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M005B02','Edit','M005','Supplier','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M005B03','Delete','M005','Supplier','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M006B00','Branch','M006','Branch','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M006B01','New','M006','Branch','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M006B02','Edit','M006','Branch','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M006B03','Delete','M006','Branch','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M007B00','Warehouse','M007','Warehouse','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M007B01','New','M007','Warehouse','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M007B02','Edit','M007','Warehouse','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M007B03','Delete','M007','Warehouse','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M008B00','Category','M008','Category','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M008B01','New','M008','Category','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M008B02','Edit','M008','Category','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M008B03','Delete','M008','Category','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M009B00','Brand','M009','Brand','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M009B01','New','M009','Brand','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M009B02','Edit','M009','Brand','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M009B03','Delete','M009','Brand','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M010B00','Product','M010','Product','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M010B01','New','M010','Product','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M010B02','Edit','M010','Product','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M010B03','Delete','M010','Product','B03','Delete');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M011B00','UnitOfMeasure','M011','UnitOfMeasure','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M011B01','New','M011','UnitOfMeasure','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M011B02','Edit','M011','UnitOfMeasure','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M011B03','Delete','M011','UnitOfMeasure','B03','Delete');
