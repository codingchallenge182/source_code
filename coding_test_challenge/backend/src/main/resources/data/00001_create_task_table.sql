CREATE TABLE task (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(255),
                      description TEXT,
                      status TEXT,
                      due_date DATE
);

