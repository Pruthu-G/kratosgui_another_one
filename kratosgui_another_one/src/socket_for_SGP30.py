#!/usr/bin/env python3
import rospy
import websocket_module
from std_msgs.msg import Float64MultiArray
if __name__=="__main__":
    rospy.init_node("gas_gui")
    socket_for_gas=websocket_module.websocket_module("/gas_data",Float64MultiArray,8767)
    socket_for_gas.loop_thread.start()
    rospy.spin()