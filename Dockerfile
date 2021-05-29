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
# This is necessary despite using Bind Mount, since BM is just for development purspose --save-d
COPY . ./

# Telling what port container (nodejs) should be exposed on.
EXPOSE 3000

# At runtime run these commands.
CMD ["npm", "run", "dev"]

#To run this file in command line type: docker build -t node-app-image .
# Then run container with: docker run -d -p 3000:3000 --name node-app node-app-image 
# -p 3000:300 explaination: 3000 (coming outside) : 3000 (container listeneing port)
# In order to enter terminal of container: docker exec -it node-app bash

# Container overview:
# Dockerfile is there to create an image, but we don't acutally need it in our container.
# This happened when we ran layer -> Copy . ./ , same with node_modules and more.  
# This can be a waste of time. We can fix it by adding a ".dockerignore" file.

# In any changes are made in this file. The image has to be updated and the container needs to be remade.
# It will not update automatically in docker. 

# Bind mount
# Take folders location and map to containers location.
# Will automatically sync the container when changes are made.
# Bind mount your current folder with the container folder:  -v $(pwd):/app
# To make the container read only (no two way changes) add: -v $(pwd):/app:ro
# Make sure you ignore node_modules in contaienr: -v /app/node_modules  
# docker run -d -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 --name node-app node-app-image 