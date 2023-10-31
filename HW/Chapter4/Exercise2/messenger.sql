CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    profile_link VARCHAR(100),
    profile_message VARCHAR(200),
    has_left TINYINT DEFAULT 0,
    created_on DATE DEFAULT CURDATE()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE channels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    creator_id INT,
    channel_link VARCHAR(100),
    capacity INT,
    has_left TINYINT DEFAULT 0,
    creation_on DATE DEFAULT CURDATE(),
    FOREIGN KEY (creator_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    author_id INT,
    channel_id INT,
    creation_on DATE DEFAULT CURDATE(),
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT,
    followee_id INT,
    created_on DATE DEFAULT CURDATE(),
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followee_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blocker_id INT,
    blocked_id INT,
    created_on DATE DEFAULT CURDATE(),
    FOREIGN KEY (blocker_id) REFERENCES users(id),
    FOREIGN KEY (blocked_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
