CREATE TABLE offer (
    id UUID PRIMARY KEY,
    description VARCHAR(255),
    discount_amount DOUBLE,
    is_percentage BOOLEAN
);

CREATE TABLE product (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(512),
    wish_listed BOOLEAN,
    offer_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_offer FOREIGN KEY (offer_id) REFERENCES offer(id)
);
