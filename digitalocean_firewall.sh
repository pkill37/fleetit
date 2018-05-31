#! /bin/bash

if [ $# -eq 0 ]; then
    echo "Error: Pass -m flag for manager or -w for worker"
    exit 1
fi

while getopts ":mw" opt; do
    case $opt in
        m)
            echo "Opening ports for manager swarm node..."
            ufw allow 22/tcp
            ufw allow 2376/tcp
            ufw allow 2377/tcp
            ufw allow 7946/tcp
            ufw allow 7946/udp
            ufw allow 4789/udp
            ;;
        w)
            echo "Opening ports for worker swarm node..."
            ufw allow 22/tcp
            ufw allow 2376/tcp
            ufw allow 7946/tcp
            ufw allow 7946/udp
            ufw allow 4789/udp
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done

# Global
ufw allow 80/tcp
ufw allow 8080/tcp
ufw allow 5601/tcp
ufw allow 9999/tcp
ufw allow 8082/tcp
ufw allow 9200/tcp

# Reload
ufw reload
ufw enable
