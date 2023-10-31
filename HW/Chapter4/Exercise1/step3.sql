CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(20) NOT NULL,
    admission_year INT(4) NOT NULL,
    major VARCHAR(20) NOT NULL, 
    serial_number VARCHAR(10) NOT NULL, 
    phone_number VARCHAR(13), 
    address VARCHAR(50),
    total_credits INT DEFAULT 0,
    average_grade DECIMAL(3,2) DEFAULT 0.0,
    enrolled BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;