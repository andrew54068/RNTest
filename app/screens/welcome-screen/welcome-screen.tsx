import React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, ColorValue } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { HelperText, TextInput } from 'react-native-paper'
import { Colors } from "react-native/Libraries/NewAppScreen"
import { Theme } from "react-native-paper/lib/typescript/src/types"
const binjiLogo = require("./BinjiLogo.png")

const slate: ColorValue = "#3e5968"
const cloudyBlue: ColorValue = "#aec5ce"
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: "flex-start",
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const INPUT_TEXT: ViewStyle = {
  backgroundColor: null,
  marginTop: spacing[5],
  // borderColor: color.error
}

const INPUT_THEME: Theme = {
  roundness: 50,
  colors: {
    primary: slate,
    text: cloudyBlue,
  }
}

const MEDIUM: TextStyle = { fontWeight: "600" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}

const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}

const FORGET_CONTAINER: ViewStyle = {
  alignContent: "center",
  justifyContent: "space-between",
  flexDirection: "row"
}

const FORGET_LEFT: ViewStyle = {
  flexDirection: "row",
  justifyContent: 'flex-start',
  backgroundColor: null,
}

const FORGET_RIGHT: ViewStyle = {
  flexDirection: "row",
  justifyContent: 'flex-end',
  backgroundColor: null,
}

const FORGET_TEXT: TextStyle = {
  color: "#8cb1c1",
  fontSize: 13,
  fontFamily: typography.primary,
  flex: 0,
  padding: null,
  margin: null
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#3d9da3",
  borderRadius: 10
}

const LOGIN_TEXT: TextStyle = {
  ...TEXT,
  ...MEDIUM,
  fontSize: 16,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: null }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeUsername = username => setUsername(username)
  const onChangePassword = password => setPassword(password)

  const passwordHasErrors = () => {
    return password.includes('@')
  }

  return (
    <View style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="" style={HEADER}/>
        <Image source={binjiLogo} style={BOWSER} />
        <TextInput style={INPUT_TEXT} label="Username" value={username} onChangeText={onChangeUsername} theme={INPUT_THEME} />
        <TextInput style={INPUT_TEXT} label="Password" value={password} onChangeText={onChangePassword} theme={INPUT_THEME} />
        <HelperText type="error" visible={passwordHasErrors()}>
          Email address is invalid!
        </HelperText>
        <View style={FORGET_CONTAINER}>
          <Button
            style={FORGET_LEFT}>
            {/*  onPress={nextScreen} */}
            <Text tx="loginScreen.forgetName" style={FORGET_TEXT} />
          </Button>
          <Button
            style={FORGET_RIGHT}>
            {/* onPress={nextScreen} */}
            <Text tx="loginScreen.forgetPassword" style={FORGET_TEXT} />
          </Button>
        </View>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            style={CONTINUE}
            textStyle={LOGIN_TEXT}
            tx="loginScreen.login"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
