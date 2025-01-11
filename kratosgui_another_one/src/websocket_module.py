#!/usr/bin/env python3
import rospy
import threading
import asyncio
from std_msgs.msg import Float64MultiArray
from websockets import serve
from rospy_message_converter import json_message_converter
import json
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(message)s',
)

class websocket_module:
    async def async_send(self, websocket):
        rospy.loginfo("async_send started.")
        while True:
            if self.latest_message:
                data = json_message_converter.convert_ros_message_to_json(self.latest_message)
                rospy.loginfo(f"Sending data: {data}")
                await websocket.send(json.dumps(data, indent=2))
                self.latest_message = None
            await asyncio.sleep(0.1)

    async def async_main(self):
        rospy.loginfo(f"Starting WebSocket server on ws://localhost:{self.port}")
        async with serve(self.async_send, "localhost", self.port):
            rospy.loginfo("WebSocket server is now active.")
            await asyncio.get_running_loop().create_future()

    def callback(self, msg):
        rospy.loginfo(f"Received message: {msg}")
        self.latest_message = msg

    def on_shutdown(self):
        rospy.loginfo("Shutting down...")
        for task in asyncio.all_tasks(self.async_loop):
            task.cancel()
        self.async_loop.call_soon_threadsafe(self.async_loop.stop)
        if self.loop_thread.is_alive():
            self.loop_thread.join()

    def __init__(self, topic_name: str, message_type, port: int):
        self.port = port
        self.latest_message = None
        self.async_loop = asyncio.new_event_loop()
        self.loop_thread = threading.Thread(target=self.async_loop.run_forever, daemon=True)
        self.rossub = rospy.Subscriber(topic_name, message_type, self.callback)
        self.async_loop.create_task(self.async_main())
        rospy.on_shutdown(self.on_shutdown)

if __name__ == "__main__":
    rospy.init_node("kratosgui", anonymous=True)
    rospy.loginfo("ROS node initialized.")
    obj = websocket_module("/spectral_data", Float64MultiArray, 8765)
    obj.loop_thread.start()
    rospy.loginfo("Async loop thread started.")
    rospy.spin()