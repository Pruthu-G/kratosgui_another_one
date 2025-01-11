#!/usr/bin/env python3
import rospy
import websocket_module
from std_msgs.msg import Float64MultiArray
if __name__=="__main__":
    rospy.init_node("spectro_gui",anonymous=True)
    socket_for_spectro=websocket_module.websocket_module("/random",Float64MultiArray,8765)
    socket_for_spectro.loop_thread.start()
    rospy.spin()