FROM node
WORKDIR /backend
COPY . .
RUN rm -r node_modules
RUN npm install
EXPOSE 5555
ENTRYPOINT ["npm", "start"]