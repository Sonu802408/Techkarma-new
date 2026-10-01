const getHandwrittenStyles = require('./styles');

module.exports = function generateCloudNotesHTML() {
    const primaryColor = '#06b6d4'; // Cyan for Cloud

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cloud Computing — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Advanced Tech Series • B.Tech CSE</div>
            <h1 class="cover-title">CLOUD COMPUTING & DEVOPS</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                AWS, Azure, Docker Containerization, Kubernetes Orchestration & Serverless Microservices
            </p>
        </div>
        <div class="cover-features">
            <div class="cover-feature-item">✓ IaaS, PaaS & SaaS Architecture</div>
            <div class="cover-feature-item">✓ AWS EC2, S3, Lambda & IAM</div>
            <div class="cover-feature-item">✓ Docker Containers & Images</div>
            <div class="cover-feature-item">✓ Kubernetes Pods & Deployments</div>
        </div>
        <div class="cover-footer">Designed for Cloud Certifications & DevOps Roles</div>
    </div>

    <h1>CHAPTER 1: CLOUD ARCHITECTURE & SERVICES</h1>
    <div class="concept-card">
        <div class="concept-title">💡 IaaS vs PaaS vs SaaS</div>
        <p>Cloud computing delivers computing services—including servers, storage, databases, networking, and software—over the Internet.</p>
        <div class="code-box"># Basic Dockerfile Example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</div>
    </div>
</div>
</body>
</html>
    `;
};
