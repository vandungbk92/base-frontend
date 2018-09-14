FROM stefanscherer/node-windows:latest

ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

# RUN npm install -g yarn

RUN npm install

# Build for production.
RUN npm run build

#Copy firebase sw
COPY ./firebase-sw/firebase-messaging-sw.js ./dist

# Install `serve` to run the application.
RUN npm install -g serve@6.5.2

# Set the command to start the node server.
CMD serve -s dist

# Tell Docker about the port we'll run on.
EXPOSE 5000