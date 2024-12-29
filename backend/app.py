import sqlite3
import random
import string
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite Database Setup
def get_db_connection():
    conn = sqlite3.connect('ecommerce.db')
    conn.row_factory = sqlite3.Row  # Allow access by column name
    return conn

# Initialize the products table if it doesn't exist
def initialize_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        image_url TEXT
    )''')
    conn.commit()
    conn.close()

# Function to generate mock product data
def generate_mock_data():
    categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Sports', 'Groceries']
    mock_data = []

    for _ in range(100):  # Generate 100 mock products
        name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))  # Random name
        category = random.choice(categories)  # Random category from the list
        price = round(random.uniform(5.0, 100.0), 2)  # Random price between 5 and 100
        description = "This is a mock product."  # Simple description
        image_url = f"https://via.placeholder.com/150?text={name}"  # Placeholder image URL

        mock_data.append({
            'name': name,
            'category': category,
            'price': price,
            'description': description,
            'image_url': image_url
        })

    return mock_data

# Function to insert mock data into the database
def insert_mock_data():
    conn = get_db_connection()
    cursor = conn.cursor()

    mock_data = generate_mock_data()
    for product in mock_data:
        cursor.execute('''INSERT INTO products (name, category, price, description, image_url)
                          VALUES (?, ?, ?, ?, ?)''',
                       (product['name'], product['category'], product['price'], product['description'], product['image_url']))

    conn.commit()
    conn.close()

# Route to fetch all products from the database
@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products')
    products = cursor.fetchall()

    product_list = []
    for product in products:
        product_list.append({
            'id': product[0],
            'name': product[1],
            'category': product[2],
            'price': product[3],
            'description': product[4],
            'image_url': product[5]
        })
    
    conn.close()
    return jsonify(product_list)

# Check the number of products in the database
@app.route('/check-products', methods=['GET'])
def check_products():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    conn.close()

    return jsonify({"product_count": count})

# Home route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the E-commerce API!"})

# Initialize the database and insert mock data on startup
initialize_db()
insert_mock_data()  # Insert mock data when the app starts

if __name__ == '__main__':
    app.run(debug=True)
