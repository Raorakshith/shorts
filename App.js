import React ,{useRef,useState, useEffect}from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView,Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ReelsComponent from './ReelsComponent';
import { styling } from './Styling';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { RNS3 } from 'react-native-aws3';
import { AWSConstants } from './utils/AWSConstants';
import {  launchCamera } from 'react-native-image-picker';
import { videoData } from './Database';

const Reels = () => {
    const [filePath, setFilePath] = useState({});
    const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
    const [videodata, setvideodata] = useState([]);
    const videoRecorder = useRef(null);
    useEffect(()=>{
        setvideodata(videoData);
    },[]);
    const startRecord = () => {
        let options = {
            mediaType: 'video',
        };
        launchCamera(options, response => {
            console.log('Response = ', response);
            setUploadSuccessMessage('');
            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            setFilePath(response.assets[0]);
        });
    };
    const uploadFile = () => {
        if (Object.keys(filePath).length == 0) {
            alert('Please select video first');
            return;
        }
        RNS3.put(
            {
                // `uri` can also be a file system path (i.e. file://)
                uri: filePath.uri,
                name: filePath.fileName,
                type: filePath.type,
            },
            {
                keyPrefix: AWSConstants.keyPrefix, // Ex. myuploads/
                bucket: AWSConstants.bucket, // Ex. aboutreact
                region: AWSConstants.region, // Ex. ap-south-1
                accessKey: AWSConstants.accessKey,
                // Ex. AKIH73GS7S7C53M46OQ
                secretKey: AWSConstants.secretKey,
                // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
                successActionStatus: 201,
            },
        )
            .progress((progress) => {
                console.log(progress);
                setUploadSuccessMessage(
                    `Uploading: ${progress.loaded / progress.total} (${progress.percent
                    }%)`,
                )
            }
            )
            .then((response) => {
                console.log(response);
                if (response.status !== 201)
                    alert('Failed to upload video to S3');
                console.log(response.body);
                setFilePath('');
                let {
                    bucket,
                    etag,
                    key,
                    location
                } = response.body.postResponse;
                setUploadSuccessMessage(
                    ToastAndroid.show('uploaded Sucessfully', ToastAndroid.SHORT)

                );
                const dataset = {
                    video: location,
                    postProfile: require('./storage/images/post1.jpg'),
                    title: 'Ram_Charan',
                    description: 'Feel the buity of nature',
                    likes: '245k',
                    isLike: false,
                };
                setvideodata([...videodata,dataset]);
                
            }).catch((error) => {
                console.log(error);
            });
    };
   
    return (
        <View
            style={styling.AppView}>
            <View
                style={styling.AppView1}>
                <Text style={styling.ShortsText}>
                    Shorts
                </Text>
                <SafeAreaView><View>
                    {filePath.uri ? (
                        <>
                            <Image
                                source={{ uri: filePath.uri }}
                                style={styling.imageStyle}
                            />
                            {/* <Text style={styling.textStyle}>
                                        {filePath.uri}
                                    </Text> */}
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styling.buttonStyleGreen}
                                onPress={uploadFile}>

                                <Text style={styling.textStyleWhite}>
                                    Upload Video
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                    {uploadSuccessMessage ? (

                        <Text style={styling.textStyleGreen}>
                            {uploadSuccessMessage}
                        </Text>
                    ) : null} 
                
                <TouchableOpacity onPress={startRecord}>
                <Feather name="camera" style={styling.CameraStyle} />
                
                    </TouchableOpacity></View></SafeAreaView>
               
            </View>
            <VideoRecorder ref={videoRecorder} compressQuality={'medium'} />
            <ReelsComponent data={videodata}/>
            
        </View>
    );
};

export default Reels;   