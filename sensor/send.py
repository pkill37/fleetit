import kafka
import json
import dateutil.parser
import time
import datetime

producer = KafkaProducer(bootstrap_servers=os.environ['KAFKA_CLUSTER'], value_serializer=lambda v: json.dumps(v).encode('utf-8'))

with open("saved_runs", "r") as f:
	# line will have up to 50 runs max
	for line in f:
		runs = json.loads(line)

		#actual run to send to sensor
		#difference between now and sensor timestamp
		for run in runs:
			timestamp_delta = datetime.datetime.now() - dateutil.parser.parse(run[0]["timestamp"])

			sampling_times = [(dateutil.parser.parse(run[step_idx+1]["timestamp"]) - dateutil.parser.parse(run[step_idx]["timestamp"])).seconds for step_idx in range(len(run)-1)]
			sampling_times.append(0)
			for i in range(len(run)):
				# update timestamp
				run[i]["timestamp"] = (dateutil.parser.parse(run[i]["timestamp"]) + timestamp_delta).isoformat()           	
				
				producer.send('updates', run[i])
				time.sleep(sampling_times[i])
			
