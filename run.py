import http.server
import socketserver
import webbrowser
import threading
import os
import time

PORT = 8000
# Ensure we serve files from the directory where this script is located
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    # Allow port reuse to avoid "Address already in use" errors
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server started at http://localhost:{PORT}")
        httpd.serve_forever()

if __name__ == '__main__':
    print("Starting local server...")
    
    # Run the server in a separate background thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Wait a tiny bit to ensure the server is up
    time.sleep(1)
    
    # Automatically open the default web browser to the page
    print("Opening browser...")
    webbrowser.open(f'http://localhost:{PORT}/index.html')
    
    # Keep the script running so the server doesn't shut down
    try:
        print("Press Ctrl+C to stop the server.")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down server...")
