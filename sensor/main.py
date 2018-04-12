import googlemaps
import math
import random
import time
from datetime import datetime, timedelta
from random import randint
from shapely.geometry import LineString
import json
#from kafka import KafkaProducer
import os
import functools



def run_steps(directions_result):
    gps_route_key_points = []

    start_location = directions_result[0]["legs"][0]["start_location"]

    # in seconds
    duration = directions_result[0]["legs"][0]["duration"]["value"]

    steps = directions_result[0]["legs"][0]["steps"]

    gps_route_key_points.append((start_location["lat"],start_location["lng"]))

    for step in steps:
        gps_route_key_points.append((step["end_location"]["lat"], step["end_location"]["lng"]))

    return duration, gps_route_key_points

#generates seq of random numbers such that sum is n
def random_sum_to(n):
   a, m, c = [], randint(5, 10), n   
   while n > m > 0:
      a.append(m)
      n -= m
      m = randint(5, 10) if n > 10 else n
   if n: a += [n]
   return a


if __name__ == "__main__":
    
    gmaps = googlemaps.Client(key='AIzaSyDvvzzLQDXxwl4wtI6P94lEChNnKz4Af9U')


    ref_lat = 40.714224
    ref_lon = -73.961452


    route_range = 2
    max_num_runs = 50;


    # create 50 random coord
    # max input length of nearest roads
    random_coords  = [(ref_lat + random.random()*route_range,
                        ref_lon + random.random()*route_range) for i in range(max_num_runs*2)]

    adj_coords =  random_coords#gmaps.neares_roads(random_coords)

    raw_runs = zip(adj_coords[0:max_num_runs], adj_coords[max_num_runs:])

    #for each run
    for run in list(raw_runs): 

        directions_result = gmaps.directions(run[0],run[1],mode="bicycling")
        # if points couldn't be snapped
        if not directions_result:
            continue

        duration, gps_route_key_points = run_steps(directions_result)

        if len(gps_route_key_points) > 100:
            continue

        line = LineString(gps_route_key_points)

        initial_datetime = datetime.now();


        curr_time = initial_datetime
        curr_co2 = randint(400,500)
        curr_temperature = randint(10,25)
        curr_heart_rate = randint(70,90)


        sampling_times = random_sum_to(duration)
        #cumsum of sampling times
        cum_samp_times = functools.reduce(lambda c, x: c + [c[-1]+x],sampling_times[1:],[sampling_times[0]])


        curr_bike = randint(0,10**4)

        steps = []
        for i in range(len(cum_samp_times)):

            step = {}

            step["bike_id"] = curr_bike

            curr_time = initial_datetime + timedelta(0,cum_samp_times[i])
            step["timestamp"] = curr_time.isoformat()

            curr_point = line.interpolate(line.length/duration*cum_samp_times[i])

            # highly inefficient, could do this at the end for various points at the same time
            gps_points_dict = gmaps.snap_to_roads((curr_point.x,curr_point.y))
            gps_points_list = [ (item["location"]["latitude"], item["location"]["longitude"]) for item in gps_points_dict ]
            
            
            if i == 0:
                origin = gps_points_list[0]
                speed = 0;

            distance = gmaps.distance_matrix(origins=origin,destinations=gps_points_list[0],mode="bicycling",units="metric")
            origin = gps_points_list[0]


            if distance:
                speed = distance["rows"][0]["elements"][0]["distance"]["value"]/sampling_times[i]

            step["speed"] = speed
            
            # sometimes it's just not possible 
            if not gps_points_list:
                continue

            step["lat"] = gps_points_list[0][0]
            step["lng"] = gps_points_list[0][1]  

            curr_co2 += randint(0,10) - 5
            step["co2"] = curr_co2

            curr_temperature = (40 > curr_temperature > -10)* (curr_temperature+ randint(0,24)-((curr_time.hour - 12)**2)**(1/2)/1000)+\
                                    (curr_temperature > 40)*40 +  (curr_temperature < -10)*-10

            step["temp"] = curr_temperature
            
            step["heart_rate"] =  (curr_heart_rate < 60)*60 + (curr_heart_rate > 100)*100 + \
                                    (100 > curr_heart_rate > 60)*(curr_heart_rate + randint(0,5)-2);
            
            steps.append(step)

            # Send it off to the broker
            print(step)
            producer = KafkaProducer(bootstrap_servers=os.environ['KAFKA_CLUSTER'], value_serializer=lambda v: json.dumps(v).encode('utf-8'))
            producer.send('test', step)
            time.sleep(sampling_times[i])





