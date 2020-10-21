FROM ubuntu:18.04

# Definition of a Device & Service
ENV POSITION=UI \
    SERVICE=ui-frontend-for-maintenance \
    USER=aion \
    PASSWORD=aion \
    DEBIAN_FRONTEND=noninteractive

# Install Dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    gnupg \
    tzdata \
    apt-transport-https

ENV NODE_VERSION=8.x
RUN set -xe; \
    # Node.js repo
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -; \
    echo "deb https://deb.nodesource.com/node_${NODE_VERSION} jessie main" | tee /etc/apt/sources.list.d/nodesource.list; \
    echo "deb-src https://deb.nodesource.com/node_${NODE_VERSION} jessie main" | tee -a /etc/apt/sources.list.d/nodesource.list; \
    # yarn repo
    curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -; \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list; \
    apt-get update >/dev/null; \
    apt-get -y --no-install-recommends install >/dev/null \
        nodejs \
        yarn \
    ;\
    apt-get clean; rm -rf /var/lib/apt/lists/*;

# Setup Directories
RUN mkdir /var/lib/aion
WORKDIR /var/lib/aion
RUN mkdir -p \
    ./var/lib/aion/$POSITION/$SERVICE

WORKDIR /var/lib/aion/$POSITION/$SERVICE
EXPOSE 4000
RUN apt update && apt -y install vim
ADD . . 

RUN mv .env.production .env

# Setup User
RUN useradd -m ${USER} \
 && gpasswd -a ${USER} sudo \
 && echo "${USER}:${PASSWORD}" | chpasswd
    
RUN yarn
CMD ["yarn", "start"]

