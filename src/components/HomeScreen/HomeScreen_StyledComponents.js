import React from 'react';
import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

// import BlueSectionContainer from './../App/App_StyledComponents.js';

let HomeScreenContainerView = styled.View`
    flex: 1;
`;

let BlueSectionContainer = styled.View`
    flex-direction: column;
    align-self: stretch;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    width: ${props => props.width ? props.width : "auto"};
`;

let AppHeaderContainerView = styled.View`
    flex: 2;

    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const WelcomeText = styled.Text`
    color: #B41A1F;
    font-size: 20;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

let OpenSSOContainer = styled(BlueSectionContainer)`
    background-color:  ${   props => (props.title === null) 
                            ? "#B41A1F" : 
                            (props.title === "Student" || props.renderAsStudent) 
                                ? "#B41A1F" : "#1E6C93" 
                        };
    border-top-left-radius: 25;
    border-top-right-radius: 25;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignInButtonView = styled.View`
    background-color: white;
    color: ${props => (props.title === "Student" || props.renderAsStudent) ? "#B41A1F" : "#1E6C93" };

    border-radius: 15;

    width: 120;
    flex-direction: row;
    justify-content: center;
    padding-top: 10;
    padding-bottom: 10;
`;

const SignInButtonText= styled.Text`
    color: ${props => (props.title === null) 
                    ? "#B41A1F" : 
                        (props.title === "Student" || props.renderAsStudent) 
                        ? "#B41A1F" : "#1E6C93" 
            };

    font-size: 20;
    font-weight: bold;
    flex-direction: row;
    justify-content: center;
`;

const SignInButtonTouchableOpacity = ({ renderAsStudent, title, ...props }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={ props.onPress }
        >
            <SignInButtonView
                title           =   { title }
                renderAsStudent =   { renderAsStudent } 
            >
                {   (props.buttonTitle && !props.children) ? 
                    (
                        <SignInButtonText
                            title           =   { title }
                            renderAsStudent =   { renderAsStudent } 
                        >
                            { props.buttonTitle || "Sign In" }
                        </SignInButtonText>
                    )   : null
                }
                { props.children }
            </SignInButtonView>
        </TouchableOpacity>
    ); //end return
};





export { HomeScreenContainerView, AppHeaderContainerView, WelcomeText, BlueSectionContainer, OpenSSOContainer, SignInButtonTouchableOpacity };