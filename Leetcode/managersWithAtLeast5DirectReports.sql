# Write your MySQL query statement below
-- SELECT name from Employee GROUP by name ORDER BY department LIMIT 1 ;
SELECT name
FROM Employee
WHERE id IN (
    SELECT managerId
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(*) >= 5
);
