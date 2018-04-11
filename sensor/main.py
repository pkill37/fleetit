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

def gen_datetime(min_year=2017, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    start = datetime(min_year, 1, 1, 00, 00, 00)
    years = max_year - min_year + 1
    end = start + timedelta(days=365 * years)
    return start + (end - start) * random.random()


if __name__ == "__main__":
    
    gmaps = googlemaps.Client(key='AIzaSyDvvzzLQDXxwl4wtI6P94lEChNnKz4Af9U')


    ref_lat = 40.714224
    ref_lon = -73.961452


    route_range = 2
    N_runs = 50;


    # create 50 random coord
    # max input length of nearest roads
    random_coords  = [(ref_lat + random.random()*route_range,
                        ref_lon + random.random()*route_range) for i in range(N_runs*2)]

    adj_coords =  random_coords#gmaps.neares_roads(random_coords)

    raw_runs = zip(adj_coords[0:N_runs], adj_coords[N_runs:])

    #for each run
    for run in list(raw_runs): 

        directions_result = gmaps.directions(run[0],run[1],mode="bicycling")
        # if points couldn't be snapped
        if not directions_result:
            continue

        duration, gps_route_key_points = run_steps(directions_result)

        gps_points_dict = gmaps.snap_to_roads(gps_route_key_points, interpolate = True)

        gps_points_list = [ (item["location"]["latitude"], item["location"]["longitude"]) for item in gps_points_dict ]

        line = LineString(gps_points_list)

        initial_datetime = gen_datetime()

        curr_time = initial_datetime
        curr_co2 = randint(400,500)
        curr_temperature = randint(10,25)

        sample_num = duration//10

        curr_user = randint(0,10**4)

        for i in range(sample_num):
            step = {}

            curr_time = initial_datetime + timedelta(0,10*i)
            step["timestamp"] = curr_time.isoformat()

            curr_point = line.interpolate(line.length/sample_num*i)

            # if snapping wasn't possible 
            #   print(curr_point.x)
            #print(gps_points_dict)
            #if not gps_points_dict : 
            #    continue
            
            #gps_points_list = [ (item["location"]["latitude"], item["location"]["longitude"]) for item in gps_points_dict ]

            step["lat"] = curr_point.x  #gps_points_list[0][0]
            step["lng"] = curr_point.y  #gps_points_list[0][1]

            curr_co2 += randint(0,10) - 5
            step["co2"] = curr_co2

            curr_temperature += (randint(0,24)-((curr_time.hour - 12)**2)**(1/2))/100

            step["temp"] = curr_temperature


            # Send it off to the broker
            print(step)
            producer = KafkaProducer(bootstrap_servers=os.environ['KAFKA_CLUSTER'], value_serializer=lambda v: json.dumps(v).encode('utf-8'))
            producer.send('test', step)
            time.sleep(1)


