CREATE TABLE User (
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE Admin (
	id INT PRIMARY KEY REFERENCES User(id)
);

CREATE TABLE Client (
	id INT PRIMARY KEY REFERENCES User(id)
);

CREATE TABLE Seller (
	id INT PRIMARY KEY REFERENCES User(id),
    photo_path TEXT NOT NULL,
    social_security_number VARCHAR(13) UNIQUE NOT NULL, -- Longest SSN in South Korea
    seller_genre VARCHAR(10) NOT NULL,
    seller_height FLOAT NOT NULL,
    seller_weight FLOAT NOT NULL,
    seller_foot_size FLOAT NOT NULL,
    working_time TIME NOT NULL
);

-- Prototype (it depends on API)
CREATE TABLE Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255),
    country VARCHAR(50),
    seller_id INT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES Seller(id)
);

CREATE TABLE Phone (
	id INT AUTO_INCREMENT PRIMARY KEY,
	country_code VARCHAR(3) NOT NULL,
	area_code VARCHAR(10) NOT NULL,
    phone_number VARCHAR(100) NOT NULL,
    seller_id INT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES Seller(id)
);

CREATE TABLE Post (
	id INT AUTO_INCREMENT PRIMARY KEY,
    media_path TEXT NOT NULL,
    media_type VARCHAR(50) NOT NULL,
    seller_id INT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES Seller(id)
);

