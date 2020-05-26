//Import React/React Native modules
import React, { Component, Fragment } from 'react';
import { StatusBar, Button } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Reactotron from 'reactotron-react-native';

import { AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID, AZURE_DOMAIN_HINT } from './../../../keys.env.js';
//from 'react-native-dotenv'

//Import utility functions
import { dimensionsWidthHOC } from './../../utility-functions.js';

import * as AuthSession from 'expo-auth-session';
import * as Updates from 'expo-updates';

import { openAuthSession } from 'azure-ad-graph-expo';

import { SafeAreaProvider } from 'react-native-safe-area-context';

//import styled components
import { AppContainerView, AppHeaderContainerView, WelcomeText, SafeAreaViewStyled, OpenSSOContainer, SignInButtonTouchableOpacity } from './App_StyledComponents.js';

//Import App/Page components
import Header from './../Header/Header.js';
import PageContent from './../PageContent/PageContent.js';

import HomeScreen from './../HomeScreen/HomeScreen.js';

const { Navigator, Screen } = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdate  : false, 
            adUserInfo  : null,
            appWidth    : this.props.width,

            firstName   :   null,
            lastName    :   null,
            title       :   null,
            site        :   null  
        }; //end this.state object
    } //end constructor

    azureAdAppProps = {
        clientId        :   AZURE_CLIENT_ID,
        tenantId        :   AZURE_TENANT_ID,
        scope           :   "user.read",
        redirectUrl     :   AuthSession.makeRedirectUri(),
        clientSecret    :   AZURE_CLIENT_SECRET,
        domainHint      :   AZURE_DOMAIN_HINT,
        prompt          :   "login"
    };


    openADSingleSignOn = async () => {
        console.log("handlePressAsync()");
        console.log("AuthSession.makeRedirectUri():\t" + AuthSession.makeRedirectUri());
        let adUserInfo = await openAuthSession(this.azureAdAppProps);

        this.setState({ adUserInfo: adUserInfo });

        this.setState({ firstName : adUserInfo.givenName });
        this.setState({ lastName : adUserInfo.surname});
        this.setState({ title : adUserInfo.jobTitle});
        this.setState({ site : adUserInfo.officeLocation});

        console.log("adUserInfo:\t" + JSON.stringify(adUserInfo));
    }; //handlePressAsync()

    componentDidMount = () => {
        const checkforUpdatesDev = false;
        
        console.log("Props:\t" + JSON.stringify(this.props) );
        console.log("Width:\t" + this.props.width);

        if (__DEV__) {
            Reactotron.log('hello rendering world 1');
        }
        
        if (!__DEV__ || checkforUpdatesDev === true) {
            Updates.checkForUpdateAsync().then(update => {
                if (update.isAvailable) {
                  this.setState({ showUpdate: true } );
                } //end if-statement
              });
        }
    };

    render() {
        return (
            <NavigationContainer>
                <SafeAreaProvider>
                    <StatusBar 
                        backgroundColor="#F4F7F9" 
                        barStyle="dark-content" 
                        translucent={true} 
                    />
                    { /* The following is a technique using two SafeAreaViews to have the
                        statusbar/top padding be a different color than the bottom padding. 
                        SafeAreaViews are only applicable on iOs 11+ on >iPhone X 

                        Source: https://stackoverflow.com/questions/47725607/react-native-safeareaview-background-color-how-to-assign-two-different-backgro
                    */ }
                    <SafeAreaViewStyled>
                        <AppContainerView>
                            <AppHeaderContainerView>
                                <Header 
                                    showUpdate  =   { this.state.showUpdate } 
                                    firstName   =   { this.state.firstName}
                                    lastName    =   {this.state.lastName}
                                    title       =   {this.state.title}
                                    site        =   {this.state.site}
                                />
                                <WelcomeText>Welcome</WelcomeText>
                            </AppHeaderContainerView>

                            <Navigator
                                screenOptions={{ title: null, headerShown: false }}

                            >
                                <Screen 
                                    name="Home" 
                                    // options={{ title: null, headerShown: false }}
                                >
                                    { props => <HomeScreen 
                                                    {...props}
                                                    openADSingleSignOn={ this.openADSingleSignOn } 
                                                /> }
                                </Screen>

                                <Screen 
                                    name="Page Content"
                                    // options={{ title: null, headerShown: false }}
                                >
                                    { props => <PageContent 
                                                    {...props}
                                                    showUpdate  =   { this.state.showUpdate } 
                                                    firstName   =   { this.state.firstName}
                                                    lastName    =   { this.state.lastName }
                                                    title       =   { this.state.title }
                                                    site        =   { this.state.site }
                                                    appWidth    =   { this.state.appWidth }
                                                />
                                    }
                                </Screen>
                            </Navigator>

                            {/* <Stack.Screen name="Home">
                                {props => <HomeScreen {...props} extraData={someData} />}
                            </Stack.Screen> */}
                            {/* <HomeScreen openADSingleSignOn={ this.openADSingleSignOn } /> */}

                        {/* <PageContent 
                            showUpdate  =   { this.state.showUpdate } 
                            firstName   =   { this.state.firstName}
                            lastName    =   { this.state.lastName }
                            title       =   { this.state.title }
                            site        =   { this.state.site }
                            appWidth    =   { this.state.appWidth }
                        /> */}
                        </AppContainerView>
                    </SafeAreaViewStyled>
                </SafeAreaProvider>
            </NavigationContainer>
        );
    }
}

export default dimensionsWidthHOC(App);