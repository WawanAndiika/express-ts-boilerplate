# express-ts-boilerplate

## How to Run the Application Using Docker Compose

Follow these steps to run the application:

1. **Copy the Environment File**  
   Copy the `.env.dev` file to `.env`:
   ```bash
   cp .env.dev .env
   ```

2. **Run Docker Compose**  
   Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**  
   Once the containers are running, you can access the application at:
   ```
   http://localhost:3000
   ```
   Swagger documentation is available at:
   ```
   http://localhost:3000/api-docs/
   ```

4. **Stop the Application**  
   To stop the application, run:
   ```bash
   docker-compose down
   ```
   If you want to stop the application and clear the database, run:
   ```bash
   docker-compose down -v
   ```

## Services

- **PostgreSQL**: Runs on port `5432`.
- **Express App**: Runs on port `3000`.

## Notes

- Ensure Docker and Docker Compose are installed on your system.
- The `DATABASE_URL` in the `.env` file should match the configuration in the `docker-compose.yml` file.