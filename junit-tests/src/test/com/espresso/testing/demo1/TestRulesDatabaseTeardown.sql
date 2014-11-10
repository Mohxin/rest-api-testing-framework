-- runs as a privileged user
-- and drops database/users created in TestRulesDatabaseConfig.sql

drop database if exists test_TestRules;

-- workaround, creates user if not already there, no failure, allowing user to be dropped
set @oldmode = @@SESSION.sql_mode;
set @@SESSION.sql_mode = '';
grant usage on *.* to 'test_TestRules'@'localhost';
grant usage on *.* to 'test_TestRules'@'%';

drop user 'test_TestRules'@'localhost';
drop user 'test_TestRules'@'%';

set @@SESSION.sql_mode = @oldmode;
