from flask import Flask
from controllers.auth_controller import auth_bp

# Initialize the Flask App
app = Flask(__name__)

# Register the Controller (Blueprint) to the main app
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    print("Starting MVC Flask App on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
