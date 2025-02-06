CREATE TABLE `resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `resource` (id, name, type) VALUES (1, 'Laboratório de Informática', 'SALA');
INSERT INTO `resource` (id, name, type) VALUES (2, 'Bola de Vôlei', 'EQUIPAMENTO');

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (id, name, email, password, type) VALUES (1, 'Leonardo', 'leonardo@gmail.com', '$2a$10$Ot4XGuyPP7r82nN3WXA0bOL1Qk9gShKDlVuPoyp89HoFnHcwO4Tji', 'DISCENTE');
INSERT INTO user (id, name, email, password, type) VALUES (2, 'Fernando', 'fernando@gmail.com', '$2a$10$Ot4XGuyPP7r82nN3WXA0bOL1Qk9gShKDlVuPoyp89HoFnHcwO4Tji', 'DOCENTE');
INSERT INTO user (id, name, email, password, type) VALUES (3, 'Administrador', 'admin@gmail.com', '$2a$10$X607ZPhQ4EgGNaYKt3n4SONjIv9zc.VMWdEuhCuba7oLAL5IvcL5.', 'DOCENTE');

CREATE TABLE `booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NOT NULL,
  `user_id` BIGINT(20) NOT NULL,
  `resource_id` BIGINT(20) NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resource(id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO booking (id, start_date, end_date, user_id, resource_id) VALUES (1, '2024-11-14', '2024-11-15', 2, 1);
INSERT INTO booking (id, start_date, end_date, user_id, resource_id) VALUES (2, '2024-11-15', '2024-11-16', 1, 2);

CREATE TABLE `ticket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `open_date` DATE NOT NULL,
  `problem` varchar(100) NOT NULL,
  `user_id` BIGINT(20) NOT NULL,
  `resource_id` BIGINT(20) NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resource(id),
  FOREIGN KEY (user_id) REFERENCES user(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `system_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `webhook_url` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE permission (
	id BIGINT(20) PRIMARY KEY,
	description VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- user
INSERT INTO permission (id, description) values (1, 'ROLE_REGISTER_USER');
INSERT INTO permission (id, description) values (2, 'ROLE_REMOVE_USER');
INSERT INTO permission (id, description) values (3, 'ROLE_SEARCH_USER');

-- resource
INSERT INTO permission (id, description) values (4, 'ROLE_REGISTER_RESOURCE');
INSERT INTO permission (id, description) values (5, 'ROLE_REMOVE_RESOURCE');
INSERT INTO permission (id, description) values (6, 'ROLE_SEARCH_RESOURCE');

-- booking
INSERT INTO permission (id, description) values (7, 'ROLE_REGISTER_BOOKING');
INSERT INTO permission (id, description) values (8, 'ROLE_REMOVE_BOOKING');
INSERT INTO permission (id, description) values (9, 'ROLE_SEARCH_BOOKING');

-- ticket
INSERT INTO permission (id, description) values (10, 'ROLE_REGISTER_TICKET');
INSERT INTO permission (id, description) values (11, 'ROLE_REMOVE_TICKET');
INSERT INTO permission (id, description) values (12, 'ROLE_SEARCH_TICKET');

-- sytemConfig
INSERT INTO permission (id, description) values (13, 'ROLE_REGISTER_CONFIG');
INSERT INTO permission (id, description) values (14, 'ROLE_REMOVE_CONFIG');
INSERT INTO permission (id, description) values (15, 'ROLE_SEARCH_CONFIG');

CREATE TABLE user_permission (
	user_id BIGINT(20) NOT NULL,
	permission_id BIGINT(20) NOT NULL,
	PRIMARY KEY (user_id, permission_id),
	FOREIGN KEY (user_id) REFERENCES user(id),
	FOREIGN KEY (permission_id) REFERENCES permission(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- admin
INSERT INTO user_permission (user_id, permission_id) values (3, 1);
INSERT INTO user_permission (user_id, permission_id) values (3, 2);
INSERT INTO user_permission (user_id, permission_id) values (3, 3);
INSERT INTO user_permission (user_id, permission_id) values (3, 4);
INSERT INTO user_permission (user_id, permission_id) values (3, 5);
INSERT INTO user_permission (user_id, permission_id) values (3, 6);
INSERT INTO user_permission (user_id, permission_id) values (3, 7);
INSERT INTO user_permission (user_id, permission_id) values (3, 8);
INSERT INTO user_permission (user_id, permission_id) values (3, 9);
INSERT INTO user_permission (user_id, permission_id) values (3, 10);
INSERT INTO user_permission (user_id, permission_id) values (3, 11);
INSERT INTO user_permission (user_id, permission_id) values (3, 12);
INSERT INTO user_permission (user_id, permission_id) values (3, 13);
INSERT INTO user_permission (user_id, permission_id) values (3, 14);
INSERT INTO user_permission (user_id, permission_id) values (3, 15);

-- fernando
INSERT INTO user_permission (user_id, permission_id) values (1, 3);
INSERT INTO user_permission (user_id, permission_id) values (1, 4);
INSERT INTO user_permission (user_id, permission_id) values (1, 6);
INSERT INTO user_permission (user_id, permission_id) values (1, 7);
INSERT INTO user_permission (user_id, permission_id) values (1, 9);
INSERT INTO user_permission (user_id, permission_id) values (1, 10);
INSERT INTO user_permission (user_id, permission_id) values (1, 12);

-- leonardo
INSERT INTO user_permission (user_id, permission_id) values (2, 6);
INSERT INTO user_permission (user_id, permission_id) values (2, 7);
INSERT INTO user_permission (user_id, permission_id) values (2, 9);
INSERT INTO user_permission (user_id, permission_id) values (2, 10);
INSERT INTO user_permission (user_id, permission_id) values (2, 12);
