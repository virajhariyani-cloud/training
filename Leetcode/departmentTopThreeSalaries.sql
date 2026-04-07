# Write your MySQL query statement below
-- SELECT name as Department LEFT JOIN Employee AS e ON e.departmentId=department.id;
WITH new_table AS (
    SELECT 
        d.name AS Department,
        e.name AS Employee,
        e.salary AS Salary,
        DENSE_RANK() OVER(PARTITION BY d.name ORDER BY e.salary DESC) AS ranking
    FROM Employee e
    LEFT JOIN Department d
    ON e.departmentId = d.id
)
SELECT Department, Employee, Salary
FROM new_table
WHERE ranking <= 3;
