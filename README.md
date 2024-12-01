# EHT - Eye Health Training Web Application

## Description
EHT (Eye Health Training) is a web application designed to help users improve their eye health and memory. The application offers various mini-games that help users perform exercises for their eyes and memory, including different difficulty levels. 

The web application is built using the Django framework and consists of multiple Django apps, such as **EyeHealth** and **users**.

## Features
### Eye Health Mini-Games:
1. **Warm-up**:
   - A moving dot describes various geometric shapes on the screen. Users are required to track the dot's movement, and there are three difficulty levels that affect the warm-up duration.
   
2. **Observation**:
   - A series of reaction-speed tests with animations where users have to click on a geometric figure when it turns green. There are three sub-modes:
     - **Ping-Pong**: A hollow ball bounces on the screen and lights up green intermittently.
     - **Blinking**: A ball moves randomly, flashing green at intervals.
     - **Falling Blocks**: Several blocks move across the screen, flashing green randomly.
   
3. **Memory**:
   - Users are shown a grid of geometric shapes for a limited time and are then asked questions about the shapes. The game calculates correct answers and gives a grade based on the user's performance.

### User Management:
- Users can register, log in, and update their profiles.
- Password change functionality is also available.
- Email-based password reset is supported.

## Architecture
The application follows the Django framework's architecture, with several Django apps:

- **EyeHealth**: Contains the core functionality for eye health games, including views, models, and services.
- **users**: Manages user authentication, including registration, login, profile management, and password resets.

### Core Components:
- **models.py**: Defines the database schema for users, games, and game results.
- **services.py**: Contains logic for managing game flow, handling user data, and generating results.
- **views.py**: Manages requests and responses for each feature of the application, including starting exercises, displaying tasks, and showing results.

### Static and Media Files:
- Static files for styles, scripts, and images are stored under the `static/` folder.
- Media files such as user-uploaded images and background images are stored under `media/`.

## Installation

### Prerequisites
1. Python 3.8 or higher.
2. PostgreSQL database.
3. Django 4.2.6.

### Steps:
1. Clone the repository
2. Install dependencies: pip install -r requirements.txt
3. Set up the PostgreSQL database: Create a PostgreSQL database and user, then update the database settings in settings.py.
4. Apply database migrations: python manage.py migrate
5. Create a superuser for the Django admin panel: python manage.py createsuperuser
6. Run the development server: python manage.py runserver
7. Visit the application in your browser at http://127.0.0.1:8000.

## Directory Structure
- EHT/
  - EyeHealth/                # Core application for health games
    - migrations/             # Database migrations
    - templates/              # HTML templates
    - static/                 # Static files (CSS, JS, images)
    - services.py             # Core business logic and game management
    - models.py               # Database models
    - views.py                # Views handling user requests
  
  - users/                    # User management app
    - migrations/             # Database migrations
    - templates/              # Templates for login, registration, etc.
    - forms.py                # Forms for user management (login, registration, password change)
    - models.py               # User-related models
    - views.py                # Views for user management
  
  - static/                   # Static files for frontend (styles, JS, etc.)
  - media/                    # User-uploaded media (images, etc.)
  - db.sqlite3                # SQLite database (if used in development)
  - manage.py                 # Django management script
  - requirements.txt          # Project dependencies
  - settings.py               # Django settings

## Configuration
- Database: The project is configured to use PostgreSQL for production. In the development environment, SQLite can be used by default.
- Email Setup: The project uses SMTP for sending emails. The EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, and EMAIL_HOST_PASSWORD settings need to be configured for sending email notifications (e.g., for password resets).
## Usage
- After logging in, users can select a warm-up type (e.g., Warm-up, Observation, Memory) and difficulty level.
- The results of each warm-up are stored and can be reviewed on the Results page.
- Users can change their passwords and update their profile information at any time.


Developed by Escapist_1871
