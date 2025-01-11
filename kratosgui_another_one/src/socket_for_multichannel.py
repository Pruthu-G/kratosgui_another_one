#!/usr/bin/env python3
import rospy
import websocket_module
from std_msgs.msg import Float64MultiArray
if __name__=="__main__":
    rospy.init_node("multichannel_gui",anonymous=True)
    socket_for_arm=websocket_module.websocket_module("/multichannel_data",Float64MultiArray,8766)
    socket_for_arm.loop_thread.start()
    rospy.spin()