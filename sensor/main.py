from kafka import KafkaProducer
import json
import dateutil.parser
import time
import datetime
import random
import os

producer = KafkaProducer(bootstrap_servers=os.environ['KAFKA_CLUSTER'], value_serializer=lambda v: json.dumps(v).encode('utf-8'))

all_runs = []
with open("runs.json", "r") as f:
    for line in f:
        runs = json.loads(line)
        if runs:
            for run in runs:
                all_runs.append(run)


while True:
    #actual run to send to sensor
    #difference between now and sensor timestamp
    run = all_runs[random.randint(0,len(all_runs)-1)]
    timestamp_delta = datetime.datetime.now() - dateutil.parser.parse(run[0]["timestamp"])

    sampling_times = [(dateutil.parser.parse(run[step_idx+1]["timestamp"]) - dateutil.parser.parse(run[step_idx]["timestamp"])).seconds for step_idx in range(len(run)-1)]
    sampling_times.append(0)
    for i in range(len(run)):
        #update timestamp
        run[i]["timestamp"] = (dateutil.parser.parse(run[i]["timestamp"]) + timestamp_delta).strftime("%Y-%m-%d %H:%M:%S")

        producer.send('updates', run[i])
        time.sleep(sampling_times[i])

