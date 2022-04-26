import { StyleSheet,Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styling = StyleSheet.create({
    AppView:{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: 'black',
    },
    AppView1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 10,
    },
    ShortsText: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    CameraStyle: { fontSize: 25, color: 'white' },
    SingleReelView: {
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MuteView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    VideoStyle:{
    width: '100%',
    height: '100%',
    position: 'absolute',
    },
    SingleReelView1: {
        position: 'absolute',
        width: windowWidth,
        zIndex: 1,
        bottom: 0, //edited
        padding: 10,
    },
    SingleReelView2: { width: 100, flexDirection: 'row', alignItems: 'center' },
    SingleReelView3: {
        width: 32,
        height: 32,
        borderRadius: 100,
        backgroundColor: 'white',
        margin: 10,
    },
    Profile: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 100,
    },
    Title: { color: 'white', fontSize: 16 },
    Description: { color: 'white', fontSize: 14, marginHorizontal: 10 },
    Icons: { flexDirection: 'row', padding: 10 },
    Music: { color: 'white', fontSize: 16 },
    SingleReelText: { color: 'white' },
    SingleReelView4: {
        position: 'absolute',
        bottom: 10, //edited
        right: 0,
    },
    upload: { fontSize: 29, color: 'white', left: -3, padding: 10 },
    bubble:{ color: 'white', fontSize: 25 },
    imageStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        margin: 5,
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: 'orange',
        marginVertical: 10,
        width: '100%',
    },
    textStyleWhite: {
        //padding: 10,
        color: 'white',
        marginRight:20,
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyleGreen: {
        alignItems: 'center',
        backgroundColor: '#00ced1',
        marginVertical: 10,
        width: 100,
        marginLeft:-190
    },
    textStyleGreen: {
        padding: 10,
        color: '#00ced1',
        marginLeft: -190
    },
    textStyleWhite: {
        padding: 10,
        color: 'white',
    },
    ImageView: {
        width: 30,
        height: 30,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        margin: 10,
    },
    ProfileView: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    }






})
