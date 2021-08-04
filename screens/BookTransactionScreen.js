import React from 'react'
import { Text,TouchableOpacity,View,Stylesheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import{BarCodeScanner} from 'expo-barcode-scanner' 
export default class TransactionScreen extends React.Component{
    constructor(){
        super()
        this.state = {hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal',
        scannedStudentID:'',
        scannedBookID:''}
    }
    getCameraPermissions = async(ID)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            //status==="granted"isTrue whenuser has granted permission
            //status==="granted"isFalse whenuser has not granted permission
            hasCameraPermissions:status==="granted",
            buttonState:ID,
            scanned:false
        })
    }
    handleBarCodeScanned = async({type,data})=>{
        this.setState ({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
render(){
    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned;
    const buttonState=this.buttonState;
    if(buttonState!=="normal"&&hasCameraPermissions){
        return(
        <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned }
        style = {StyleSheet.obsoluteFill}/>
        )
    }
    else if(buttonState === "normal"){
    return(
        <View style = {styles.container}>
            <View>
                <Image source={require("../assets/booklogo.jpg")}
                style = {{width:200,height:200}}/>
                <Text style = {{textAlign:'center',fontSize:30}}>Wili Application</Text>
            </View>
            <View style = {styles.inputView}>
                <TextInput style = {styles.inputBox}
                placeHolder = "Book ID"
                value ={this.state.scannedBookID}
                />
                <TouchableOpacity style = {styles.scannedButton} OnPress = {()=>{
                    this.getCameraPermissions("BookID")
                }}>
                    <Text style = {styles.buttonText}>Scan</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.inputView}>
                <TextInput style = {styles.inputBox}
                placeHolder = "StudentID"
                value ={this.state.scannedStudentID}
                />
                <TouchableOpacity style = {styles.scannedButton} OnPress = {()=>{
                    this.getCameraPermissions("StudentID")
                }}>
                    <Text style = {styles.buttonText}>Scan</Text>
                </TouchableOpacity>
            </View>
            <Text style = {styles.displayText}>{hasCameraPermissions===true?this.state.scannedData:"Request Camera Permission"}</Text>
            <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions}>
            <Text style = {styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
        </View>
    )
}
}}
const styles = StyleSheet.create({
    container:{
        flex:1,justifyContent:'center',alignItems:'center'
    },
    displaytext:{
        fontSize:15,
        textDecorationLine:'underLine'
    },
    scanButton:{
        backgroundColor:'#219653',
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:10,
        textAlign : 'ceter',
        marginTop:10
    },
    inputView:{
        flexDirection:'row',
        margin:20
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20
    },
    scannedButton:{
        backgrounndColor:'#66bb6a',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
})
