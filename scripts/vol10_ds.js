const getHandwrittenStyles = require('./styles');

module.exports = function generateDSNotesHTML() {
    const primaryColor = '#8b5cf6'; // Violet for Data Science

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Science — Complete Handwritten Notes</title>
    <style>
        ${getHandwrittenStyles(primaryColor)}
    </style>
</head>
<body>
<div class="notebook-container">
    <div class="cover-page">
        <div>
            <div class="cover-title-badge">Advanced Tech Series • B.Tech CSE</div>
            <h1 class="cover-title">DATA SCIENCE & ANALYTICS</h1>
            <div class="cover-subtitle">Complete Professional Handwritten Notes</div>
            <p style="font-family: 'Kalam', cursive; font-size: 16px; color: #475569; max-width: 480px; margin: 0 auto;">
                Data Wrangling, Pandas, NumPy, Statistical Modeling, Data Visualization & Big Data Pipelines
            </p>
        </div>
        <div class="cover-features">
            <div class="cover-feature-item">✓ Exploratory Data Analysis (EDA)</div>
            <div class="cover-feature-item">✓ NumPy & Pandas DataFrames</div>
            <div class="cover-feature-item">✓ Matplotlib & Seaborn Visualization</div>
            <div class="cover-feature-item">✓ Statistical Inference & Hypothesis Testing</div>
        </div>
        <div class="cover-footer">Designed for Data Analyst & Data Scientist Roles</div>
    </div>

    <h1>CHAPTER 1: DATA PIPELINES & CLEANING</h1>
    <div class="concept-card">
        <div class="concept-title">💡 Pandas Data Wrangling</div>
        <div class="code-box">import pandas as pd
import numpy as np

# Load dataset and clean missing values
df = pd.read_csv('dataset.csv')
df.fillna(df.mean(), inplace=True)
print(df.describe())</div>
    </div>
</div>
</body>
</html>
    `;
};
