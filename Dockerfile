# Docker takes each of these steps as a layer to run step by step.
# Each step Docker will cache. So you don't have to run it later if re-building the file.
# That's why we divde the steps carefully.

# Always start with an image you want to start with.
FROM node:15

# Set the working directory where you want to copy over files.
# In this video the instructor knows it /app. Make sure you know this for future docker files as well.
WORKDIR /app

# Copy your package.json file into the work dir (either type  . or /app)
COPY package.json .

# Install all the npm packages now in the container.
RUN npm install

# Copy all the rest of the data into the work directory.
COPY . ./

# Telling what port container (nodejs) should be exposed on.
EXPOSE 3000

# At runtime run these commands.
CMD ["node", "index.js"]

#To run this file in command line type: docker build .