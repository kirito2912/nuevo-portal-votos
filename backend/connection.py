import pyodbc


def get_connection():
    """Devuelve una conexión configurada para Azure SQL."""
    connection_string = (
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=electoral-system-2024.database.windows.net;"
        "Database=SISTEMA_ELECTORAL;"
        "Uid=admin_electoral;"
        "Pwd=Eduardo123;"
        "Encrypt=yes;"
        "TrustServerCertificate=no;"
        "Connection Timeout=30;"
    )
    return pyodbc.connect(connection_string)

