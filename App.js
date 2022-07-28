import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  FlatList

} from 'react-native';
import {Picker} from '@react-native-picker/picker';



const App = () => {

  
  const [text , setText]=React.useState("")
  const [inputText , setInput]= React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("en")
  const [languages , setLanguages]=React.useState([]);
  const [source, setSource]=React.useState("en");
  React.useEffect(()=>{
   getLanguages()


  },[])
  const getLanguages = async ()=>{
    const res = await fetch("https://libretranslate.com/languages");
    const data = await res.json();
    setLanguages(data)
    console.log(data);
  }
  const translate= async(value)=>{
    console.log(selectedLanguage+"selected")
  const res = await fetch("https://libretranslate.de/translate", {
	method: "POST",
	body: JSON.stringify({
		q: value,
		source: source,
		target: selectedLanguage,
		format: "text"
	}),
	headers: { "Content-Type": "application/json" }
});

const data =await res.json();
setText(data.translatedText)
console.log(selectedLanguage);
}

  return (
    <SafeAreaView>
     <View style={styles.sectionContainer}>
     <Text style={[{color:"#000080", fontSize:38, alignSelf:"center", margin:9, fontWeight:"900"}, styles.shadow]}>Translate</Text>
      <Text style={{color:"white", fontSize:18}}>Select Source Language</Text>
     <Picker selectedValue={source} onValueChange={item=>setSource(item)} style={styles.picker}>
      {languages.map((item, index) => {
        return (<Picker.Item label={item.name} value={item.code}/>) 
    })}
        
     

      </Picker>
      <TextInput placeholder='Enter Your Text Here' onChangeText={text => setInput(text)} style={[styles.input, styles.shadow]} placeholderTextColor={"white"}/>
      <TouchableOpacity onPress={()=>translate(inputText)} style={styles.button}>
      <Text style={{color:"white", fontSize:20, margin:4}}>Translate</Text>
     
      </TouchableOpacity>
      <Text style={{color:"white", fontSize:18}}>Select Target Language</Text>
      <Picker selectedValue={selectedLanguage} onValueChange={item=>setSelectedLanguage(item)} style={styles.picker}>
      {languages.map((item, index) => {
        return (<Picker.Item label={item.name} value={item.code}/>) 
    })}
        
     

      </Picker>
      <TextInput value={text} style={[styles.input, styles.shadow]} placeholderTextColor={"white"}/>
     
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
   
   height:"100%",
   width:"100%",
    backgroundColor:"black"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  shadow: {
    shadowColor: "white",
    shadowOffset: {
        width: 20,
        height: 20,
    },
    shadowOpacity: 0.9,
    shadowRadius: 12.84,

    elevation: 22
},
picker:{
  backgroundColor:"#000080", 
  margin:6, 
  width:"50%", 
  color:"white",
  borderRadius:78

},input:{
  backgroundColor:"#000000",
  borderRadius:5, 
  height:"25%", 
  margin:12, 
  borderColor:"#000080" , 
  borderWidth:1, 
  color:"white"
}, button:{
  backgroundColor:"#000080", 
  width:"30%", 
  alignSelf:"center",
  borderRadius:4, 
  margin:4, 
  alignItems:"center"
}
});

export default App;
