SELECT - extracts data from a database
UPDATE - updates data in a database
DELETE - deletes data from a database
INSERT INTO - inserts new data into a database
CREATE DATABASE - creates a new database
ALTER DATABASE - modifies a database
CREATE TABLE - creates a new table
ALTER TABLE - modifies a table
DROP TABLE - deletes a table
CREATE INDEX - creates an index (search key)
DROP INDEX - deletes an index

mysql> SOURCE /Users/Your_username/Downloads/sample.sql; -- to add a database

SELECT * FROM employees ORDER BY firstname; -- Sort by firstname
SELECT * FROM employees ORDER BY firstname DESC; SORT BY DESCENDING ORDER
SELECT email FROM employees WHERE employeeNumber > 1600 AND firstName='Mami';
SELECT COUNT(DISTINCT jobTitle) FROM employees;
SELECT * FROM Customers ORDER BY Country ASC, CustomerName DESC;

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;
UPDATE employees SET lastName='Jolik' WHERE employeeNumber=4;

--MANY
UPDATE employees SET lastName='Jolik' WHERE officeCode=6;

DELETE FROM table_name WHERE condition;
DELETE FROM employees WHERE employeeNumber=4;

DELETE ALL ROWS
DELETE FROM table_name;


SELECT column_name(s)
FROM table_name
WHERE condition
    LIMIT number;


SELECT email FROM employees WHERE employeeNumber > 1000 limit 5;

MIN(), MAX()
SELECT MAX(employeeNumber) AS minPrice FROM employees;

-- JOINS
INNER JOIN -- Returns records that have matching values in both tables
LEFT OUTER JOIN --Returns all records from the left table, and the matched records from the right table
RIGHT OUTER JOIN -- Returns all records from the right table, and the matched records from the left table
FULL OUTER JOIN -- Returns all records when there is a match in either left or right table

-- SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName FROM Orders
-- INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
-- INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID;

SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;


-- UNION
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
-- UNION ALL return all the items even the duplicates
SELECT City, Country FROM Customers
WHERE Country='Germany'
UNION
SELECT City, Country FROM Suppliers
WHERE Country='Germany'
ORDER BY City;