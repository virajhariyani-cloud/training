# Write your MySQL query statement below
-- SELECT Department.name As Department,
-- Employee.name AS Employee,
-- Employee.salary As Salary FROM Employee INNER JOIN Department ON Employee.departmentId=Department.id WHERE Employee.salary=(SELECT departmentId,MAX(SALARY) FROM Employee WHERE departmentId=Employee.departmentId GROUP BY departmentId);
SELECT d.name AS Department,
       e.name AS Employee,
       e.salary AS Salary
FROM Employee e
JOIN Department d 
  ON e.departmentId = d.id
JOIN (
    SELECT departmentId, MAX(salary) AS max_salary
    FROM Employee
    GROUP BY departmentId
) m
ON e.departmentId = m.departmentId
AND e.salary = m.max_salary;
