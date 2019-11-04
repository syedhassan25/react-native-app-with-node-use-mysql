import React  from 'react';
import {Text,View,TextInput} from 'react-native';

const Input = ({placeholder,label,onChangeText,value,secureTextEntry}) => {
    
    const { labelStyle,inputStyle,containerStyle } = Styles;
    return(
        <View style={containerStyle}>
             <Text style={labelStyle} >{label}</Text>
             <TextInput 
              placeholder={placeholder}
              onChangeText={onChangeText}
              autoCorrect={false}
              value={value}
              style={inputStyle}
              secureTextEntry={secureTextEntry}
             />
        </View>
        );    
};
const Styles = {
    containerStyle:{
        height:40,
        flex:1,
        flexDirection:'row',
        align:'center'
    },
    inputStyle:{
        width:200,
        height:44,
        paddingLeft:5,
        paddingRight:5,
        borderColor:'black',
        marginBotom:10,
        flex:2,
        fontSize:23,
    },
    labelStyle:{
        fontSize:18,
        paddingLeft:20,
        flex:1
    }

  }    
export default Input;