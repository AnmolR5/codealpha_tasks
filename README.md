DevOps Project: Image Gallery with Docker & Jenkins

This project demonstrates a complete DevOps workflow by integrating a responsive Image Gallery Web Application with Docker containerization and Jenkins CI/CD automation.

The system automates the process from code commit → build → container → deployment, showcasing real-world DevOps practices.

Key Features
🌐 Image Gallery Application
Category-based filtering (Nature, Mountains, Wildlife, Urban, Seaside)
Dynamic image loading using JavaScript
Lightbox view with navigation (Next / Previous)
Slideshow functionality
Responsive UI design
⚙️ DevOps Implementation
🔁 CI/CD Pipeline (Jenkins)

The Jenkins pipeline automates:

Fetch latest code from GitHub
Build Docker image
Deploy container automatically
🐳 Docker Containerization

The application is containerized using Docker for consistent deployment.

🔹 Build Image
docker build -t codealpha-tasks .
🔹 Run Container
docker run -d -p 8081:80 --name codealpha-container codealpha-tasks
🔹 Access Application
http://localhost:8081
🔗 GitHub Integration
Source code managed via GitHub
Automatic build trigger using webhook
Continuous deployment on every push
🔄 CI/CD Workflow
GitHub Push
     ↓
Jenkins Pipeline Trigger
     ↓
Docker Image Build
     ↓
Container Deployment
     ↓
Live Application (localhost:8081)

  Testing webhook trigger
