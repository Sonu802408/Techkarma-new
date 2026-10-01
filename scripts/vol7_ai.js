const getHandwrittenStyles = require('./styles');

module.exports = function generateAINotesHTML() {
    const primaryColor = '#ec4899'; // Pink/Rose for AI

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Artificial Intelligence (AI) — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Advanced Tech Series • B.Tech CSE</div>
            <h1 class="cover-title">ARTIFICIAL INTELLIGENCE & ML</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                Machine Learning, Neural Networks, Deep Learning, Generative AI & Natural Language Processing
            </p>
        </div>
        <div class="cover-features">
            <div class="cover-feature-item">✓ Supervised & Unsupervised ML</div>
            <div class="cover-feature-item">✓ Neural Networks & Backpropagation</div>
            <div class="cover-feature-item">✓ LLMs & Transformer Architecture</div>
            <div class="cover-feature-item">✓ TensorFlow & PyTorch Essentials</div>
        </div>
        <div class="cover-footer">Designed for University Exams & AI/ML Placements</div>
    </div>

    <h1>CHAPTER 1: INTRODUCTION TO AI & MACHINE LEARNING</h1>
    <div class="concept-card">
        <div class="concept-title">💡 What is Artificial Intelligence?</div>
        <p>AI is the simulation of human intelligence in machines programmed to think, reason, and learn from experience.</p>
        <div class="code-box"># Simple Linear Regression with Scikit-Learn
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression()
model.fit(X, y)
print("Prediction for 5:", model.predict([[5]])) # Output: [10.]</div>
    </div>
</div>
</body>
</html>
    `;
};
