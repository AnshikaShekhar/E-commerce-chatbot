import sqlite3
from faker import Faker

# Initialize the Faker instance
fake = Faker()

# Connect to the database
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Create the products table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        image_url TEXT
    )
''')

# Generate 100 mock product data
products = []
for i in range(1, 101):
    name = fake.word().capitalize() + " " + str(i)  # Example: "Laptop 1"
    category = fake.random.choice(['laptops', 'smartphones', 'tablets', 'headphones', 'accessories'])
    price = round(fake.random_number(digits=2) * 10, 2)  # Random price like 399.99
    description = fake.text(max_nb_chars=100)  # Short description
    image_url = fake.image_url()  # Random image URL
    
    # Append the product data as a tuple
    products.append((i, name, category, price, description, image_url))

# Insert data into the products table
cursor.executemany('''
    INSERT INTO products (id, name, category, price, description, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
''', products)

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database and table created, and 100 mock products inserted successfully.")
