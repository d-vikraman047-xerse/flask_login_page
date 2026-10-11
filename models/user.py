class User:
    def __init__(self, email, password):
        self.email = email
        self.password = password

    def authenticate(self):
        """
        The Model handles data validation and database interaction.
        For this demo, we use a mocked database check.
        """
        mock_db_email = "test@example.com"
        mock_db_password = "password123"

        if self.email == mock_db_email and self.password == mock_db_password:
            return True
        return False
