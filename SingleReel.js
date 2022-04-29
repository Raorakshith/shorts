import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import Video from "react-native-video";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { styling } from "./Styling";
import { RNS3 } from "react-native-aws3";
import { AWSConstants } from "./utils/AWSConstants";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const SingleReel = ({ item, index, currentIndex, props }) => {
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [fileType, setfileType] = useState(0);
  const [filesUrl, setfilesUrl] = useState({});
  const [arraydata, setArrayData] = useState([]);

  const chooseFile = () => {
    let options = {
      mediaType: "video",
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      setUploadSuccessMessage("");
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
    });
  };

  const uploadFile = (props) => {
    videourl: props.videourl;
    if (Object.keys(filePath).length == 0) {
      alert("Please select video first");
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
      }
    )
      .progress((progress) => {
        console.log(progress);
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`
        );
      })
      .then((response) => {
        console.log(response);
        if (response.status !== 201) alert("Failed to upload video to S3");
        console.log(response.body);
        const obj = {
          fileName: filePath.fileName ? filePath.fileName : "",
          videourl: location,
        };
        var array = [];
        array.push(obj);
        setFilePath(obj);
        setArrayData(array);

        let { bucket, etag, key, location } = response.body.postResponse;
        setUploadSuccessMessage(
          ToastAndroid.show("uploaded Sucessfully", ToastAndroid.SHORT)
        );
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const videoRef = useRef(null);

  const onBuffer = (buffer) => {
    console.log("buffring", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const [mute, setMute] = useState(true);

  const [like, setLike] = useState(item.isLike);

  return (
    <View style={styling.SingleReelView}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={styling.MuteView}
      >
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={{uri: item.video}}
          muted={mute}
          style={styling.VideoStyle}
        />
      </TouchableOpacity>
      <Ionic
        name="volume-mute"
        style={{
          fontSize: mute ? 20 : 0,
          color: "white",
          position: "absolute",
          backgroundColor: "rgba(52,52,52,0.6)",
          borderRadius: 100,
          padding: mute ? 20 : 0,
        }}
      />
      <View style={styling.SingleReelView1}>
        <View style={{}}>
          <TouchableOpacity style={{ width: 150 }}>
            <View style={styling.SingleReelView2}>
              <View style={styling.SingleReelView3}>
                <Image source={item.postProfile} style={styling.Profile} />
              </View>
              <Text style={styling.Title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styling.Description}>{item.description}</Text>
          <View style={styling.Icons}>
            <Ionic name="ios-musical-note" style={styling.Music} />
            <Text style={styling.SingleReelText}>Original Audio</Text>
          </View>
        </View>
      </View>
      <View style={styling.SingleReelView4}>
        <View>
          <SafeAreaView>
            <View>
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
                    onPress={uploadFile}
                  >
                    <Text style={styling.textStyleWhite}>Upload Video</Text>
                  </TouchableOpacity>
                </>
              ) : null}
              {uploadSuccessMessage ? (
                <Text style={styling.textStyleGreen}>
                  {uploadSuccessMessage}
                </Text>
              ) : null}
              <TouchableOpacity onPress={chooseFile}>
                <Feather name="upload" style={styling.upload} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <TouchableOpacity
          onPress={() => setLike(!like)}
          style={{ padding: 10 }}
        >
          <AntDesign
            name={like ? "heart" : "hearto"}
            style={{ color: like ? "red" : "white", fontSize: 25 }}
          />
          <Text style={{ color: "white" }}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic name="ios-chatbubble-outline" style={styling.bubble} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic name="paper-plane-outline" style={styling.bubble} />
        </TouchableOpacity>

        <View style={styling.ImageView}>
          <Image source={item.postProfile} style={styling.ProfileView} />
        </View>
      </View>
    </View>
  );
};

export default SingleReel;
