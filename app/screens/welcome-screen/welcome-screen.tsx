import React, { useEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, ColorValue, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text } from "../../components"
import { color, spacing, typography } from "../../theme"
import { HelperText, TextInput } from 'react-native-paper'
import { Theme } from "react-native-paper/lib/typescript/src/types"
import { Api } from "../../services/api"
import * as Types from "../../services/api/api.types"
// import { uuid } from 'react-native-uuid'
// var uuid = require('react-native-uuid')
var uuid = require('react-native-uuid')

const binjiLogo = require("./BinjiLogo.png")

const slate: ColorValue = "#3e5968"
const cloudyBlue: ColorValue = "#aec5ce"
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: "flex-start",
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const INPUT_TEXT: ViewStyle = {
  backgroundColor: null,
  marginTop: spacing[5],
}

const INPUT_THEME: Theme = {
  roundness: 50,
  colors: {
    primary: slate,
    text: slate,
    error: color.error,
    placeholder: cloudyBlue
  }
}

const MEDIUM: TextStyle = { fontWeight: "600" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}

const ICON: ImageStyle = {
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
  color: color.forgetButtonText,
  fontSize: 13,
  fontFamily: typography.primary,
  flex: 0,
  padding: null,
  margin: null
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.button,
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

const LOADING: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: "https://pay-dev.binji.co/api",
  timeout: 15 * 60,
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onChangeUsername = (username: React.SetStateAction<string>) => setUsername(username)
  const onChangePassword = (password: React.SetStateAction<string>) => setPassword(password)

  const passwordHasErrors = () => {
    return password.includes('@')
  }

  const [isLoading, setLoading] = useState(false)

  const callApi = () => {
    setLoading(true)

    const api = new Api()
    api.setup()

    api.login(uuid.v1(), username, password)
      .then(result => Alert.alert(result.kind))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))

    // fetch('https://pay-dev.binji.co/api/user/signIn', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     deviceUUID: uuid.v1(),
    //     password: password,
    //     userName: username,
    //   })
    // })
  }

  return (
    <View style={FULL}>
      <View style={LOADING}>
        { isLoading ? <ActivityIndicator/> : null }
      </View>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="" style={HEADER}/>
        <Image source={binjiLogo} style={ICON} />
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
            onPress={ callApi }
          />
        </View>
      </SafeAreaView>
    </View>
  )
})
