INSERT INTO public.users( userid, username, password, permissions, departmentpermissions)
	VALUES ('admin20', 'Admin', '5b6df479ad', 'M000B00,M003B00,M003B01,M003B02,M003B03', '');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M000B00','Dashboard','M000','Dashboard','B00','Menu');

insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B00','Company','M001','Company','B00','Menu');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B01','Company','M001','Company','B01','New');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B02','Company','M001','Company','B02','Edit');
insert into public.permissions(permission_code,permission_name,menu_code,menu_name,button_code,button_name)
values('M001B03','Company','M001','Company','B03','Delete');

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