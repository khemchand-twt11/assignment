# User Management API Documentation

This documentation provides details about the User Management API, which allows you to manage user information and perform various operations on user records.

## Technologies Used

- **Database**: Sequelize with MySQL
- **Backend**: Node.js, express
- **Image Storage**: Multer and Cloudinary

## Base URL

The base URL for this API is: `https://quadb-c4k0.onrender.com/`

## Endpoints

| Endpoint | HTTP Method | Description                                       | Authentication Required |
| -------- | ----------- | ------------------------------------------------- | ----------------------- |
| /details | GET         | Fetch details of a specific user by `user_id`.    | No                      |
| /update  | PUT         | Update user details with new data in the request. | Yes                     |
| /image   | GET         | Retrieve a user's image by `user_id`.             | No                      |
| /insert  | POST        | Insert a new user into the database.              | Yes                     |
| /delete  | DELETE      | Delete a user by `user_id`.                       | Yes                     |

## Authentication

To perform operations that require authentication (e.g., update, insert, delete), you need to obtain a valid authentication token. You can obtain this token by using the login route.

#### Admin Credentials

You can use the following admin credentials to log in:

- **Email**: admin@gmail.com
- **Password**: admin

### Login Route

- **Route**: POST /login
- **Request Body**: JSON object containing `user_email` and `user_password`.
- **Returns**: JSON response with an authentication token upon successful login.

## Database Documentation

### Users Table Structure

The Users table has the following structure:

| Field          | Type    | Description                             |
| -------------- | ------- | --------------------------------------- |
| user_id        | UUIDv4  | Randomly generated user identifier.     |
| user_name      | STRING  | User's username (may not be unique).    |
| user_email     | STRING  | User's email address (unique).          |
| user_password  | STRING  | User's password.                        |
| user_image     | STRING  | User's image.                           |
| total_orders   | INTEGER | Total orders placed by the user.        |
| created_at     | DATE    | Timestamp when the user was created.    |
| last_logged_in | DATE    | Timestamp when the user last logged in. |

## Example Usage

Here is an example of how to use the API endpoints:

- Fetch user details: `GET BASE_URL/details/${user_id}`
- Update user details: `PUT BASE_URL/update` (with a valid authentication token)
- Get user image: `GET BASE_URL/image/${user_id}`
- Insert a new user: `POST BASE_URL/insert` (with a valid authentication token)
- Delete a user: `DELETE BASE_URL/delete/${user_id}` (with a valid authentication token)

Feel free to add more details or customize this README to your specific project requirements.
