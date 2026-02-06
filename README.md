# Financial Health Backend

A FastAPI-based backend for the Financial Health Tool. Provides user management, financial data ingestion and processing, and JSON APIs for frontend consumption.

## Features
- REST API endpoints for users and financials
- Database integration (PostgreSQL)
- Modular routers and data processing utilities
- Designed for local development and production deployment

## Tech stack
- Python 3.9+
- FastAPI
- SQLAlchemy (or the project's ORM layer)
- PostgreSQL
- Uvicorn (ASGI server)

## Repository layout
- [app/main.py](app/main.py) - application entrypoint
- [app/database.py](app/database.py) - database session/config
- [app/models.py](app/models.py) - ORM models
- [app/schemas.py](app/schemas.py) - Pydantic schemas
- [app/crud.py](app/crud.py) - CRUD helpers
- [app/routers/financials.py](app/routers/financials.py) - financial endpoints
- [app/routers/users.py](app/routers/users.py) - user endpoints
- [app/utils/data_processor.py](app/utils/data_processor.py) - data processing helpers
- [.env](.env) - environment variables (not checked into VCS)
- [requirements.txt](requirements.txt) - Python dependencies

## Environment variables
Create a `.env` file in the project root (do not commit secrets). The app expects at minimum:
- `DATABASE_URL` — PostgreSQL connection string
- `SECRET_KEY` — application secret
- `OPENAI_API_KEY` — optional (if the project integrates with OpenAI)

Example (do not copy secrets into VCS):
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/financial_health
SECRET_KEY=<your-secret>
OPENAI_API_KEY=<optional-key>
```

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Prepare the database:
```bash
## Example using psql
createdb financial_health
##Or create a database as needed and set DATABASE_URL accordingly
```

3. Populate .env with the correct values (see .env).
4. Run the app with Uvicorn:
```bash
uvicorn app.main:app --reload
```

- The API will be available at http://127.0.0.1:8000 and automatic docs at:

- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc

## Common commands
- Install deps: pip install -r requirements.txt
- Start server: uvicorn app.main:app --reload
- Run migrations: (if using Alembic) configure and run Alembic against app/database.py

## Development notes
- Keep secrets out of source control and rotate keys periodically.
- Implement tests for critical business logic in app/utils/data_processor.py and CRUD operations in app/crud.py.
- Modular routers are defined in app/routers/ — add new endpoint groups there.

## Troubleshooting
- Database connection errors: verify DATABASE_URL and that PostgreSQL is running.
- Dependency issues: recreate virtual environment and reinstall from requirements.txt.

# Financial Health Frontend

A modern React-based web application for analyzing and managing personal financial health. This frontend application provides users with tools to upload financial data, register accounts, and visualize financial metrics through an interactive dashboard.

## Features

- **User Registration**: Secure user account creation and authentication
- **Financial Data Upload**: Upload and process financial documents and data
- **Analysis Dashboard**: Interactive visual analytics for financial health metrics
- **Real-time Insights**: Comprehensive financial analysis and reporting

## Tech Stack

- **React** 18.2.0 - UI library
- **React Router DOM** 6.30.3 - Client-side routing
- **Recharts** 2.15.4 - Data visualization
- **Axios** 1.13.4 - HTTP client
- **CSS3** - Styling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-health-frontend
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables by creating a .env file in the root directory:
```bash
REACT_APP_API_URL=<your-api-endpoint>
```
### Development
Start the development server:
```bash
npm start
```
### Build
Create an optimized production build:
```bash
npm run build
```
- Output will be generated in the build/ directory.

### Project Structure
```
src/
├── components/           # Reusable React components
│   ├── AnalysisDashboard.js
│   ├── UploadForm.js
│   └── UserRegister.js
├── pages/               # Page components
│   ├── Home.js
│   └── FinancialPage.js
├── App.js              # Main application component
├── index.js            # Application entry point
├── index.css           # Global styles
└── reportWebVitals.js  # Performance monitoring
```

### Available Scripts
npm start - Run development server
npm build - Create production build
npm test - Execute test suite
npm eject - Eject from Create React App (irreversible)

### Browser Support
Works on all modern browsers as specified in browserslist:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
