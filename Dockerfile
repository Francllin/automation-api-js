FROM cypress/browsers:node14.16.0-chrome89-ff86

WORKDIR /automation-api-js/
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN echo "whoami: $(whoami)"
RUN npm config -g set user $(whoami)

RUN id

RUN apt-get update --allow-releaseinfo-change

RUN apt-get update -qqy \
  && apt-get -qqy --no-install-recommends install \
    bzip2 \
    default-jre \
    sudo \
    libgconf-2-4 \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

ENV npm_config_loglevel warn

ENV npm_config_unsafe_perm true

COPY . /automation-api-js/

RUN npm ci && npx cypress