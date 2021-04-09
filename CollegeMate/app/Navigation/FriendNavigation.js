import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import colors from "../config/colors";
import FriendScreen from "../screens/FriendScreen";
import ChatScreen from "../screens/ChatScreen";

export default function FriendNavigator({ navigation, route }) {
  const Stack = createStackNavigator();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "chat") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="friend"
        component={FriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={ChatScreen}
        options={{
          //   headerShown: false,
          headerTitle: false,

          headerTransparent: true,
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              style={{
                backgroundColor: colors.light,
                padding: 5,
                borderRadius: 50,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
