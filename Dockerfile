FROM node:16
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN apt update -y && apt upgrade -y
RUN userdel -f node
RUN if getent group node ; then groupdel node; fi
RUN groupadd -g ${GROUP_ID} node
RUN useradd -l -u ${USER_ID} -g node node
RUN install -d -m 0775 -o node -g node /home/node
USER node
