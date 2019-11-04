import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return(
      <TouchableOpacity style={Styles.buttonStyle} onPress={
          props.onPress
      }>
            <Text style={Styles.textStyle}>{props.children}</Text>
      </TouchableOpacity>
  )
}

const Styles = {
    textStyle:{
        alignSelf: 'center',
        color:'#007aff',
        fontSize:16,
        paddingBottom:10,
        paddingTop:10,
        fontWeight:'600'
    },
    buttonStyle:{
        flex:1,
        alighSelf:'stretch',
        backgoundColor:'#fff',
        borderRadius: 5,
        borderWdht:1,
        borderColor:'#007aff',
        marginLeft:5,
        marginRight:5
    }
}
export default Button;