from flask import Blueprint, request, jsonify, render_template
from models.user import User

# Create a Blueprint (Controller) for Authentication routes
auth_bp = Blueprint('auth', __name__)

# 1. The Controller serving the View
@auth_bp.route('/')
def index():
    return render_template('index.html')

# 2. The Controller handling the Login Logic
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Controller communicates with the Model
    user = User(email, password)
    
    # Model returns the result to the Controller
    if user.authenticate():
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password."}), 401
