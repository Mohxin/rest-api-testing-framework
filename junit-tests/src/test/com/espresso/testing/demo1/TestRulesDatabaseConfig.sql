-- runs as a privileged user
-- and creates a user to login
-- and a database to work in

drop database if exists test_TestRules;
create database test_TestRules;

-- workaround, creates user if not already there, no failure, allowing user to be dropped
set @oldmode = @@SESSION.sql_mode;
set @@SESSION.sql_mode = '';
grant usage on *.* to 'test_TestRules'@'localhost';
grant usage on *.* to 'test_TestRules'@'%';

drop user 'test_TestRules'@'localhost';
drop user 'test_TestRules'@'%';

create user 'test_TestRules'@'localhost' identified by 'test_TestRules!';
create user 'test_TestRules'@'%' identified by 'test_TestRules!';

grant all privileges on test_TestRules.* to 'test_TestRules'@'localhost';
grant all privileges on test_TestRules.* to 'test_TestRules'@'%';

set @@SESSION.sql_mode = @oldmode;
