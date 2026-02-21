import { View, Text, Image } from "react-native";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "black",
            borderBottomWidth: 0,
            height: 30,
          },
          headerTintColor: "#fff",
        }}
      />

      <View style={{ flex: 1, backgroundColor: "black" }}>
        
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Todos</Text>
            <View
              style={{
                height: 2,
                backgroundColor: "white",
                width: 35,
              }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#aaa" }}>Cabelo</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#aaa" }}>Tatuagem</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#aaa" }}>Looks</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#aaa" }}>Presentes</Text>
          </View>
        </View>



        <View 
        style={{
        marginTop: 50,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",      
        justifyContent: "space-around", 
        gap: 20,}}
        >

        <Image
          source={require("../assets/images/tenis.jpg")}
          style={{ width: 230, height: 300, borderRadius: 10}}
        />

        <Image
        source={require("../assets/images/tenis.jpg")}
        style={{ width: 230, height: 300, borderRadius: 10}}
        />

        <Image
        source={require("../assets/images/tenis.jpg")}
        style={{ width: 230, height: 300, borderRadius: 10}}
        />

        <Image
        source={require("../assets/images/tenis.jpg")}
        style={{ width: 230, height: 300, borderRadius: 10}}
        />

        <Image
        source={require("../assets/images/tenis.jpg")}
        style={{ width: 230, height: 300, borderRadius: 10}}
        />

        <Image
        source={require("../assets/images/tenis.jpg")}
        style={{ width: 230, height: 300, borderRadius: 10}}
        />
            
        </View>

      </View>
    </>
  );
}
