FROM eris/decerver:latest
MAINTAINER Eris Industries <support@erisindustries.com>

USER root

COPY . /home/$user/.eris/source
RUN chown --recursive $user /home/$user

USER $user

VOLUME /home/$user/.eris
CMD /home/$user/.eris/source/cmd.sh
