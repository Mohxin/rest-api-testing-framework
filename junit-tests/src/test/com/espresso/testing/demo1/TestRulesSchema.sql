
CREATE TABLE employee (
  employee_id bigint AUTO_INCREMENT PRIMARY KEY,
  login varchar(30) UNIQUE
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;


CREATE TABLE customer (
  name varchar(30) PRIMARY KEY,
  balance decimal(19,4),
  credit_limit decimal(19,4) NOT NULL
)
ENGINE=InnoDB DEFAULT CHARSET=latin1
;


CREATE TABLE product (
  product_number bigint AUTO_INCREMENT PRIMARY KEY,
  name varchar(50),
  price decimal(19,4) NOT NULL
)
ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT = 1000
;


CREATE TABLE purchaseorder (
  order_number bigint AUTO_INCREMENT PRIMARY KEY,
  amount_total decimal(19,4),
  paid boolean NOT NULL DEFAULT false,
  item_count int(11) DEFAULT NULL,
  notes varchar(1000),
  customer_name varchar(30) NOT NULL,
  salesrep_id bigint,
  CONSTRAINT customer FOREIGN KEY (customer_name) REFERENCES customer (name) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT salesrep FOREIGN KEY (salesrep_id) REFERENCES employee (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT = 1000
;


CREATE TABLE lineitem (
  lineitem_id bigint AUTO_INCREMENT PRIMARY KEY,
  product_number bigint NOT NULL,
  order_number bigint NOT NULL,
  qty_ordered int NOT NULL,
  product_price decimal(19,4),
  amount decimal(19,4),
  CONSTRAINT product FOREIGN KEY (product_number) REFERENCES product (product_number) ON UPDATE CASCADE,
  CONSTRAINT lineitem_purchaseorder FOREIGN KEY (order_number) REFERENCES purchaseorder (order_number) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT = 1000
;


CREATE TABLE purchaseorder_audit (
  audit_number bigint AUTO_INCREMENT PRIMARY KEY,
  order_number bigint,
  amount_total decimal(19,4),
  paid boolean,
  item_count int(11) DEFAULT NULL,
  notes varchar(1000),
  customer_name varchar(30) NOT NULL,
  CONSTRAINT purchaseorder_audit FOREIGN KEY (order_number) REFERENCES purchaseorder (order_number) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT = 1000
;
