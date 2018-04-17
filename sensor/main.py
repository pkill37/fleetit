import googlemaps
import math
import random
import time
from datetime import datetime, timedelta
from random import randint
from shapely.geometry import LineString
import json
from kafka import KafkaProducer
import os
import functools
from geopy import distance
from tenacity import retry


def run_steps(directions_result):
    gps_route_key_points = []

    start_location = directions_result[0]['legs'][0]['start_location']

    # in seconds
    duration = directions_result[0]['legs'][0]['duration']['value']

    steps = directions_result[0]['legs'][0]['steps']

    gps_route_key_points.append((start_location['lat'],start_location['lng']))

    for step in steps:
        gps_route_key_points.append((step['end_location']['lat'], step['end_location']['lng']))

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

def retry(fun,keys,current_key):
    for attempt in range(100):
        try:
          return fun()
        except:
            current_key = (current_key+1) % len(keys)
            gmaps = googlemaps.Client(key=keys[current_key])
        else:
          break
    else:
        raise Exception

if __name__ == '__main__':
    keys = [
        'AIzaSyAN-mH1CrjLy3MWN7L1HFKoonnTwdBREhk',
        'AIzaSyAc341aCRT8ZPH57Y9y_Tpjiu0CzStPEQU',
        'AIzaSyBjxit6qbs3cGgWInutRfXFPD1wxU9lkTs',
        'AIzaSyDzFr5yLuA2p7APr2JTGHTYPm35x5pVT8I',
        'AIzaSyDvvzzLQDXxwl4wtI6P94lEChNnKz4Af9U',
        'AIzaSyDbjP1Zbd8p6fVEpLbVbccg7IEMg8eBeUk',
        'AIzaSyBYCanqeNcu4toOW8M7FHrfdydn1XJIkio',
        'AIzaSyBCh5v8Jl_UTvcgevn_ErqTKVqLR4HqDm8'
    ]
    current_key = 0
    gmaps = googlemaps.Client(key=keys[current_key])
    producer = KafkaProducer(bootstrap_servers=os.environ['KAFKA_CLUSTER'], value_serializer=lambda v: json.dumps(v).encode('utf-8'))


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

    curr_bike = randint(0,10**4)

    #for each run
    for run in list(raw_runs):

        directions_result = retry(lambda : gmaps.directions(run[0],run[1],mode='bicycling'),keys,current_key)
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



        steps = []
        for i in range(len(cum_samp_times)):
            step = {}

            step['bike_id'] = curr_bike

            curr_time = initial_datetime + timedelta(0,cum_samp_times[i])
            step['timestamp'] = curr_time.isoformat()

            curr_point = line.interpolate(line.length/duration*cum_samp_times[i])

            step['lat'] = curr_point.x
            step['lng'] = curr_point.y

            curr_co2 += randint(0,10) - 5
            step['co2'] = curr_co2

            curr_temperature = (40 > curr_temperature > -10)* (curr_temperature+ (randint(0,24)-((curr_time.hour - 12)**2)**(1/2))/1000) +\
                                    (curr_temperature > 40)*40 +  (curr_temperature < -10)*-10

            step['temp'] = curr_temperature

            step['heart_rate'] =  (curr_heart_rate < 60)*60 + (curr_heart_rate > 100)*100 + \
                                    (100 > curr_heart_rate > 60)*(curr_heart_rate + randint(0,5)-2);

            steps.append(step)


        calls_needed = len(steps)//50 + (len(steps)%50 > 0)

        #snap to roads and calculate speed
        for i in range(calls_needed):
            start = i*50
            end = 50*(i+1) if i != calls_needed-1 else (calls_needed-1)*50 + len(steps) % 50

            gps_points_dict =retry(lambda : gmaps.snap_to_roads([(step['lat'], step['lng']) for step in steps[start:end]]),keys,current_key)


            gps_points_list = [ (item['location']['latitude'], item['location']['longitude']) for item in gps_points_dict ]


            for j in range(len(gps_points_list)):
                #if it could snap point
                steps[start+j]['lat'] = gps_points_list[j][0]
                steps[start+j]['lng'] = gps_points_list[j][1]


        origins = [(step['lat'], step['lng']) for step in steps[:-1]]
        destinations = [(step['lat'], step['lng']) for step in steps[1:]]

        #calculate distance
        dist = [0]
        for i in range(len(origins)):
            dist += [ distance.vincenty(origins[i],destinations[i]).m ]

        # calculate speed and send to kafka
        for i in range(len(steps)):
            steps[i]['speed'] = dist[i]/sampling_times[i]
            print(steps[i])
            producer.send('updates', steps[i])
            time.sleep(sampling_times[i])

