-- Tabela de domínios
CREATE TABLE domains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de roles (níveis de acesso)
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de áreas (vinculadas a domínio)
CREATE TABLE areas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  domain_id INT NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);

-- Tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  domain_id INT NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);

-- Relacionamento muitos-para-muitos entre usuários e áreas
CREATE TABLE user_areas (
  id int not null primary key auto_increment,
  user_id INT NOT NULL,
  area_id INT NOT NULL,
  PRIMARY KEY (user_id, area_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE
);

-- Promoções de usuários (responsável por áreas ou admin do sistema)
CREATE TABLE promotions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  user_area_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_area_id) REFERENCES user_areas(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
