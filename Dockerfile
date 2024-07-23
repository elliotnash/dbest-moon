FROM node:latest

WORKDIR /app

# Install moon cli
RUN npm install -g @moonrepo/cli

COPY . .

RUN rm -rf apps/api/drizzle

RUN ls

EXPOSE 3000 8080

CMD ["moon", ":dev"]
