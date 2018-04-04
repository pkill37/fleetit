import googlemaps
import math
import random
import time
from datetime import datetime, timedelta
from random import randint
from shapely.geometry import LineString
import json
import requests


def findCoordinates(lat, longit, route_range):
    track_points = []
    numberOfPoints = 10;
    degreesPerPoint = 360 / numberOfPoints;

    # Keep track of the angle from centre to radius
    currentAngle = 0;

    # The points on the radius will be lat+x2, long+y2
    # Track the points we generate to return at the end
    for i in range(0,numberOfPoints):
        # X2 point will be cosine of angle * radius (range)
        x2 = math.cos(currentAngle) * route_range ;
        # Y2 point will be sin * route_range
        y2 = math.sin(currentAngle) * route_range;

        newLat = lat+x2;
        newLongit = longit+y2;
        lat_long = (newLat,newLongit);
        track_points.append(lat_long);

        # Shift our angle around for the next point
        currentAngle += degreesPerPoint;

    idxi = randint(0,len(track_points)-2)
    idxf = len(track_points)-1


    return track_points[idxi],track_points[idxf]

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

    route_range = 0.5
    N_runs = 10;

    data_stream = {"runs" : []}

    for r in range(N_runs):


        init_lat = ref_lat + random.random()*route_range
        init_lon = ref_lon + random.random()*route_range

        finish_lat = ref_lat + random.random()*route_range
        finish_lon = ref_lon + random.random()*route_range

        raw_coords =  gmaps.nearest_roads([(init_lat, init_lon), (finish_lat, finish_lon)])
        # if it couldnt find road
        if not raw_coords or len(raw_coords) < 2:
            continue

        start = raw_coords[0]["location"]
        finish = raw_coords[1]["location"]

        rand_coord_i = (start["latitude"], start["longitude"])
        rand_coord_f = (finish["latitude"], finish["longitude"]) 


        directions_result = gmaps.directions(rand_coord_i, rand_coord_f ,mode="bicycling")
        if not directions_result :
            continue

        curr_run = {"steps" : []}

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
            data_inst = {}

            curr_time = initial_datetime + timedelta(0,10*i)
            data_inst["timestamp"] = curr_time.isoformat()

            curr_point = line.interpolate(line.length/sample_num*i)
            data_inst["lat"] = curr_point.x
            data_inst["lng"] = curr_point.y

            curr_co2 += randint(0,10) - 5
            data_inst["co2"] = curr_co2

            curr_temperature += (randint(0,24)-((curr_time.hour - 12)**2)**(1/2))/100
            data_inst["temp"] = curr_temperature
            curr_run["steps"].append(data_inst)

            curr_run["uid"] = curr_user

        data_stream["runs"].append(curr_run)

    for run in data_stream['runs']:
        for step in run['steps']:
            print(step)
            headers = {'Content-Type': 'application/vnd.kafka.json.v2+json'}
            payload = {'records': [{'value': step}]}
            r = requests.post('http://kafka-rest-proxy:8082/topics/test', json=payload, headers=headers)
            print(r.text)
            time.sleep(1)

