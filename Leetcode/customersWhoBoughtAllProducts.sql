SELECT customer_id from Customer Group BY customer_id Having COUNT(DISTINCT product_key)=(SELECT COUNT(*) from Product);
