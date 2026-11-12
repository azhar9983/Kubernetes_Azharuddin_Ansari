import json
from pathlib import Path

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS to allow the Node.js frontend to securely send data to this backend
CORS(app)
DATA_FILE = Path(__file__).with_name('data.json')


def load_data():
    try:
        with DATA_FILE.open('r', encoding='utf-8') as file:
            data = json.load(file)
        return data if isinstance(data, list) else []
    except (FileNotFoundError, json.JSONDecodeError):
        return []

@app.route('/')
def index():
    return "Flask backend is running!"

@app.route('/api/submit', methods=['POST'])
def handle_submit():
    # Extract data sent via JSON from the frontend
    data = request.get_json()
    
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400
        
    username = data.get('username')
    email = data.get('email')

    received_data = {
        "username": username,
        "email": email
    }
    stored_data = load_data()
    stored_data.append(received_data)
    with DATA_FILE.open('w', encoding='utf-8') as file:
        json.dump(stored_data, file, indent=2)
    
    # Process your data here (simulating processing)
    processed_message = f"Hello {username}! Your email ({email}) was successfully processed by the Flask backend."
    
    # Send a JSON response back to the client
    return jsonify({
        "status": "success",
        "message": processed_message,
        "received_data": received_data
    }), 200


@app.route('/view_data', methods=['GET'])
def view_data():
    return jsonify(load_data())



if __name__ == '__main__':
    # Runs the Flask server on port 5000
    app.run(host='0.0.0.0', port=5000)
