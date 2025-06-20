FROM node:18

# Install system dependencies for Playwright
RUN apt-get update && \
    apt-get install -y wget gnupg libnss3 libatk-bridge2.0-0 libxss1 \
    libasound2 libxcomposite1 libxdamage1 libxrandr2 libgtk-3-0 \
    libgbm-dev libx11-xcb1 libxshmfence1 libxrender1 libxext6 \
    libxfixes3 libnss3 libglib2.0-0 libdrm2 && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install node dependencies
RUN npm install

# Install Playwright and browsers (optional: only Chromium)
RUN npx playwright install chromium

# Copy app source
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
