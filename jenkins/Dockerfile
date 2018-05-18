FROM jenkins/jenkins

USER root

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

RUN apt-get update && apt-get install -y docker-ce

RUN usermod -aG docker,staff jenkins

USER jenkins

RUN install-plugins.sh \
    blueocean \
    docker-workflow \
    locale \
    workflow-aggregator \
    pipeline-stage-view \
    git \
    cloudbees-bitbucket-branch-source \
    github-organization-folder
